import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";

export const runtime = 'edge';

// Web Crypto API compatible signature verification for Edge Runtime
async function verifySignature(orderId: string, statusCode: string, grossAmount: string, serverKey: string, signatureKey: string): Promise<boolean> {
    const input = orderId + statusCode + grossAmount + serverKey;
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hash === signatureKey;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const supabase = getServiceSupabase();

        const orderId = body.order_id;
        const transactionStatus = body.transaction_status;
        const fraudStatus = body.fraud_status;
        const statusCode = body.status_code;
        const grossAmount = body.gross_amount;
        const signatureKey = body.signature_key;

        console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

        // Verify signature if server key is available
        const serverKey = process.env.MIDTRANS_SERVER_KEY;
        if (serverKey && signatureKey) {
            const isValid = await verifySignature(orderId, statusCode, grossAmount, serverKey, signatureKey);
            if (!isValid) {
                console.error("Invalid signature");
                return NextResponse.json({ status: "error", message: "Invalid signature" }, { status: 403 });
            }
        }

        // Fetch order from database using Supabase
        const { data: order, error: fetchError } = await supabase
            .from('Order')
            .select('*')
            .eq('id', orderId)
            .single();

        if (fetchError || !order) {
            console.warn(`Order ${orderId} not found in database`);
        }

        if (transactionStatus == 'capture') {
            if (fraudStatus == 'accept') {
                if (order) {
                    await supabase
                        .from('Order')
                        .update({ status: 'PAID', paymentStatus: 'paid' })
                        .eq('id', orderId);
                }
            }
        } else if (transactionStatus == 'settlement') {
            // Update order status
            if (order) {
                await supabase
                    .from('Order')
                    .update({ status: 'PAID', paymentStatus: 'paid' })
                    .eq('id', orderId);
            }
            console.log("Payment settled");

            // Get customer info from order or fallback
            const customerEmail = order?.customerEmail || "customer@example.com";
            const customerPhone = order?.customerPhone || "08123456789";
            const customerName = order?.customerName || "Pelanggan";
            const totalAmount = order?.totalAmount || 0;

            // Send notifications via external API calls (Edge-compatible)
            try {
                // Email notification using Resend API directly
                const resendApiKey = process.env.RESEND_API_KEY;
                if (resendApiKey) {
                    const emailHtml = `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="utf-8">
                            <style>
                                body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
                                .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
                                .header { background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 30px; text-align: center; }
                                .header h1 { color: white; margin: 0; font-size: 28px; }
                                .content { padding: 30px; }
                                .success-icon { font-size: 48px; text-align: center; margin-bottom: 20px; }
                                .order-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; margin: 20px 0; }
                                .footer { background: #f8f8f8; padding: 20px; text-align: center; color: #666; font-size: 14px; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h1>🛒 NusaPrima</h1>
                                    <p style="color: rgba(255,255,255,0.9);">Terima kasih atas pesanan Anda!</p>
                                </div>
                                <div class="content">
                                    <div class="success-icon">✅</div>
                                    <h2 style="text-align: center; color: #166534;">Pembayaran Berhasil!</h2>
                                    <p style="text-align: center; color: #666;">Halo <strong>${customerName}</strong>, pembayaran Anda telah kami terima.</p>
                                    <div class="order-box">
                                        <h3 style="margin: 0 0 15px; color: #1e40af;">📦 Detail Pesanan</h3>
                                        <p><strong>Order ID:</strong> ${orderId}</p>
                                        <p><strong>Total:</strong> ${formatPrice(totalAmount)}</p>
                                        <p><strong>Status:</strong> ✓ Lunas</p>
                                    </div>
                                </div>
                                <div class="footer">
                                    <p>🛒 NusaPrima - Produk Berkualitas untuk Gaya Hidup Modern</p>
                                </div>
                            </div>
                        </body>
                        </html>
                    `;

                    await fetch('https://api.resend.com/emails', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${resendApiKey}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            from: 'NusaPrima <noreply@resend.dev>',
                            to: customerEmail,
                            subject: `✅ Pembayaran Berhasil - Order ${orderId}`,
                            html: emailHtml,
                        }),
                    });
                }
            } catch (notifyError) {
                console.error("Notification error:", notifyError);
            }
        } else if (transactionStatus == 'deny' || transactionStatus == 'cancel' || transactionStatus == 'expire') {
            if (order) {
                await supabase
                    .from('Order')
                    .update({
                        status: 'CANCELLED',
                        paymentStatus: transactionStatus
                    })
                    .eq('id', orderId);
            }
        } else if (transactionStatus == 'pending') {
            if (order) {
                await supabase
                    .from('Order')
                    .update({ paymentStatus: 'pending' })
                    .eq('id', orderId);
            }
        }

        return NextResponse.json({ status: "ok" });
    } catch (error) {
        console.error("Midtrans Webhook Error:", error);
        return NextResponse.json({ status: "error", message: "Webhook processing failed" }, { status: 500 });
    }
}

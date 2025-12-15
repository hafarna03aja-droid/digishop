import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { coreApi } from "@/lib/midtrans";
import { sendEmail, sendWhatsApp } from "@/lib/notifications";
import { formatPrice } from "@/lib/utils";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const statusResponse = await coreApi.transaction.notification(body);

        const orderId = statusResponse.order_id;
        const transactionStatus = statusResponse.transaction_status;
        const fraudStatus = statusResponse.fraud_status;

        console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

        // Fetch order from database
        const order = await prisma.order.findUnique({ where: { id: orderId } });

        if (!order) {
            console.warn(`Order ${orderId} not found in database`);
        }

        if (transactionStatus == 'capture') {
            if (fraudStatus == 'accept') {
                if (order) {
                    await prisma.order.update({
                        where: { id: orderId },
                        data: { status: 'PAID', paymentStatus: 'paid' }
                    });
                }
            }
        } else if (transactionStatus == 'settlement') {
            // Update order status
            if (order) {
                await prisma.order.update({
                    where: { id: orderId },
                    data: { status: 'PAID', paymentStatus: 'paid' }
                });
            }
            console.log("Payment settled");

            // Get customer info from order or fallback
            const customerEmail = order?.customerEmail || "customer@example.com";
            const customerPhone = order?.customerPhone || "08123456789";
            const customerName = order?.customerName || "Pelanggan";
            const totalAmount = order?.totalAmount || 0;

            // Send styled email notification
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
                        .header p { color: rgba(255,255,255,0.9); margin: 10px 0 0; }
                        .content { padding: 30px; }
                        .success-icon { font-size: 48px; text-align: center; margin-bottom: 20px; }
                        .order-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; margin: 20px 0; }
                        .order-box h3 { margin: 0 0 15px; color: #1e40af; }
                        .order-detail { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #dbeafe; }
                        .order-detail:last-child { border-bottom: none; font-weight: bold; }
                        .footer { background: #f8f8f8; padding: 20px; text-align: center; color: #666; font-size: 14px; }
                        .btn { display: inline-block; background: #2563eb; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🛒 DigiShop</h1>
                            <p>Terima kasih atas pesanan Anda!</p>
                        </div>
                        <div class="content">
                            <div class="success-icon">✅</div>
                            <h2 style="text-align: center; color: #166534;">Pembayaran Berhasil!</h2>
                            <p style="text-align: center; color: #666;">Halo <strong>${customerName}</strong>, pembayaran Anda telah kami terima.</p>
                            
                            <div class="order-box">
                                <h3>📦 Detail Pesanan</h3>
                                <div class="order-detail">
                                    <span>Order ID</span>
                                    <span>${orderId}</span>
                                </div>
                                <div class="order-detail">
                                    <span>Total Pembayaran</span>
                                    <span>${formatPrice(totalAmount)}</span>
                                </div>
                                <div class="order-detail">
                                    <span>Status</span>
                                    <span style="color: #2563eb;">✓ Lunas</span>
                                </div>
                            </div>
                            
                            <p style="color: #666; line-height: 1.6;">
                                Pesanan Anda sedang diproses dan akan segera dikirim. 
                                Kami akan mengirimkan notifikasi saat pesanan dalam perjalanan.
                            </p>
                        </div>
                        <div class="footer">
                            <p>🛒 DigiShop - Produk Berkualitas untuk Gaya Hidup Modern</p>
                            <p>Terima kasih telah berbelanja bersama kami!</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            await sendEmail({
                to: customerEmail,
                subject: `✅ Pembayaran Berhasil - Order ${orderId}`,
                html: emailHtml
            });

            await sendWhatsApp({
                to: customerPhone,
                message: `Halo ${customerName}! 🛒\n\nPembayaran untuk Order ${orderId} sebesar ${formatPrice(totalAmount)} telah diterima.\n\nPesanan Anda sedang diproses dan akan segera dikirim.\n\nTerima kasih telah berbelanja di DigiShop! 💙`
            });
        } else if (transactionStatus == 'deny' || transactionStatus == 'cancel' || transactionStatus == 'expire') {
            if (order) {
                await prisma.order.update({
                    where: { id: orderId },
                    data: {
                        status: transactionStatus === 'expire' ? 'CANCELLED' : 'CANCELLED',
                        paymentStatus: transactionStatus
                    }
                });
            }
        } else if (transactionStatus == 'pending') {
            if (order) {
                await prisma.order.update({
                    where: { id: orderId },
                    data: { paymentStatus: 'pending' }
                });
            }
        }

        return NextResponse.json({ status: "ok" });
    } catch (error) {
        console.error("Midtrans Webhook Error:", error);
        return NextResponse.json({ status: "error", message: "Invalid signature key" }, { status: 500 });
    }
}


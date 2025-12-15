"use server";

import { snap } from "@/lib/midtrans";
import { nanoid } from "nanoid";
import prisma from "@/lib/prisma";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CustomerData {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export async function createTransaction(
    items: CartItem[],
    total: number,
    shippingCost: number = 0,
    customer?: CustomerData
) {
    const orderId = `ORDER-${nanoid(8)}`;

    // Use provided customer data or fallback to demo values
    const customerName = customer?.name || "Customer Demo";
    const nameParts = customerName.split(" ");
    const firstName = nameParts[0] || "Customer";
    const lastName = nameParts.slice(1).join(" ") || "";

    const customerEmail = customer?.email || "customer@example.com";
    const customerPhone = customer?.phone || "08123456789";
    const customerAddress = customer?.address || "";

    const shippingItem = shippingCost > 0 ? [{
        id: "SHIPPING",
        price: shippingCost,
        quantity: 1,
        name: "Ongkos Kirim"
    }] : [];

    const parameter = {
        transaction_details: {
            order_id: orderId,
            gross_amount: total,
        },
        item_details: [
            ...items.map((item) => ({
                id: item.id,
                price: item.price,
                quantity: item.quantity,
                name: item.name.substring(0, 50),
            })),
            ...shippingItem
        ],
        customer_details: {
            first_name: firstName,
            last_name: lastName,
            email: customerEmail,
            phone: customerPhone,
            shipping_address: customerAddress ? {
                first_name: firstName,
                last_name: lastName,
                phone: customerPhone,
                address: customerAddress,
            } : undefined,
        },
    };

    try {
        const transaction = await snap.createTransaction(parameter);

        // Save order to database
        try {
            await prisma.order.create({
                data: {
                    id: orderId,
                    customerName,
                    customerEmail,
                    customerPhone,
                    address: customerAddress,
                    totalAmount: total,
                    shippingCost,
                    snapToken: transaction.token,
                    status: "PENDING",
                    paymentStatus: "unpaid",
                }
            });
            console.log(`[DB] Order ${orderId} saved to database`);
        } catch (dbError) {
            // Log but don't fail - order still created in Midtrans
            console.error("[DB] Failed to save order:", dbError);
        }

        console.log(`[NOTIF] Order Created ${orderId} for ${customerEmail}. Awaiting payment...`);

        return {
            token: transaction.token,
            redirect_url: transaction.redirect_url,
            orderId: orderId,
            customerEmail: customerEmail
        };
    } catch (error) {
        console.error("Midtrans Error:", error);
        throw new Error("Failed to create transaction");
    }
}

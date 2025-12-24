"use server";

import prisma from "@/lib/db";
import { generateOrderCode } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface CheckoutData {
    customerName: string;
    email: string;
    phone: string;
    address: string;
    note?: string;
}

export async function createOrder(data: CheckoutData) {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("cart_session_id")?.value;

    if (!sessionId) {
        return { success: false, error: "Không tìm thấy giỏ hàng" };
    }

    const cart = await prisma.cart.findUnique({
        where: { sessionId },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    if (!cart || cart.items.length === 0) {
        return { success: false, error: "Giỏ hàng trống" };
    }

    // Calculate totals
    const subtotal = cart.items.reduce((acc, item) => {
        const price = item.product.salePrice || item.product.price;
        return acc + price * item.quantity;
    }, 0);

    const total = subtotal; // Can add shipping, discount logic here

    // Create order
    const order = await prisma.order.create({
        data: {
            orderCode: generateOrderCode(),
            customerName: data.customerName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            note: data.note || null,
            subtotal,
            total,
            paymentMethod: "COD",
            status: "pending",
            items: {
                create: cart.items.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.product.salePrice || item.product.price,
                })),
            },
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    // Clear cart
    await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
    });

    revalidatePath("/gio-hang");

    return { success: true, orderCode: order.orderCode };
}

export async function getOrderByCode(code: string) {
    const order = await prisma.order.findUnique({
        where: { orderCode: code },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    return order;
}

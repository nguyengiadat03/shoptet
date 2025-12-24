"use server";

import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

const CART_SESSION_KEY = "cart_session_id";

export async function getOrCreateCart() {
    const cookieStore = await cookies();
    let sessionId = cookieStore.get(CART_SESSION_KEY)?.value;

    if (!sessionId) {
        sessionId = uuidv4();
        cookieStore.set(CART_SESSION_KEY, sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });
    }

    let cart = await prisma.cart.findUnique({
        where: { sessionId },
        include: {
            items: {
                include: {
                    product: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    if (!cart) {
        cart = await prisma.cart.create({
            data: { sessionId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }

    return cart;
}

export async function addToCart(productId: string, quantity: number = 1) {
    const cart = await getOrCreateCart();

    const existingItem = cart.items.find((item) => item.productId === productId);

    if (existingItem) {
        await prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + quantity },
        });
    } else {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                quantity,
            },
        });
    }

    revalidatePath("/gio-hang");
    return { success: true };
}

export async function updateCartItem(itemId: string, quantity: number) {
    if (quantity <= 0) {
        await prisma.cartItem.delete({
            where: { id: itemId },
        });
    } else {
        await prisma.cartItem.update({
            where: { id: itemId },
            data: { quantity },
        });
    }

    revalidatePath("/gio-hang");
    return { success: true };
}

export async function removeFromCart(itemId: string) {
    await prisma.cartItem.delete({
        where: { id: itemId },
    });

    revalidatePath("/gio-hang");
    return { success: true };
}

export async function clearCart() {
    const cart = await getOrCreateCart();

    await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
    });

    revalidatePath("/gio-hang");
    return { success: true };
}

export async function getCartItemCount() {
    const cart = await getOrCreateCart();
    return cart.items.reduce((acc, item) => acc + item.quantity, 0);
}

"use server";

import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

const CART_SESSION_KEY = "cart_session_id";

// Helper to get existing session ID without creating new one
async function getSessionId() {
    const cookieStore = await cookies();
    return cookieStore.get(CART_SESSION_KEY)?.value;
}

// Helper to create new session (only called from Server Actions)
async function createSession() {
    const sessionId = uuidv4();
    const cookieStore = await cookies();
    cookieStore.set(CART_SESSION_KEY, sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return sessionId;
}

export async function getCart() {
    const sessionId = await getSessionId();

    if (!sessionId) {
        return {
            id: "temp",
            sessionId: "temp",
            items: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }

    const cart = await prisma.cart.findUnique({
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
        return {
            id: "temp",
            sessionId: "temp",
            items: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }

    return cart;
}

async function getOrCreateCart() {
    let sessionId = await getSessionId();

    if (!sessionId) {
        sessionId = await createSession();
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

    const existingItem = cart.items.find((item: any) => item.productId === productId);

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
    const sessionId = await getSessionId();
    if (!sessionId) return { success: true };

    const cart = await prisma.cart.findUnique({
        where: { sessionId },
    });

    if (cart) {
        await prisma.cartItem.deleteMany({
            where: { cartId: cart.id },
        });
    }

    revalidatePath("/gio-hang");
    return { success: true };
}

export async function getCartItemCount() {
    const cart = await getCart();
    return cart.items.reduce((acc: number, item: any) => acc + item.quantity, 0);
}

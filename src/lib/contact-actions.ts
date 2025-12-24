"use server";

import prisma from "@/lib/db";

export async function submitContactForm(data: {
    name: string;
    address?: string;
    phone: string;
    interest?: string;
    message?: string;
}) {
    const contact = await prisma.contactForm.create({
        data: {
            name: data.name,
            address: data.address || null,
            phone: data.phone,
            interest: data.interest || null,
            message: data.message || null,
        },
    });

    return { success: true, id: contact.id };
}

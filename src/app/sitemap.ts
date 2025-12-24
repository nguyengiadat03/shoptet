import { MetadataRoute } from "next";
import prisma from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Get all categories
    const categories = await prisma.category.findMany({
        select: { slug: true, updatedAt: true },
    });

    // Get all products
    const products = await prisma.product.findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true },
    });

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/gio-hang`,
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/thanh-toan`,
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 0.5,
        },
        {
            url: `${baseUrl}/lien-he`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/tim-kiem`,
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/chinh-sach/bao-mat`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/chinh-sach/doi-tra`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/chinh-sach/giao-hang-thanh-toan`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    // Category pages
    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
        url: `${baseUrl}/danh-muc/${category.slug}`,
        lastModified: category.updatedAt,
        changeFrequency: "daily",
        priority: 0.8,
    }));

    // Product pages
    const productPages: MetadataRoute.Sitemap = products.map((product) => ({
        url: `${baseUrl}/san-pham/${product.slug}`,
        lastModified: product.updatedAt,
        changeFrequency: "weekly",
        priority: 0.9,
    }));

    return [...staticPages, ...categoryPages, ...productPages];
}

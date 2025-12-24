const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // Clear existing data
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.testimonial.deleteMany();
    await prisma.contactForm.deleteMany();
    await prisma.setting.deleteMany();

    // ================== CATEGORIES ==================
    const categories = await Promise.all([
        prisma.category.create({
            data: {
                name: "Quà tết Doanh Nghiệp",
                slug: "qua-tet-doanh-nghiep",
                description: "Giỏ quà Tết sang trọng dành cho doanh nghiệp, đối tác",
                sortOrder: 1,
            },
        }),
        prisma.category.create({
            data: {
                name: "Quà tết Đối Tác",
                slug: "qua-tet-doi-tac",
                description: "Quà tặng Tết đẳng cấp cho đối tác kinh doanh",
                sortOrder: 2,
            },
        }),
        prisma.category.create({
            data: {
                name: "Quà tết Sếp",
                slug: "qua-tet-sep",
                description: "Quà Tết cao cấp tặng sếp và lãnh đạo",
                sortOrder: 3,
            },
        }),
        prisma.category.create({
            data: {
                name: "Quà tết Nhân Viên",
                slug: "qua-tet-nhan-vien",
                description: "Quà Tết ý nghĩa dành tặng nhân viên",
                sortOrder: 4,
            },
        }),
        prisma.category.create({
            data: {
                name: "Quà tết Bố Mẹ",
                slug: "qua-tet-bo-me",
                description: "Quà Tết thể hiện lòng hiếu thảo với cha mẹ",
                sortOrder: 5,
            },
        }),
        prisma.category.create({
            data: {
                name: "Khay mứt",
                slug: "khay-mut",
                description: "Khay đựng bánh kẹo mứt Tết cao cấp",
                sortOrder: 6,
            },
        }),
        prisma.category.create({
            data: {
                name: "Hộp quà Tết",
                slug: "hop-qua-tet",
                description: "Hộp quà Tết thiết kế sang trọng",
                sortOrder: 7,
            },
        }),
        prisma.category.create({
            data: {
                name: "Giỏ quà Tết",
                slug: "gio-qua-tet",
                description: "Giỏ quà Tết phong phú, đa dạng",
                sortOrder: 8,
            },
        }),
    ]);

    console.log(`✅ Created ${categories.length} categories`);

    // Create 10 sample products
    const products = [];
    for (let i = 0; i < 10; i++) {
        const catIndex = i % categories.length;
        const price = 500000 + Math.floor(Math.random() * 2000000);
        const discount = Math.floor(Math.random() * 30);
        const salePrice = price - (price * discount / 100);

        const product = await prisma.product.create({
            data: {
                sku: `QTVV${String(i + 1).padStart(4, '0')}`,
                name: `Set quà Tết ${['An Khang', 'Phú Quý', 'Tài Lộc', 'Thịnh Vượng', 'Cát Tường'][i % 5]} ${i + 1}`,
                slug: `set-qua-tet-${i + 1}`,
                shortDesc: `Set quà Tết cao cấp số ${i + 1}`,
                longDesc: `<p>Set quà Tết cao cấp, thiết kế sang trọng, phù hợp cho mọi đối tượng.</p>`,
                price: price,
                salePrice: salePrice,
                discountPercent: discount,
                images: JSON.stringify(["/images/placeholder.svg"]),
                categoryId: categories[catIndex].id,
                tags: JSON.stringify(["gio-qua", "cao-cap"]),
                priceRange: price < 500000 ? "duoi-500k" : price < 1000000 ? "500k-1trieu" : price < 2000000 ? "1-2trieu" : "tren-2trieu",
                productType: catIndex === 5 ? "khay-mut" : catIndex === 6 ? "hop-qua" : "gio-qua",
                isFeatured: i < 3,
            },
        });
        products.push(product);
    }

    console.log(`✅ Created ${products.length} products`);

    // ================== TESTIMONIALS ==================
    await prisma.testimonial.createMany({
        data: [
            {
                name: "Chị Minh - Sài Gòn",
                content: "Mình làm việc ở Sài Gòn, Tết năm ngoài không về quê được nên đã đặt một giỏ quà Tết tại shop. Rất hài lòng về chất lượng sản phẩm và dịch vụ.",
                rating: 5,
            },
            {
                name: "Anh Hoàng - Hà Nội",
                content: "Website rất dễ dùng, mẫu mã đa dạng. Điều mình thích nhất là các bạn nhân viên hỗ trợ qua Zalo cực nhanh.",
                rating: 5,
            },
            {
                name: "Chị Lan - Đà Nẵng",
                content: "Tôi đã đặt 20 set quà Tết cho công ty. Shop hỗ trợ in logo công ty rất đẹp và chuyên nghiệp.",
                rating: 5,
            },
        ],
    });

    console.log("✅ Created testimonials");

    // ================== SETTINGS ==================
    await prisma.setting.createMany({
        data: [
            { key: "site_name", value: "Shop Quà Tết Việt" },
            { key: "site_phone", value: "0934 022 424" },
            { key: "site_email", value: "info@shopquatetvivu.com" },
        ],
    });

    console.log("✅ Created settings");
    console.log("🎉 Seeding completed!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

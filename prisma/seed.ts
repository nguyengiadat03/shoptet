import { PrismaClient } from "@prisma/client";

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

    // ================== PRODUCTS ==================
    const productData = [
        // Khay mứt
        {
            sku: "KHAY001",
            name: "Khay hình Tròn - Nắp kính cường lực - Có hũ - Gỗ óc chó cao cấp",
            slug: "khay-hinh-tron-nap-kinh-cuong-luc",
            shortDesc: "Khay đựng bánh kẹo Tết hình tròn, nắp kính cường lực, gỗ óc chó cao cấp",
            longDesc: `<h3>Giỏ quà Tết 2026 – Khay mứt Tết An Khang</h3>
<p><strong>Mã sản phẩm:</strong> KHAY001</p>
<p><strong>Kích thước:</strong> 30x30x12 (cm)</p>
<p>Lấy cảm hứng từ ước nguyên cát tường và hình thượng hoa vương đinh, set quà truyền tải mong muốn hợp tác bền vững, và doanh vang bao cao.</p>
<p><strong>Phù hợp cho:</strong></p>
<ul>
<li>Doanh nghiệp làm quà tri ân khách hàng, nhân viên, đối tác.</li>
<li>Quà Tết trao may mắn cho sếp, cấp trên, bạn bè hay người thân.</li>
<li>Quà Tết tặng bố mẹ gửi gắm lòng hiếu kính.</li>
</ul>`,
            price: 1690000,
            salePrice: 1490000,
            discountPercent: 12,
            images: JSON.stringify([
                "/images/products/khay-tron-1.jpg",
                "/images/products/khay-tron-2.jpg",
            ]),
            categoryId: categories[5].id, // Khay mứt
            tags: JSON.stringify(["khay-mut", "go-oc-cho", "cao-cap"]),
            priceRange: "1-2trieu",
            productType: "khay-mut",
        },
        {
            sku: "KHAY002",
            name: "Khay mứt Tết 2 tầng, 8 ngăn - Hủ inox - Gỗ óc chó",
            slug: "khay-mut-tet-2-tang-8-ngan",
            shortDesc: "Khay mứt Tết 2 tầng thiết kế 8 ngăn, hũ inox cao cấp",
            longDesc: `<h3>Khay mứt Tết 2 tầng cao cấp</h3>
<p>Thiết kế 8 ngăn tiện lợi, chất liệu gỗ óc chó và hũ inox sang trọng.</p>`,
            price: 3690000,
            salePrice: 2690000,
            discountPercent: 27,
            images: JSON.stringify([
                "/images/products/khay-2tang-1.jpg",
                "/images/products/khay-2tang-2.jpg",
            ]),
            categoryId: categories[5].id,
            tags: JSON.stringify(["khay-mut", "2-tang", "inox"]),
            priceRange: "tren-2trieu",
            productType: "khay-mut",
        },
        {
            sku: "KHAY003",
            name: "Khay hình Chữ nhật - Nắp mica - Không hũ - Gỗ óc chó cao cấp",
            slug: "khay-hinh-chu-nhat-nap-mica",
            shortDesc: "Khay mứt Tết chữ nhật, nắp mica trong suốt",
            longDesc: `<h3>Khay mứt Tết chữ nhật cao cấp</h3>
<p>Thiết kế hiện đại với nắp mica trong suốt, gỗ óc chó cao cấp.</p>`,
            price: 990000,
            salePrice: 960000,
            discountPercent: 3,
            images: JSON.stringify(["/images/products/khay-chunhat-1.jpg"]),
            categoryId: categories[5].id,
            tags: JSON.stringify(["khay-mut", "chu-nhat", "mica"]),
            priceRange: "500k-1trieu",
            productType: "khay-mut",
        },
        {
            sku: "KHAY004",
            name: "Khay hình Chữ nhật - Nắp kính cường lực - Có hũ - Gỗ óc chó cao cấp",
            slug: "khay-chu-nhat-nap-kinh-cuong-luc",
            shortDesc: "Khay mứt Tết chữ nhật với nắp kính cường lực sang trọng",
            longDesc: `<h3>Khay mứt Tết chữ nhật cao cấp</h3>
<p>Nắp kính cường lực, có hũ đựng, gỗ óc chó cao cấp.</p>`,
            price: 1590000,
            salePrice: 1490000,
            discountPercent: 6,
            images: JSON.stringify(["/images/products/khay-chunhat-kinh-1.jpg"]),
            categoryId: categories[5].id,
            tags: JSON.stringify(["khay-mut", "kinh-cuong-luc"]),
            priceRange: "1-2trieu",
            productType: "khay-mut",
        },
        // Giỏ quà Tết
        {
            sku: "QTVV0001",
            name: "Set quà Tết Vạn Phúc - QTVV0012",
            slug: "set-qua-tet-van-phuc-qtvv0012",
            shortDesc: "Set quà Tết Vạn Phúc sang trọng cho doanh nghiệp",
            longDesc: `<h3>Set quà Tết Vạn Phúc</h3>
<p>Bộ quà Tết cao cấp, thiết kế sang trọng phù hợp cho doanh nghiệp.</p>`,
            price: 1880000,
            salePrice: 1680000,
            discountPercent: 11,
            images: JSON.stringify(["/images/products/set-van-phuc-1.jpg"]),
            categoryId: categories[0].id, // Quà tết Doanh Nghiệp
            tags: JSON.stringify(["gio-qua", "doanh-nghiep"]),
            priceRange: "1-2trieu",
            productType: "gio-qua",
            isFeatured: true,
        },
        {
            sku: "QTVV0002",
            name: "Set quà Tết Tài Lộc - QTVV0022",
            slug: "set-qua-tet-tai-loc-qtvv0022",
            shortDesc: "Set quà Tết Tài Lộc may mắn đầu năm",
            longDesc: `<h3>Set quà Tết Tài Lộc</h3>
<p>Mang đến may mắn và tài lộc cho năm mới.</p>`,
            price: 1050000,
            salePrice: 920000,
            discountPercent: 12,
            images: JSON.stringify(["/images/products/set-tai-loc-1.jpg"]),
            categoryId: categories[7].id, // Giỏ quà Tết
            tags: JSON.stringify(["gio-qua", "tai-loc"]),
            priceRange: "500k-1trieu",
            productType: "gio-qua",
            isFeatured: true,
        },
        {
            sku: "QTVV0003",
            name: "Set quà Tết An Khang - QTVV0032",
            slug: "set-qua-tet-an-khang-qtvv0032",
            shortDesc: "Set quà Tết An Khang bình an khỏe mạnh",
            longDesc: `<h3>Set quà Tết An Khang</h3>
<p>Chúc bình an, khỏe mạnh và hạnh phúc.</p>`,
            price: 650000,
            salePrice: 530000,
            discountPercent: 18,
            images: JSON.stringify(["/images/products/set-an-khang-1.jpg"]),
            categoryId: categories[7].id,
            tags: JSON.stringify(["gio-qua", "an-khang"]),
            priceRange: "500k-1trieu",
            productType: "gio-qua",
        },
        {
            sku: "QTVV0004",
            name: "Hộp quà Tết An Khang - QTVV0004",
            slug: "hop-qua-tet-an-khang-qtvv0004",
            shortDesc: "Hộp quà Tết An Khang thiết kế tinh tế",
            longDesc: `<h3>Giỏ quà Tết 2026 – Set quà Tết An Khang</h3>
<p><strong>Mã sản phẩm:</strong> QTVV0004</p>
<p><strong>Kích thước:</strong> 36x36x11 (cm)</p>
<p>Lấy cảm hứng từ ước nguyên cát tường và hình thượng hoa vương đinh, set quà truyền tải mong muốn hợp tác bền vững, và doanh vang bao cao. Đây chính là món quà giúp doanh nghiệp khẳng định đẳng vức và cam kết một tương lai phát triển.</p>
<p><strong>Phù hợp cho:</strong></p>
<ul>
<li>Doanh nghiệp làm quà tri ân khách hàng, nhân viên, đối tác.</li>
<li>Quà Tết trao may mắn cho sếp, cấp trên, bạn bè hay người thân.</li>
<li>Quà Tết tặng bố mẹ gửi gắm lòng hiếu kính.</li>
</ul>
<p><strong>Set quà gồm:</strong></p>
<ul>
<li>Hộp quà thiết kế sang trọng</li>
<li>Bánh kẹo cao cấp</li>
<li>Hạt điều, hạt dẻ</li>
<li>Trà thượng hạng</li>
</ul>`,
            price: 720000,
            salePrice: 570000,
            discountPercent: 21,
            images: JSON.stringify([
                "/images/products/hop-an-khang-1.jpg",
                "/images/products/hop-an-khang-2.jpg",
                "/images/products/hop-an-khang-3.jpg",
                "/images/products/hop-an-khang-4.jpg",
            ]),
            categoryId: categories[6].id, // Hộp quà Tết
            tags: JSON.stringify(["hop-qua", "an-khang", "cao-cap"]),
            priceRange: "500k-1trieu",
            productType: "hop-qua",
            isFeatured: true,
        },
        {
            sku: "QTVV0005",
            name: "Set quà Tết Phú Quý - QTVV0052",
            slug: "set-qua-tet-phu-quy-qtvv0052",
            shortDesc: "Set quà Tết Phú Quý giàu sang",
            longDesc: `<h3>Set quà Tết Phú Quý</h3>
<p>Biểu tượng của sự giàu có và thịnh vượng.</p>`,
            price: 1350000,
            salePrice: 1150000,
            discountPercent: 15,
            images: JSON.stringify(["/images/products/set-phu-quy-1.jpg"]),
            categoryId: categories[0].id,
            tags: JSON.stringify(["gio-qua", "phu-quy"]),
            priceRange: "1-2trieu",
            productType: "gio-qua",
        },
        {
            sku: "DKG21",
            name: "Set quà DKG.21",
            slug: "set-qua-dkg21",
            shortDesc: "Set quà Tết DKG.21 cao cấp",
            longDesc: `<h3>Set quà DKG.21</h3><p>Bộ quà Tết cao cấp, thiết kế sang trọng.</p>`,
            price: 4270000,
            salePrice: 4270000,
            discountPercent: 0,
            images: JSON.stringify(["/images/products/set-dkg21-1.jpg"]),
            categoryId: categories[0].id,
            tags: JSON.stringify(["set-qua", "cao-cap"]),
            priceRange: "tren-2trieu",
            productType: "gio-qua",
        },
        {
            sku: "DKG26",
            name: "Set quà DKG.26",
            slug: "set-qua-dkg26",
            shortDesc: "Set quà Tết DKG.26 sang trọng",
            longDesc: `<h3>Set quà DKG.26</h3><p>Bộ quà Tết thiết kế đẳng cấp.</p>`,
            price: 1320000,
            salePrice: 1120000,
            discountPercent: 15,
            images: JSON.stringify(["/images/products/set-dkg26-1.jpg"]),
            categoryId: categories[1].id, // Đối tác
            tags: JSON.stringify(["set-qua"]),
            priceRange: "1-2trieu",
            productType: "gio-qua",
        },
        {
            sku: "DKG04",
            name: "Set quà DKG.04",
            slug: "set-qua-dkg04",
            shortDesc: "Set quà Tết DKG.04",
            longDesc: `<h3>Set quà DKG.04</h3><p>Bộ quà Tết chất lượng cao.</p>`,
            price: 940000,
            salePrice: 880000,
            discountPercent: 6,
            images: JSON.stringify(["/images/products/set-dkg04-1.jpg"]),
            categoryId: categories[2].id, // Sếp
            tags: JSON.stringify(["set-qua"]),
            priceRange: "500k-1trieu",
            productType: "gio-qua",
        },
        {
            sku: "QTV0007",
            name: "Set quà Tết Cát Tường - QTV00073",
            slug: "set-qua-tet-cat-tuong-qtv00073",
            shortDesc: "Set quà Tết Cát Tường may mắn",
            longDesc: `<h3>Set quà Tết Cát Tường</h3><p>Mang đến điều may mắn và tốt lành.</p>`,
            price: 880000,
            salePrice: 680000,
            discountPercent: 23,
            images: JSON.stringify(["/images/products/set-cat-tuong-1.jpg"]),
            categoryId: categories[3].id, // Nhân viên
            tags: JSON.stringify(["set-qua", "cat-tuong"]),
            priceRange: "500k-1trieu",
            productType: "gio-qua",
        },
        {
            sku: "DKG05",
            name: "Set quà DKG.05",
            slug: "set-qua-dkg05",
            shortDesc: "Set quà Tết DKG.05 tinh tế",
            longDesc: `<h3>Set quà DKG.05</h3><p>Quà Tết tinh tế, phù hợp mọi đối tượng.</p>`,
            price: 1200000,
            salePrice: 999000,
            discountPercent: 17,
            images: JSON.stringify(["/images/products/set-dkg05-1.jpg"]),
            categoryId: categories[4].id, // Bố mẹ
            tags: JSON.stringify(["set-qua"]),
            priceRange: "500k-1trieu",
            productType: "gio-qua",
        },
        {
            sku: "DKG30",
            name: "Set quà DKG.30",
            slug: "set-qua-dkg30",
            shortDesc: "Set quà Tết DKG.30 cao cấp",
            longDesc: `<h3>Set quà DKG.30</h3><p>Bộ quà Tết cao cấp, sang trọng.</p>`,
            price: 3000000,
            salePrice: 2929000,
            discountPercent: 2,
            images: JSON.stringify(["/images/products/set-dkg30-1.jpg"]),
            categoryId: categories[0].id,
            tags: JSON.stringify(["set-qua", "cao-cap"]),
            priceRange: "tren-2trieu",
            productType: "gio-qua",
        },
        {
            sku: "DKG10",
            name: "Set quà DKG.10",
            slug: "set-qua-dkg10",
            shortDesc: "Set quà Tết DKG.10",
            longDesc: `<h3>Set quà DKG.10</h3><p>Bộ quà Tết đẹp mắt.</p>`,
            price: 1200000,
            salePrice: 1110000,
            discountPercent: 8,
            images: JSON.stringify(["/images/products/set-dkg10-1.jpg"]),
            categoryId: categories[1].id,
            tags: JSON.stringify(["set-qua"]),
            priceRange: "1-2trieu",
            productType: "gio-qua",
        },
        {
            sku: "DKG28",
            name: "Set quà DKG.28",
            slug: "set-qua-dkg28",
            shortDesc: "Set quà Tết DKG.28 sang trọng",
            longDesc: `<h3>Set quà DKG.28</h3><p>Bộ quà Tết thiết kế trang nhã.</p>`,
            price: 2100000,
            salePrice: 2028000,
            discountPercent: 3,
            images: JSON.stringify(["/images/products/set-dkg28-1.jpg"]),
            categoryId: categories[2].id,
            tags: JSON.stringify(["set-qua", "sang-trong"]),
            priceRange: "tren-2trieu",
            productType: "gio-qua",
        },
        // Thêm sản phẩm theo giá
        {
            sku: "GIA001",
            name: "Giỏ quà Tết Bình An - Dưới 500k",
            slug: "gio-qua-tet-binh-an-duoi-500k",
            shortDesc: "Giỏ quà Tết giá tốt dưới 500.000đ",
            longDesc: `<h3>Giỏ quà Tết Bình An</h3><p>Phù hợp ngân sách tiết kiệm nhưng vẫn đầy ý nghĩa.</p>`,
            price: 480000,
            salePrice: 450000,
            discountPercent: 6,
            images: JSON.stringify(["/images/products/gio-binh-an-1.jpg"]),
            categoryId: categories[7].id,
            tags: JSON.stringify(["gio-qua", "gia-tot"]),
            priceRange: "duoi-500k",
            productType: "gio-qua",
        },
        {
            sku: "GIA002",
            name: "Hộp quà Tết Xuân Sang - Dưới 500k",
            slug: "hop-qua-tet-xuan-sang-duoi-500k",
            shortDesc: "Hộp quà Tết giá tốt dưới 500.000đ",
            longDesc: `<h3>Hộp quà Tết Xuân Sang</h3><p>Tiết kiệm mà vẫn ý nghĩa.</p>`,
            price: 420000,
            salePrice: 380000,
            discountPercent: 10,
            images: JSON.stringify(["/images/products/hop-xuan-sang-1.jpg"]),
            categoryId: categories[6].id,
            tags: JSON.stringify(["hop-qua", "gia-tot"]),
            priceRange: "duoi-500k",
            productType: "hop-qua",
        },
        // 500k - 1 triệu
        {
            sku: "GIA003",
            name: "Set quà Tết Hạnh Phúc - 500k-1tr",
            slug: "set-qua-tet-hanh-phuc-500k-1tr",
            shortDesc: "Set quà Tết phân khúc 500.000đ - 1.000.000đ",
            longDesc: `<h3>Set quà Tết Hạnh Phúc</h3><p>Lựa chọn phổ biến cho quà tặng ý nghĩa.</p>`,
            price: 750000,
            salePrice: 680000,
            discountPercent: 9,
            images: JSON.stringify(["/images/products/set-hanh-phuc-1.jpg"]),
            categoryId: categories[7].id,
            tags: JSON.stringify(["gio-qua"]),
            priceRange: "500k-1trieu",
            productType: "gio-qua",
        },
        // 1-2 triệu
        {
            sku: "GIA004",
            name: "Giỏ quà Tết Thịnh Vượng - 1-2tr",
            slug: "gio-qua-tet-thinh-vuong-1-2tr",
            shortDesc: "Giỏ quà Tết cao cấp 1.000.000đ - 2.000.000đ",
            longDesc: `<h3>Giỏ quà Tết Thịnh Vượng</h3><p>Sang trọng, đẳng cấp.</p>`,
            price: 1500000,
            salePrice: 1350000,
            discountPercent: 10,
            images: JSON.stringify(["/images/products/gio-thinh-vuong-1.jpg"]),
            categoryId: categories[0].id,
            tags: JSON.stringify(["gio-qua", "cao-cap"]),
            priceRange: "1-2trieu",
            productType: "gio-qua",
        },
        // Trên 2 triệu
        {
            sku: "GIA005",
            name: "Set quà Tết VIP Hoàng Gia - Trên 2tr",
            slug: "set-qua-tet-vip-hoang-gia-tren-2tr",
            shortDesc: "Set quà Tết VIP cao cấp nhất",
            longDesc: `<h3>Set quà Tết VIP Hoàng Gia</h3><p>Đẳng cấp tối thượng cho những dịp đặc biệt.</p>`,
            price: 3500000,
            salePrice: 3200000,
            discountPercent: 9,
            images: JSON.stringify(["/images/products/set-vip-hoang-gia-1.jpg"]),
            categoryId: categories[0].id,
            tags: JSON.stringify(["set-qua", "vip", "hoang-gia"]),
            priceRange: "tren-2trieu",
            productType: "gio-qua",
            isFeatured: true,
        },
        // Thêm sản phẩm theo loại
        {
            sku: "LOAI001",
            name: "Hộp quà Tết Phúc Lộc Thọ",
            slug: "hop-qua-tet-phuc-loc-tho",
            shortDesc: "Hộp quà mang ý nghĩa Phúc Lộc Thọ",
            longDesc: `<h3>Hộp quà Tết Phúc Lộc Thọ</h3><p>Ba điều ước nguyện tốt đẹp nhất.</p>`,
            price: 890000,
            salePrice: 780000,
            discountPercent: 12,
            images: JSON.stringify(["/images/products/hop-phuc-loc-tho-1.jpg"]),
            categoryId: categories[6].id,
            tags: JSON.stringify(["hop-qua", "phuc-loc-tho"]),
            priceRange: "500k-1trieu",
            productType: "hop-qua",
        },
        {
            sku: "LOAI002",
            name: "Giỏ quà Tết Hồng Phát",
            slug: "gio-qua-tet-hong-phat",
            shortDesc: "Giỏ quà màu đỏ may mắn",
            longDesc: `<h3>Giỏ quà Tết Hồng Phát</h3><p>Màu đỏ may mắn, tài lộc dồi dào.</p>`,
            price: 1250000,
            salePrice: 1100000,
            discountPercent: 12,
            images: JSON.stringify(["/images/products/gio-hong-phat-1.jpg"]),
            categoryId: categories[7].id,
            tags: JSON.stringify(["gio-qua", "hong-phat"]),
            priceRange: "1-2trieu",
            productType: "gio-qua",
        },
        // Thêm nhiều sản phẩm khay mứt
        {
            sku: "KHAY005",
            name: "Khay mứt Tết Lục Giác - Gỗ sồi",
            slug: "khay-mut-tet-luc-giac-go-soi",
            shortDesc: "Khay mứt hình lục giác độc đáo",
            longDesc: `<h3>Khay mứt Tết Lục Giác</h3><p>Thiết kế 6 cạnh độc đáo, gỗ sồi tự nhiên.</p>`,
            price: 850000,
            salePrice: 750000,
            discountPercent: 12,
            images: JSON.stringify(["/images/products/khay-luc-giac-1.jpg"]),
            categoryId: categories[5].id,
            tags: JSON.stringify(["khay-mut", "luc-giac", "go-soi"]),
            priceRange: "500k-1trieu",
            productType: "khay-mut",
        },
        {
            sku: "KHAY006",
            name: "Khay mứt Tết Hoa Sen - Sơn mài",
            slug: "khay-mut-tet-hoa-sen-son-mai",
            shortDesc: "Khay mứt hình hoa sen sơn mài truyền thống",
            longDesc: `<h3>Khay mứt Tết Hoa Sen</h3><p>Nghệ thuật sơn mài Việt Nam, hình hoa sen thanh tao.</p>`,
            price: 1800000,
            salePrice: 1550000,
            discountPercent: 14,
            images: JSON.stringify(["/images/products/khay-hoa-sen-1.jpg"]),
            categoryId: categories[5].id,
            tags: JSON.stringify(["khay-mut", "hoa-sen", "son-mai"]),
            priceRange: "1-2trieu",
            productType: "khay-mut",
        },
        // Thêm sản phẩm cho các danh mục còn lại
        {
            sku: "SEP001",
            name: "Set quà Tết Đại Phát dành cho Sếp",
            slug: "set-qua-tet-dai-phat-danh-cho-sep",
            shortDesc: "Set quà cao cấp nhất dành tặng sếp",
            longDesc: `<h3>Set quà Tết Đại Phát</h3><p>Thể hiện sự trân trọng với lãnh đạo.</p>`,
            price: 2800000,
            salePrice: 2500000,
            discountPercent: 11,
            images: JSON.stringify(["/images/products/set-dai-phat-1.jpg"]),
            categoryId: categories[2].id,
            tags: JSON.stringify(["set-qua", "sep", "cao-cap"]),
            priceRange: "tren-2trieu",
            productType: "gio-qua",
        },
        {
            sku: "NV001",
            name: "Set quà Tết Tri Ân dành cho Nhân Viên",
            slug: "set-qua-tet-tri-an-danh-cho-nhan-vien",
            shortDesc: "Set quà ý nghĩa tặng nhân viên cuối năm",
            longDesc: `<h3>Set quà Tết Tri Ân</h3><p>Gửi gắm lời cảm ơn đến nhân viên.</p>`,
            price: 650000,
            salePrice: 580000,
            discountPercent: 11,
            images: JSON.stringify(["/images/products/set-tri-an-1.jpg"]),
            categoryId: categories[3].id,
            tags: JSON.stringify(["set-qua", "nhan-vien"]),
            priceRange: "500k-1trieu",
            productType: "gio-qua",
        },
        {
            sku: "BM001",
            name: "Set quà Tết Hiếu Thảo tặng Bố Mẹ",
            slug: "set-qua-tet-hieu-thao-tang-bo-me",
            shortDesc: "Set quà thể hiện lòng hiếu thảo với cha mẹ",
            longDesc: `<h3>Set quà Tết Hiếu Thảo</h3><p>Món quà ý nghĩa nhất dành cho đấng sinh thành.</p>`,
            price: 1200000,
            salePrice: 1050000,
            discountPercent: 13,
            images: JSON.stringify(["/images/products/set-hieu-thao-1.jpg"]),
            categoryId: categories[4].id,
            tags: JSON.stringify(["set-qua", "bo-me", "hieu-thao"]),
            priceRange: "1-2trieu",
            productType: "gio-qua",
        },
        // Thêm sản phẩm đối tác
        {
            sku: "DT001",
            name: "Set quà Tết Hợp Tác dành cho Đối Tác",
            slug: "set-qua-tet-hop-tac-danh-cho-doi-tac",
            shortDesc: "Set quà thể hiện sự hợp tác bền vững",
            longDesc: `<h3>Set quà Tết Hợp Tác</h3><p>Gắn kết mối quan hệ đối tác lâu dài.</p>`,
            price: 1800000,
            salePrice: 1600000,
            discountPercent: 11,
            images: JSON.stringify(["/images/products/set-hop-tac-1.jpg"]),
            categoryId: categories[1].id,
            tags: JSON.stringify(["set-qua", "doi-tac"]),
            priceRange: "1-2trieu",
            productType: "gio-qua",
        },
        // Thêm thêm sản phẩm
        {
            sku: "QTVV0010",
            name: "Set quà Tết Kim Ngưu",
            slug: "set-qua-tet-kim-nguu",
            shortDesc: "Set quà mang biểu tượng Kim Ngưu thịnh vượng",
            longDesc: `<h3>Set quà Tết Kim Ngưu</h3><p>Biểu tượng của sự bền bỉ và thịnh vượng.</p>`,
            price: 1650000,
            salePrice: 1450000,
            discountPercent: 12,
            images: JSON.stringify(["/images/products/set-kim-nguu-1.jpg"]),
            categoryId: categories[0].id,
            tags: JSON.stringify(["set-qua", "kim-nguu"]),
            priceRange: "1-2trieu",
            productType: "gio-qua",
        },
        {
            sku: "QTVV0011",
            name: "Set quà Tết Phượng Hoàng",
            slug: "set-qua-tet-phuong-hoang",
            shortDesc: "Set quà cao cấp biểu tượng Phượng Hoàng",
            longDesc: `<h3>Set quà Tết Phượng Hoàng</h3><p>Sự tái sinh và may mắn vô biên.</p>`,
            price: 2200000,
            salePrice: 1950000,
            discountPercent: 11,
            images: JSON.stringify(["/images/products/set-phuong-hoang-1.jpg"]),
            categoryId: categories[0].id,
            tags: JSON.stringify(["set-qua", "phuong-hoang", "cao-cap"]),
            priceRange: "1-2trieu",
            productType: "gio-qua",
        },
        {
            sku: "QTVV0012",
            name: "Set quà Tết Rồng Vàng",
            slug: "set-qua-tet-rong-vang",
            shortDesc: "Set quà VIP biểu tượng Rồng Vàng",
            longDesc: `<h3>Set quà Tết Rồng Vàng</h3><p>Quyền lực, may mắn và phú quý.</p>`,
            price: 3800000,
            salePrice: 3400000,
            discountPercent: 11,
            images: JSON.stringify(["/images/products/set-rong-vang-1.jpg"]),
            categoryId: categories[0].id,
            tags: JSON.stringify(["set-qua", "rong-vang", "vip"]),
            priceRange: "tren-2trieu",
            productType: "gio-qua",
            isFeatured: true,
        },
    ];

    const products = await Promise.all(
        productData.map((p) => prisma.product.create({ data: p }))
    );

    console.log(`✅ Created ${products.length} products`);

    // ================== TESTIMONIALS ==================
    const testimonials = await Promise.all([
        prisma.testimonial.create({
            data: {
                name: "Chị Minh - Sài Gòn",
                content:
                    "Mình làm việc ở Sài Gòn, Tết năm ngoài không về quê được nên đã đặt một giỏ quà Tết sức khoẻ tại shop để gửi về cho bố mẹ ở nhà. Mình rất cảm động khi các bạn nhân viên đã tư vấn rất kỹ, giúp mình chọn những sản phẩm tốt cho người lớn tuổi như trà thảo mộc, yến sào, hạt dinh dưỡng. Giá quà được gói cẩn thận.",
                rating: 5,
            },
        }),
        prisma.testimonial.create({
            data: {
                name: "Anh Hoàng - Hà Nội",
                content:
                    "Công việc cuối năm của mình rất bận, không có thời gian đi lựa quà. Lượt web thấy Shopquatet.com, mình đã đặt thử 3 giỏ quà để tặng bạn bè. Website rất dễ dùng, mẫu mã đa dạng. Điều mình thích nhất là các bạn nhân viên hỗ trợ qua Zalo cực nhanh, xác nhận đơn và giao hàng chỉ trong 1 ngày ở nội thành TP.HCM.",
                rating: 5,
            },
        }),
        prisma.testimonial.create({
            data: {
                name: "Chị Lan - Đà Nẵng",
                content:
                    "Tôi đã đặt 20 set quà Tết cho công ty để tặng khách hàng VIP. Shopquatet đã hỗ trợ in logo công ty lên hộp quà rất đẹp và chuyên nghiệp. Giá cả hợp lý, giao hàng đúng hẹn. Năm sau chắc chắn sẽ tiếp tục đặt hàng.",
                rating: 5,
            },
        }),
        prisma.testimonial.create({
            data: {
                name: "Anh Tuấn - Bình Dương",
                content:
                    "Lần đầu mua quà online nhưng rất hài lòng. Set quà đẹp, đóng gói kỹ càng, sản phẩm bên trong tươi mới. Đặc biệt nhân viên tư vấn rất nhiệt tình, hỗ trợ chọn quà phù hợp với ngân sách.",
                rating: 5,
            },
        }),
        prisma.testimonial.create({
            data: {
                name: "Chị Hương - Vũng Tàu",
                content:
                    "Mình đặt khay mứt Tết gỗ óc chó, thật sự rất đẹp và sang trọng. Gia đình ai cũng khen. Chất lượng gỗ tốt, thiết kế tinh tế. Sẽ giới thiệu cho bạn bè.",
                rating: 5,
            },
        }),
        prisma.testimonial.create({
            data: {
                name: "Anh Nam - Cần Thơ",
                content:
                    "Đã mua nhiều lần và lần nào cũng hài lòng. Shop có đủ mức giá từ bình dân đến cao cấp, phù hợp với mọi nhu cầu. Giao hàng về miền Tây cũng rất nhanh.",
                rating: 5,
            },
        }),
    ]);

    console.log(`✅ Created ${testimonials.length} testimonials`);

    // ================== SETTINGS ==================
    await prisma.setting.createMany({
        data: [
            { key: "site_name", value: "Shop Quà Tết Việt" },
            { key: "site_phone", value: "0934 022 424" },
            { key: "site_email", value: "info@shopquatetvivu.com" },
            {
                key: "site_address",
                value:
                    "15 Đường số 2, khu đô thị Vạn Phúc, Phường Hiệp Bình, TP Hồ Chí Minh",
            },
            { key: "company_name", value: "Công ty TNHH Sản Xuất Thương Mại VIVU" },
            { key: "youtube_video", value: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
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

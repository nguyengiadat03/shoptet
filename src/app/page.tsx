import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import ContactFormSection from "@/components/ContactFormSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export const revalidate = 3600; // ISR: Revalidate every hour

async function getHomeData() {
  const [khayMutProducts, gioQuaProducts, testimonials] = await Promise.all([
    prisma.product.findMany({
      where: {
        productType: "khay-mut",
        isActive: true,
      },
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.findMany({
      where: {
        OR: [
          { productType: "gio-qua" },
          { productType: "hop-qua" },
        ],
        isActive: true,
      },
      take: 8,
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    }),
    prisma.testimonial.findMany({
      where: { isActive: true },
      take: 3,
    }),
  ]);

  return { khayMutProducts, gioQuaProducts, testimonials };
}

export default async function HomePage() {
  const { khayMutProducts, gioQuaProducts, testimonials } = await getHomeData();

  return (
    <>
      {/* Hero Title Strip */}
      <section className="py-8 bg-gradient-to-b from-[#fef9f0] to-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#b71c1c] font-[family-name:var(--font-playfair)] mb-4">
            50+ Giỏ Quà Tết đẹp 🏆 Hộp Quà Tết 2026 theo Set sang trọng
          </h1>
          <p className="text-gray-600 text-lg">
            Chuyên cung cấp quà tết doanh nghiệp, đối tác, sếp, nhân viên, bố mẹ
          </p>
        </div>
      </section>

      {/* Khay Bánh Kẹo Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title">KHAY BÁNH KẸO</h2>
          <p className="section-subtitle">Khay đựng bánh kẹo mứt Tết cao cấp</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {khayMutProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/danh-muc/khay-mut"
              className="btn btn-primary btn-shimmer"
            >
              Xem tất cả khay mứt
            </Link>
          </div>
        </div>
      </section>

      {/* Giỏ Quà Tết Section */}
      <section className="py-12 bg-[#fef9f0]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title">GIỎ QUÀ TẾT</h2>
          <p className="section-subtitle">Set quà Tết sang trọng, ý nghĩa</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gioQuaProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/danh-muc/gio-qua-tet"
              className="btn btn-primary btn-shimmer"
            >
              Xem tất cả giỏ quà Tết
            </Link>
          </div>
        </div>
      </section>

      {/* Video + Contact Form Section */}
      <ContactFormSection />

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials} />

      {/* SEO Content Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>
              Cả hai đều là lựa chọn tốt, nhưng sẽ phù hợp với những phong cách
              khác nhau:
            </p>
            <ul>
              <li>
                <strong className="text-[#b71c1c]">Hộp quà tết:</strong> Thường
                được thiết kế rất tinh xảo, gọn gàng và hiện đại. Một set quà
                tết cao cấp dạng hộp sẽ rất phù hợp nếu sếp của bạn là người trẻ
                trung, yêu thích sự tối giản và thanh lịch.
              </li>
              <li>
                <strong className="text-[#b71c1c]">Giỏ quà tết:</strong> Mang
                cảm giác đầy đặn, sung túc và trang trọng hơn. Một giỏ quà tết
                sang trọng sẽ là món quà biếu tết tuyệt vời nếu bạn muốn thể
                hiện sự trân trọng và mang muốn một năm mới đủ đầy cho người
                nhận.
              </li>
            </ul>
            <p>
              Tết là để yêu thương và sẻ chia. Một giỏ quà Tết đẹp, một hộp quà
              Tết ý nghĩa sẽ giúp bạn gửi gắm những lời chúc tốt đẹp nhất đến
              những người thân trân quý.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

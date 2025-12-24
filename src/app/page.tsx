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
      take: 6,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.findMany({
      where: {
        OR: [{ productType: "gio-qua" }, { productType: "hop-qua" }],
        isActive: true,
      },
      take: 16,
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
      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-[#b71c1c] via-[#d32f2f] to-[#b71c1c] py-16 md:py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#f6c453] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#f6c453] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="inline-block mb-4">
              <span className="bg-[#f6c453] text-[#b71c1c] px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide">
                🎊 Tết Bính Ngọ 2026
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              50+ Giỏ Quà Tết đẹp 🏆
              <br />
              <span className="text-[#f6c453]">Hộp Quà Tết 2026</span> theo Set sang trọng
            </h1>
            
            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
              Chuyên cung cấp quà tết doanh nghiệp, đối tác, sếp, nhân viên, bố mẹ
              <br />
              <span className="text-[#f6c453] font-semibold">Giao hàng toàn quốc - Chiết khấu cao</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/danh-muc/gio-qua-tet"
                className="btn btn-shimmer bg-[#f6c453] text-[#b71c1c] hover:bg-[#ffd700] px-8 py-4 text-lg font-bold rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                🎁 Xem Giỏ Quà Tết
              </Link>
              <Link
                href="/lien-he"
                className="btn bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 px-8 py-4 text-lg font-bold rounded-lg"
              >
                📞 Liên Hệ Tư Vấn
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Khay Bánh Kẹo Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#b71c1c] mb-3">
              KHAY BÁNH KẸO
            </h2>
            <div className="w-24 h-1 bg-[#f6c453] mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">
              Khay đựng bánh kẹo mứt Tết cao cấp - Gỗ óc chó sang trọng
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {khayMutProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} showAddToCart />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/danh-muc/khay-mut"
              className="btn btn-primary btn-shimmer inline-block"
            >
              Xem tất cả khay mứt →
            </Link>
          </div>
        </div>
      </section>

      {/* Giỏ Quà Tết Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#b71c1c] mb-3">
              GIỎ QUÀ TẾT
            </h2>
            <div className="w-24 h-1 bg-[#f6c453] mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">
              Set quà Tết sang trọng, ý nghĩa - Đa dạng mẫu mã
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {gioQuaProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} showAddToCart />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/danh-muc/gio-qua-tet"
              className="btn btn-primary btn-shimmer inline-block"
            >
              Xem tất cả giỏ quà Tết →
            </Link>
          </div>
        </div>
      </section>

      {/* Video + Contact Form Section */}
      <section className="py-16 bg-white">
        <ContactFormSection />
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-[#fef9f0] to-white">
        <TestimonialsSection testimonials={testimonials} />
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-[#b71c1c] mb-6">
              Về Shopquatet.com
            </h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Shopquatet.com</strong> là đơn vị chuyên cung cấp{" "}
              <strong className="text-[#b71c1c]">giỏ quà Tết</strong> và{" "}
              <strong className="text-[#b71c1c]">hộp quà Tết</strong> cao cấp
              với hơn 50+ mẫu mã đa dạng, phù hợp cho mọi nhu cầu tặng quà.
            </p>

            <h3 className="text-xl font-bold text-[#b71c1c] mt-8 mb-4">
              Nên chọn Hộp quà hay Giỏ quà Tết?
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-[#b71c1c] mb-3 flex items-center gap-2">
                  <span className="text-2xl">📦</span> Hộp quà Tết
                </h4>
                <p className="text-gray-600">
                  Thiết kế tinh xảo, gọn gàng và hiện đại. Phù hợp với người trẻ
                  trung, yêu thích sự tối giản và thanh lịch.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-[#b71c1c] mb-3 flex items-center gap-2">
                  <span className="text-2xl">🧺</span> Giỏ quà Tết
                </h4>
                <p className="text-gray-600">
                  Mang cảm giác đầy đặn, sung túc và trang trọng. Thể hiện sự trân
                  trọng và mong muốn một năm mới đủ đầy.
                </p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed italic border-l-4 border-[#f6c453] pl-4 py-2 bg-[#fef9f0]">
              💝 Tết là để yêu thương và sẻ chia. Một giỏ quà Tết đẹp, một hộp quà
              Tết ý nghĩa sẽ giúp bạn gửi gắm những lời chúc tốt đẹp nhất đến
              những người thân trân quý.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

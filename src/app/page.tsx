import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import ContactFormSection from "@/components/ContactFormSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export const revalidate = 3600;

async function getHomeData() {
  const [khayMutProducts, gioQuaProducts, hopQuaProducts, testimonials] =
    await Promise.all([
      prisma.product.findMany({
        where: { productType: "khay-mut", isActive: true },
        take: 8,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.findMany({
        where: { productType: "gio-qua", isActive: true },
        take: 8,
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      }),
      prisma.product.findMany({
        where: { productType: "hop-qua", isActive: true },
        take: 8,
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      }),
      prisma.testimonial.findMany({
        where: { isActive: true },
        take: 3,
      }),
    ]);

  return { khayMutProducts, gioQuaProducts, hopQuaProducts, testimonials };
}

export default async function HomePage() {
  const { khayMutProducts, gioQuaProducts, hopQuaProducts, testimonials } =
    await getHomeData();

  return (
    <>
      {/* Hero Banner Section */}
      <section className="hero-section py-16 md:py-24 lg:py-32 relative">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float hidden lg:block">
          🏮
        </div>
        <div
          className="absolute top-20 right-20 text-5xl opacity-20 animate-float hidden lg:block"
          style={{ animationDelay: "1s" }}
        >
          🧧
        </div>
        <div
          className="absolute bottom-20 left-1/4 text-4xl opacity-15 animate-float hidden lg:block"
          style={{ animationDelay: "0.5s" }}
        >
          🎊
        </div>
        <div
          className="absolute bottom-10 right-1/4 text-5xl opacity-15 animate-float hidden lg:block"
          style={{ animationDelay: "1.5s" }}
        >
          🐴
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#ffd700] text-[#8b0000] px-6 py-2 rounded-full text-sm font-bold mb-6 shadow-lg animate-pulse-gold">
              <span>🐴</span>
              <span>TẾT BÍNH NGỌ 2026</span>
              <span>🐴</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-[family-name:var(--font-playfair)]">
              50+ Mẫu Giỏ Quà Tết Đẹp
              <br />
              <span className="text-[#ffd700]">Hộp Quà Tết 2026</span> Sang
              Trọng
            </h1>

            {/* Subtitle */}
            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Chuyên cung cấp quà Tết cho doanh nghiệp, đối tác, sếp, nhân viên,
              bố mẹ.
              <span className="block text-[#ffd700] font-semibold mt-2">
                ✨ Giao hàng toàn quốc - Chiết khấu cao cho đơn số lượng lớn
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/danh-muc/gio-qua-tet"
                className="btn btn-gold btn-shimmer text-lg px-10 py-4"
              >
                🎁 Xem Giỏ Quà Tết
              </Link>
              <Link
                href="/lien-he"
                className="btn btn-outline text-lg px-10 py-4"
              >
                📞 Liên Hệ Tư Vấn
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#ffd700]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Miễn phí giao hàng HCM</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#ffd700]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Đổi trả trong 7 ngày</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#ffd700]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Thanh toán khi nhận hàng</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Quick Links */}
      <section className="py-12 bg-gradient-to-b from-[#fff8e7] to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                name: "Giỏ Quà Tết",
                icon: "🧺",
                href: "/danh-muc/gio-qua-tet",
                color: "from-red-500 to-red-700",
              },
              {
                name: "Hộp Quà Tết",
                icon: "📦",
                href: "/danh-muc/hop-qua-tet",
                color: "from-amber-500 to-amber-700",
              },
              {
                name: "Khay Mứt Tết",
                icon: "🍬",
                href: "/danh-muc/khay-mut",
                color: "from-orange-500 to-orange-700",
              },
              {
                name: "Quà Doanh Nghiệp",
                icon: "🏢",
                href: "/danh-muc/qua-tet-doanh-nghiep",
                color: "from-rose-500 to-rose-700",
              },
            ].map((cat) => (
              <Link key={cat.name} href={cat.href} className="group">
                <div
                  className={`bg-gradient-to-br ${cat.color} p-6 rounded-2xl text-center text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}
                >
                  <span className="text-4xl md:text-5xl block mb-3">
                    {cat.icon}
                  </span>
                  <span className="font-semibold text-sm md:text-base">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Khay Bánh Kẹo Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="section-header">
            <h2 className="section-title">🍬 KHAY BÁNH KẸO TẾT</h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">
              Khay đựng bánh kẹo mứt Tết cao cấp - Gỗ óc chó sang trọng, thiết
              kế tinh xảo
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            {khayMutProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} showAddToCart />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/danh-muc/khay-mut"
              className="btn btn-primary btn-shimmer"
            >
              Xem tất cả khay mứt →
            </Link>
          </div>
        </div>
      </section>

      {/* Giỏ Quà Tết Section */}
      <section className="py-16 bg-gradient-to-b from-[#fff8e7] to-white relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#ffd700] rounded-full blur-[100px] opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#c41e3a] rounded-full blur-[100px] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="section-header">
            <h2 className="section-title">🧺 GIỎ QUÀ TẾT 2026</h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">
              Set quà Tết sang trọng, ý nghĩa - Đa dạng mẫu mã phù hợp mọi đối
              tượng
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            {gioQuaProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} showAddToCart />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/danh-muc/gio-qua-tet"
              className="btn btn-primary btn-shimmer"
            >
              Xem tất cả giỏ quà Tết →
            </Link>
          </div>
        </div>
      </section>

      {/* Hộp Quà Tết Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="section-header">
            <h2 className="section-title">📦 HỘP QUÀ TẾT CAO CẤP</h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">
              Hộp quà Tết thiết kế tinh xảo, gọn gàng và hiện đại - Phù hợp
              người trẻ trung
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            {hopQuaProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} showAddToCart />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/danh-muc/hop-qua-tet"
              className="btn btn-primary btn-shimmer"
            >
              Xem tất cả hộp quà Tết →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-br from-[#c41e3a] to-[#8b0000] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🏮</div>
          <div className="absolute bottom-10 right-10 text-8xl">🧧</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
              Tại sao chọn <span className="text-[#ffd700]">Shopquatet</span>?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Hơn 10 năm kinh nghiệm cung cấp quà Tết cho hàng nghìn doanh
              nghiệp và gia đình
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: "🎁",
                title: "50+ Mẫu Quà",
                desc: "Đa dạng mẫu mã, phong phú lựa chọn",
              },
              {
                icon: "🚚",
                title: "Giao Toàn Quốc",
                desc: "Miễn phí giao hàng nội thành HCM",
              },
              {
                icon: "💰",
                title: "Giá Tốt Nhất",
                desc: "Chiết khấu cao cho đơn số lượng",
              },
              {
                icon: "⭐",
                title: "Chất Lượng",
                desc: "Cam kết sản phẩm chính hãng 100%",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition"
              >
                <span className="text-5xl block mb-4">{item.icon}</span>
                <h3 className="font-bold text-lg mb-2 text-[#ffd700]">
                  {item.title}
                </h3>
                <p className="text-white/80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video + Contact Form Section */}
      <section className="py-16 bg-[#fff8e7]">
        <ContactFormSection />
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <TestimonialsSection testimonials={testimonials} />
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-[#c41e3a] mb-6 font-[family-name:var(--font-playfair)]">
              Về Shopquatet.com - Chuyên Giỏ Quà Tết 2026
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong className="text-[#c41e3a]">Shopquatet.com</strong> là đơn
              vị chuyên cung cấp <strong>giỏ quà Tết</strong> và{" "}
              <strong>hộp quà Tết</strong> cao cấp với hơn 50+ mẫu mã đa dạng,
              phù hợp cho mọi nhu cầu tặng quà dịp Tết Nguyên Đán.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-gradient-to-br from-[#fff8e7] to-white p-6 rounded-2xl border border-[#f2c18d]">
                <h3 className="font-bold text-[#c41e3a] mb-4 flex items-center gap-3 text-xl">
                  <span className="text-3xl">📦</span> Hộp quà Tết
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Thiết kế tinh xảo, gọn gàng và hiện đại. Phù hợp với người trẻ
                  trung, yêu thích sự tối giản và thanh lịch. Dễ dàng vận chuyển
                  và bảo quản.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#fff8e7] to-white p-6 rounded-2xl border border-[#f2c18d]">
                <h3 className="font-bold text-[#c41e3a] mb-4 flex items-center gap-3 text-xl">
                  <span className="text-3xl">🧺</span> Giỏ quà Tết
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Mang cảm giác đầy đặn, sung túc và trang trọng. Thể hiện sự
                  trân trọng và mong muốn một năm mới đủ đầy, thịnh vượng.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#c41e3a] to-[#8b0000] text-white p-6 rounded-2xl">
              <p className="text-lg leading-relaxed flex items-start gap-3">
                <span className="text-3xl">💝</span>
                <span>
                  <strong>Tết là để yêu thương và sẻ chia.</strong> Một giỏ quà
                  Tết đẹp, một hộp quà Tết ý nghĩa sẽ giúp bạn gửi gắm những lời
                  chúc tốt đẹp nhất đến những người thân yêu trong dịp Tết Bính
                  Ngọ 2026.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

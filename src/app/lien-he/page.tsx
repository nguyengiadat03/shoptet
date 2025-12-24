import { Metadata } from "next";
import ContactFormSection from "@/components/ContactFormSection";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ với Shop Quà Tết Việt - Hotline: 0934 022 424",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#c41e3a] to-[#8b0000] py-16 md:py-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-5 left-10 text-7xl">🏮</div>
          <div className="absolute bottom-5 right-10 text-7xl">🧧</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <span className="inline-block bg-[#ffd700] text-[#8b0000] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            🐴 TẾT BÍNH NGỌ 2026
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
            LIÊN HỆ VỚI CHÚNG TÔI
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn chọn quà Tết ý nghĩa nhất
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: "📍",
                title: "Địa chỉ",
                desc: "15 Đường số 2, khu đô thị Vạn Phúc, Phường Hiệp Bình, TP HCM",
              },
              {
                icon: "📞",
                title: "Hotline",
                desc: "0934 022 424",
                sub: "8:00 - 21:00 hàng ngày",
              },
              {
                icon: "📧",
                title: "Email",
                desc: "info@shopquatetvivu.com",
                sub: "Phản hồi trong 24h",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-8 bg-gradient-to-br from-[#fff8e7] to-white rounded-2xl border border-[#f2c18d]/50 hover:shadow-lg transition"
              >
                <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-[#c41e3a] to-[#8b0000] rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-4xl">{item.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-[#c41e3a] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700 font-medium">{item.desc}</p>
                {item.sub && (
                  <p className="text-gray-500 text-sm mt-1">{item.sub}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-[#fff8e7]">
        <ContactFormSection />
      </section>

      {/* Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="section-header mb-10">
            <h2 className="section-title">📍 BẢN ĐỒ</h2>
            <div className="section-divider"></div>
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden shadow-xl border-4 border-[#ffd700]/30">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4842!2d106.7!3d10.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDUxJzAwLjAiTiAxMDbCsDQyJzAwLjAiRQ!5e0!3m2!1svi!2s!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ Shop Quà Tết Việt"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-[#c41e3a] to-[#8b0000]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Cần tư vấn ngay? Gọi cho chúng tôi!
          </h2>
          <a
            href="tel:0934022424"
            className="btn btn-gold btn-shimmer text-lg px-10 py-4"
          >
            📞 0934 022 424
          </a>
        </div>
      </section>
    </div>
  );
}

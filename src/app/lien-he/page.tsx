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
      <section className="bg-gradient-to-b from-[#b71c1c] to-[#8b0000] py-16 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">LIÊN HỆ</h1>
          <p className="text-lg opacity-90">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Address */}
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#b71c1c] rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#b71c1c] mb-2">Địa chỉ</h3>
              <p className="text-gray-600 text-sm">
                15 Đường số 2, khu đô thị Vạn Phúc,
                <br />
                Phường Hiệp Bình, TP Hồ Chí Minh
              </p>
            </div>

            {/* Phone */}
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#b71c1c] rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#b71c1c] mb-2">
                Điện thoại
              </h3>
              <p className="text-gray-600 text-sm">
                Hotline: <strong>0934 022 424</strong>
                <br />
                (8:00 - 21:00 hàng ngày)
              </p>
            </div>

            {/* Email */}
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#b71c1c] rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#b71c1c] mb-2">Email</h3>
              <p className="text-gray-600 text-sm">
                info@shopquatetvivu.com
                <br />
                Phản hồi trong 24h
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactFormSection />

      {/* Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#b71c1c] text-center mb-8">
            Bản đồ
          </h2>
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-gray-200">
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
    </div>
  );
}

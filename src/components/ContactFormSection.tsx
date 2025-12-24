"use client";

import { useState, useTransition } from "react";
import { submitContactForm } from "@/lib/contact-actions";

export default function ContactFormSection() {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    interest: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await submitContactForm(formData);
      setSubmitted(true);
      setFormData({ name: "", address: "", phone: "", interest: "" });
    });
  };

  return (
    <section className="video-form-section py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Video */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#b71c1c] mb-6 font-[family-name:var(--font-playfair)]">
              Video giới thiệu khay quà Tết 2026
            </h2>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Video giới thiệu khay quà Tết"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <p className="text-gray-600 text-sm mt-4 flex items-center gap-2">
              Xem trên
              <span className="inline-flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                  <polygon fill="#fff" points="9.545,15.568 15.818,12 9.545,8.432"/>
                </svg>
                YouTube
              </span>
            </p>
          </div>

          {/* Contact Form */}
          <div className="contact-form-box">
            <h2 className="text-2xl md:text-3xl font-bold text-[#b71c1c] mb-2 font-[family-name:var(--font-playfair)]">
              Liên hệ đặt quà tết Bính Ngọ
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Nếu bạn có nhu cầu đặt giỏ quà tết 2026, hãy để lại thông tin,
              Shopquatetvivu.com sẽ liên hệ hỗ trợ ngay nhất!
            </p>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-600 mb-2">
                  Đăng ký thành công!
                </h3>
                <p className="text-gray-600">
                  Chúng tôi sẽ liên hệ với bạn sớm nhất.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Tên khách hàng"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="form-input"
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Sản phẩm đang quan tâm"
                  value={formData.interest}
                  onChange={(e) =>
                    setFormData({ ...formData, interest: e.target.value })
                  }
                  className="form-input"
                />
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn btn-primary btn-shimmer w-full"
                >
                  {isPending ? "Đang gửi..." : "ĐĂNG KÝ TƯ VẤN"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

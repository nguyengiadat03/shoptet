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
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Video */}
        <div>
          <div className="mb-6">
            <span className="inline-block bg-[#c41e3a] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
              🎬 VIDEO
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#c41e3a] font-[family-name:var(--font-playfair)]">
              Giới thiệu Quà Tết 2026
            </h2>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border-4 border-[#ffd700]">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video giới thiệu quà Tết"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <span className="text-[#ff0000]">▶</span> Xem trên YouTube
            </span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-box">
          <div className="mb-6">
            <span className="inline-block bg-[#ffd700] text-[#8b0000] text-xs font-bold px-3 py-1 rounded-full mb-3">
              🐴 TẾT BÍNH NGỌ 2026
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#c41e3a] font-[family-name:var(--font-playfair)]">
              Đăng ký tư vấn miễn phí
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              Để lại thông tin, chúng tôi sẽ liên hệ tư vấn ngay!
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-green-600"
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
                Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Họ và tên *"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="form-input"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Số điện thoại *"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="form-input"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Sản phẩm đang quan tâm"
                  value={formData.interest}
                  onChange={(e) =>
                    setFormData({ ...formData, interest: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary btn-shimmer w-full py-4 text-base"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Đang gửi...
                  </span>
                ) : (
                  "🎁 ĐĂNG KÝ TƯ VẤN NGAY"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="footer-company">
              <div className="mb-4">
                <span className="text-2xl font-bold">
                  <span className="text-white">Shop</span>
                  <span className="text-[#ffd700]">quatet</span>
                </span>
              </div>
              <h3 className="text-base font-bold mb-4">
                Công ty TNHH Sản Xuất Thương Mại VIVU
              </h3>
              <div className="space-y-3 text-sm text-white/90">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#ffd700]"
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
                  <span>
                    15 Đường số 2, khu đô thị Vạn Phúc, Phường Hiệp Bình, TP Hồ
                    Chí Minh
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 flex-shrink-0 text-[#ffd700]"
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
                  <span>info@shopquatetvivu.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 flex-shrink-0 text-[#ffd700]"
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
                  <span className="font-bold text-[#ffd700]">0934 022 424</span>
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold text-[#c41e3a] mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#ffd700] rounded-full"></span>
              DANH MỤC SẢN PHẨM
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Giỏ quà Tết", href: "/danh-muc/gio-qua-tet" },
                { name: "Hộp quà Tết", href: "/danh-muc/hop-qua-tet" },
                { name: "Khay mứt Tết", href: "/danh-muc/khay-mut" },
                {
                  name: "Quà tết Doanh Nghiệp",
                  href: "/danh-muc/qua-tet-doanh-nghiep",
                },
                { name: "Quà tết Đối Tác", href: "/danh-muc/qua-tet-doi-tac" },
                { name: "Quà tết Sếp", href: "/danh-muc/qua-tet-sep" },
                { name: "Quà tết Bố Mẹ", href: "/danh-muc/qua-tet-bo-me" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-[#c41e3a] transition text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#daa520] rounded-full group-hover:bg-[#c41e3a] transition"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold text-[#c41e3a] mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#ffd700] rounded-full"></span>
              HỖ TRỢ KHÁCH HÀNG
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Hướng dẫn mua hàng", href: "/chinh-sach/huong-dan" },
                { name: "Chính sách đổi trả", href: "/chinh-sach/doi-tra" },
                {
                  name: "Giao hàng & thanh toán",
                  href: "/chinh-sach/giao-hang-thanh-toan",
                },
                { name: "Bảo mật thông tin", href: "/chinh-sach/bao-mat" },
                { name: "Liên hệ", href: "/lien-he" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-[#c41e3a] transition text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#daa520] rounded-full group-hover:bg-[#c41e3a] transition"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Payment */}
          <div>
            <h3 className="text-lg font-bold text-[#c41e3a] mb-5 flex items-center gap-2">
              <span className="w-1 h-5 bg-[#ffd700] rounded-full"></span>
              KẾT NỐI VỚI CHÚNG TÔI
            </h3>

            {/* Social Links */}
            <div className="flex gap-3 mb-6">
              <a
                href="https://facebook.com/shopquatetvivu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1877f2] text-white rounded-full flex items-center justify-center hover:opacity-80 transition shadow-md"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://zalo.me/0934022424"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#0068ff] text-white rounded-full flex items-center justify-center hover:opacity-80 transition shadow-md"
              >
                <span className="font-bold text-xs">Zalo</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#ff0000] text-white rounded-full flex items-center justify-center hover:opacity-80 transition shadow-md"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                  <polygon
                    fill="#fff"
                    points="9.545,15.568 15.818,12 9.545,8.432"
                  />
                </svg>
              </a>
            </div>

            {/* Payment Methods */}
            <h4 className="font-semibold text-gray-700 mb-3 text-sm">
              Phương thức thanh toán
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-600">
                💵 Tiền mặt
              </span>
              <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-600">
                🏦 Chuyển khoản
              </span>
              <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-600">
                💳 COD
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#e8d4b0] pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2026{" "}
            <span className="font-semibold text-[#c41e3a]">Shopquatet.com</span>{" "}
            - Chuyên Giỏ Quà Tết, Hộp Quà Tết Cao Cấp
          </p>
          <p className="text-gray-400 text-xs mt-2">
            🐴 Chúc mừng năm mới Bính Ngọ 2026 - An khang thịnh vượng 🐴
          </p>
        </div>
      </div>
    </footer>
  );
}

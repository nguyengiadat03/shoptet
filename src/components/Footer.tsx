import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Company Info - Red Box */}
          <div className="footer-company">
            <h3 className="text-lg font-bold mb-4">
              Công ty TNHH Sản Xuất Thương Mại VIVU
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
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
                  <strong>Văn phòng:</strong> 15 Đường số 2, khu đô thị Vạn Phúc,
                  Phường Hiệp Bình, TP Hồ Chí Minh
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 flex-shrink-0"
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
                <span>
                  <strong>Email:</strong> info@shopquatetvivu.com
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 flex-shrink-0"
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
                <span>
                  <strong>Điện thoại:</strong> 0934 022 424
                </span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">DANH MỤC</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/danh-muc/qua-tet-doanh-nghiep"
                  className="text-gray-600 hover:text-[#b71c1c] transition text-sm"
                >
                  Quà tết Doanh Nghiệp
                </Link>
              </li>
              <li>
                <Link
                  href="/danh-muc/qua-tet-doi-tac"
                  className="text-gray-600 hover:text-[#b71c1c] transition text-sm"
                >
                  Quà tết Đối Tác
                </Link>
              </li>
              <li>
                <Link
                  href="/danh-muc/qua-tet-sep"
                  className="text-gray-600 hover:text-[#b71c1c] transition text-sm"
                >
                  Quà tết Sếp
                </Link>
              </li>
              <li>
                <Link
                  href="/danh-muc/qua-tet-nhan-vien"
                  className="text-gray-600 hover:text-[#b71c1c] transition text-sm"
                >
                  Quà tết Nhân Viên
                </Link>
              </li>
              <li>
                <Link
                  href="/danh-muc/qua-tet-bo-me"
                  className="text-gray-600 hover:text-[#b71c1c] transition text-sm"
                >
                  Quà tết Bố Mẹ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-[#b71c1c] transition text-sm flex items-center gap-1"
                >
                  Set theo giá
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-[#b71c1c] transition text-sm flex items-center gap-1"
                >
                  Set theo loại
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  href="/danh-muc/khay-mut"
                  className="text-gray-600 hover:text-[#b71c1c] transition text-sm"
                >
                  Khay mứt
                </Link>
              </li>
              <li>
                <Link
                  href="/lien-he"
                  className="text-gray-600 hover:text-[#b71c1c] transition text-sm"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              DỊCH VỤ KHÁCH HÀNG
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/chinh-sach/bao-mat"
                  className="text-gray-600 hover:text-[#b71c1c] transition text-sm"
                >
                  Bảo mật thông tin khách hàng
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach/doi-tra"
                  className="text-gray-600 hover:text-[#b71c1c] transition text-sm"
                >
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach/giao-hang-thanh-toan"
                  className="text-gray-600 hover:text-[#b71c1c] transition text-sm"
                >
                  Giao hàng & thanh toán
                </Link>
              </li>
              <li>
                <Link
                  href="/lien-he"
                  className="text-gray-600 hover:text-[#b71c1c] transition text-sm"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#e8d4b0] pt-6 text-center">
          <p className="text-gray-600 text-sm">
            Copyright 2025 © Shop Quà Tết Việt
          </p>
        </div>
      </div>
    </footer>
  );
}

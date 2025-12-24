import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chính sách đổi trả",
  description: "Chính sách đổi trả sản phẩm - Shop Quà Tết Việt",
};

export default function ReturnPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="breadcrumb mb-6">
          <Link href="/">TRANG CHỦ</Link>
          <span>/</span>
          <span className="text-gray-800">CHÍNH SÁCH ĐỔI TRẢ</span>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-[#b71c1c] mb-6">
            CHÍNH SÁCH ĐỔI TRẢ SẢN PHẨM
          </h1>

          <div className="prose prose-sm max-w-none text-gray-700">
            <h2 className="text-lg font-bold text-[#b71c1c] mt-6 mb-3">
              1. Điều kiện đổi trả
            </h2>
            <p>
              Shop Quà Tết Việt chấp nhận đổi trả sản phẩm trong các trường hợp
              sau:
            </p>
            <ul>
              <li>Sản phẩm bị lỗi do nhà sản xuất</li>
              <li>Sản phẩm không đúng như mô tả</li>
              <li>Sản phẩm bị hư hỏng trong quá trình vận chuyển</li>
              <li>Giao nhầm sản phẩm</li>
            </ul>

            <h2 className="text-lg font-bold text-[#b71c1c] mt-6 mb-3">
              2. Thời gian đổi trả
            </h2>
            <ul>
              <li>Đổi trả trong vòng 7 ngày kể từ ngày nhận hàng</li>
              <li>
                Khách hàng cần thông báo ngay khi phát hiện vấn đề về sản phẩm
              </li>
            </ul>

            <h2 className="text-lg font-bold text-[#b71c1c] mt-6 mb-3">
              3. Quy trình đổi trả
            </h2>
            <ol>
              <li>Liên hệ hotline 0934 022 424 hoặc email để thông báo</li>
              <li>Cung cấp thông tin đơn hàng và lý do đổi trả</li>
              <li>Gửi ảnh/video sản phẩm lỗi (nếu có)</li>
              <li>Chờ xác nhận từ bộ phận chăm sóc khách hàng</li>
              <li>Gửi trả sản phẩm và nhận sản phẩm mới</li>
            </ol>

            <h2 className="text-lg font-bold text-[#b71c1c] mt-6 mb-3">
              4. Chi phí đổi trả
            </h2>
            <ul>
              <li>
                Lỗi từ Shop Quà Tết Việt: Miễn phí hoàn toàn chi phí đổi trả
              </li>
              <li>
                Khách hàng đổi ý: Khách hàng chịu chi phí vận chuyển 2 chiều
              </li>
            </ul>

            <h2 className="text-lg font-bold text-[#b71c1c] mt-6 mb-3">
              5. Sản phẩm không áp dụng đổi trả
            </h2>
            <ul>
              <li>Sản phẩm đã qua sử dụng</li>
              <li>Sản phẩm không còn nguyên tem, nhãn, bao bì</li>
              <li>Sản phẩm khuyến mãi, giảm giá đặc biệt</li>
            </ul>

            <h2 className="text-lg font-bold text-[#b71c1c] mt-6 mb-3">
              6. Liên hệ hỗ trợ
            </h2>
            <p>
              Mọi thắc mắc về chính sách đổi trả, vui lòng liên hệ:
            </p>
            <ul>
              <li>Hotline: 0934 022 424</li>
              <li>Email: info@shopquatetvivu.com</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

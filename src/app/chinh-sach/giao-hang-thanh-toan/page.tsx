import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Giao hàng & Thanh toán",
  description: "Chính sách giao hàng và thanh toán - Shop Quà Tết Việt",
};

export default function ShippingPaymentPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="breadcrumb mb-6">
          <Link href="/">TRANG CHỦ</Link>
          <span>/</span>
          <span className="text-gray-800">GIAO HÀNG & THANH TOÁN</span>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-[#b71c1c] mb-6">
            CHÍNH SÁCH GIAO HÀNG & THANH TOÁN
          </h1>

          <div className="prose prose-sm max-w-none text-gray-700">
            <h2 className="text-lg font-bold text-[#b71c1c] mt-6 mb-3">
              1. Phương thức giao hàng
            </h2>
            <p>
              Shop Quà Tết Việt giao hàng toàn quốc qua các đơn vị vận chuyển uy
              tín:
            </p>
            <ul>
              <li>Giao hàng nhanh (GHN)</li>
              <li>Giao hàng tiết kiệm (GHTK)</li>
              <li>Viettel Post</li>
              <li>Giao hàng riêng (nội thành TP.HCM)</li>
            </ul>

            <h2 className="text-lg font-bold text-[#b71c1c] mt-6 mb-3">
              2. Thời gian giao hàng
            </h2>
            <ul>
              <li>Nội thành TP.HCM: 1-2 ngày làm việc</li>
              <li>Ngoại thành TP.HCM: 2-3 ngày làm việc</li>
              <li>Các tỉnh thành khác: 3-5 ngày làm việc</li>
              <li>Vùng sâu vùng xa: 5-7 ngày làm việc</li>
            </ul>
            <p className="text-orange-600 font-medium">
              * Lưu ý: Thời gian giao hàng có thể kéo dài hơn trong dịp Tết
              Nguyên Đán do lượng đơn hàng tăng cao.
            </p>

            <h2 className="text-lg font-bold text-[#b71c1c] mt-6 mb-3">
              3. Phí vận chuyển
            </h2>
            <ul>
              <li>
                <strong>Miễn phí</strong> giao hàng cho đơn hàng từ 500.000đ
              </li>
              <li>Đơn hàng dưới 500.000đ: Tính phí theo cân nặng và khu vực</li>
              <li>Nội thành TP.HCM: 20.000đ - 30.000đ</li>
              <li>Các tỉnh thành khác: 30.000đ - 50.000đ</li>
            </ul>

            <h2 className="text-lg font-bold text-[#b71c1c] mt-6 mb-3">
              4. Phương thức thanh toán
            </h2>
            <h3 className="text-base font-semibold mt-4 mb-2">
              4.1. Thanh toán khi nhận hàng (COD)
            </h3>
            <p>
              Quý khách thanh toán trực tiếp cho nhân viên giao hàng khi nhận
              được sản phẩm. Đây là phương thức thanh toán phổ biến và tiện lợi
              nhất.
            </p>

            <h3 className="text-base font-semibold mt-4 mb-2">
              4.2. Chuyển khoản ngân hàng
            </h3>
            <p>Thông tin tài khoản:</p>
            <ul>
              <li>Ngân hàng: Vietcombank</li>
              <li>Số tài khoản: 1234567890</li>
              <li>Chủ tài khoản: CÔNG TY TNHH SẢN XUẤT THƯƠNG MẠI VIVU</li>
              <li>
                Nội dung: [Họ tên] - [Số điện thoại] - Thanh toán đơn hàng
              </li>
            </ul>

            <h2 className="text-lg font-bold text-[#b71c1c] mt-6 mb-3">
              5. Kiểm tra hàng khi nhận
            </h2>
            <p>
              Quý khách vui lòng kiểm tra kỹ sản phẩm trước khi thanh toán:
            </p>
            <ul>
              <li>Số lượng sản phẩm đúng với đơn hàng</li>
              <li>Sản phẩm còn nguyên vẹn, không bị hư hỏng</li>
              <li>Tem, nhãn mác đầy đủ</li>
            </ul>

            <h2 className="text-lg font-bold text-[#b71c1c] mt-6 mb-3">
              6. Liên hệ hỗ trợ
            </h2>
            <ul>
              <li>Hotline: 0934 022 424</li>
              <li>Email: info@shopquatetvivu.com</li>
              <li>Zalo: 0934 022 424</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description: "Chính sách bảo mật thông tin khách hàng - Shop Quà Tết Việt",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="breadcrumb mb-6">
          <Link href="/">TRANG CHỦ</Link>
          <span>/</span>
          <span className="text-gray-800">CHÍNH SÁCH BẢO MẬT</span>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-[#b71c1c] mb-6">
            CHÍNH SÁCH BẢO MẬT THÔNG TIN KHÁCH HÀNG
          </h1>

          <div className="prose prose-sm max-w-none text-gray-700">
            <h2 className="text-lg font-bold text-[#b71c1c] mt-6 mb-3">
              1. Mục đích thu thập thông tin
            </h2>
            <p>
              Shop Quà Tết Việt thu thập thông tin cá nhân của khách hàng nhằm
              mục đích:
            </p>
            <ul>
              <li>Xử lý đơn hàng và giao hàng đến địa chỉ của khách hàng</li>
              <li>Liên hệ xác nhận đơn hàng và hỗ trợ khách hàng</li>
              <li>Gửi thông tin về sản phẩm, chương trình khuyến mãi</li>
              <li>Cải thiện chất lượng dịch vụ và trải nghiệm mua sắm</li>
            </ul>

            <h2 className="text-lg font-bold text-[#b71c1c] mt-6 mb-3">
              2. Phạm vi thu thập thông tin
            </h2>
            <p>Chúng tôi có thể thu thập các thông tin sau:</p>
            <ul>
              <li>Họ và tên</li>
              <li>Địa chỉ email</li>
              <li>Số điện thoại</li>
              <li>Địa chỉ giao hàng</li>
              <li>Thông tin đơn hàng</li>
            </ul>

            <h2 className="text-lg font-bold text-[#b71c1c] mt-6 mb-3">
              3. Cam kết bảo mật
            </h2>
            <p>
              Shop Quà Tết Việt cam kết bảo mật tuyệt đối thông tin cá nhân của
              khách hàng. Chúng tôi không bán, chia sẻ hay trao đổi thông tin cá
              nhân của khách hàng cho bất kỳ bên thứ ba nào mà không có sự đồng
              ý của khách hàng.
            </p>

            <h2 className="text-lg font-bold text-[#b71c1c] mt-6 mb-3">
              4. Quyền của khách hàng
            </h2>
            <p>Khách hàng có quyền:</p>
            <ul>
              <li>Yêu cầu truy cập thông tin cá nhân của mình</li>
              <li>Yêu cầu chỉnh sửa thông tin không chính xác</li>
              <li>Yêu cầu xóa thông tin cá nhân</li>
              <li>Từ chối nhận email marketing</li>
            </ul>

            <h2 className="text-lg font-bold text-[#b71c1c] mt-6 mb-3">
              5. Liên hệ
            </h2>
            <p>
              Nếu có bất kỳ thắc mắc nào về chính sách bảo mật, vui lòng liên hệ
              với chúng tôi qua:
            </p>
            <ul>
              <li>Email: info@shopquatetvivu.com</li>
              <li>Hotline: 0934 022 424</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

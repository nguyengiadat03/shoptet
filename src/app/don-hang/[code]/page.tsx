import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getOrderByCode } from "@/lib/order-actions";
import { formatVND } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Đặt hàng thành công",
  description: "Cảm ơn bạn đã đặt hàng - Shop Quà Tết Việt",
};

interface PageProps {
  params: Promise<{ code: string }>;
}

export default async function OrderSuccessPage({ params }: PageProps) {
  const { code } = await params;
  const order = await getOrderByCode(code);

  if (!order) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
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

          <h1 className="text-2xl font-bold text-green-600 mb-2">
            Đặt hàng thành công!
          </h1>
          <p className="text-gray-600 mb-6">
            Cảm ơn bạn đã đặt hàng tại Shop Quà Tết Việt
          </p>

          {/* Order Info */}
          <div className="bg-gray-50 rounded-lg p-6 text-left mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Mã đơn hàng:</span>
                <p className="font-bold text-[#b71c1c]">{order.orderCode}</p>
              </div>
              <div>
                <span className="text-gray-500">Trạng thái:</span>
                <p className="font-medium text-orange-600">Chờ xác nhận</p>
              </div>
              <div>
                <span className="text-gray-500">Người nhận:</span>
                <p className="font-medium">{order.customerName}</p>
              </div>
              <div>
                <span className="text-gray-500">Điện thoại:</span>
                <p className="font-medium">{order.phone}</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">Địa chỉ:</span>
                <p className="font-medium">{order.address}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t pt-6 mb-6">
            <h2 className="text-lg font-semibold text-left mb-4">
              Chi tiết đơn hàng
            </h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm py-2 border-b"
                >
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-semibold">
                    {formatVND(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
              <span>Tổng cộng:</span>
              <span className="text-[#b71c1c]">{formatVND(order.total)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-left mb-6">
            <p className="font-semibold text-yellow-800 mb-1">
              Phương thức thanh toán: COD
            </p>
            <p className="text-yellow-700">
              Bạn sẽ thanh toán khi nhận hàng. Chúng tôi sẽ liên hệ xác nhận đơn
              hàng sớm nhất.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn btn-primary btn-shimmer">
              Tiếp tục mua sắm
            </Link>
            <Link
              href="/lien-he"
              className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Liên hệ hỗ trợ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

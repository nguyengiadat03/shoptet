import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getCart } from "@/lib/cart-actions";
import CheckoutForm from "@/components/CheckoutForm";
import { formatVND } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Thanh toán",
  description: "Thanh toán đơn hàng - Shop Quà Tết Việt",
};

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const cart = await getCart();
  if (cart.items.length === 0) redirect("/gio-hang");

  const subtotal = cart.items.reduce((acc, item) => {
    const price = item.product.salePrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  return (
    <div className="bg-gradient-to-b from-[#fff8e7] to-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="breadcrumb mb-6">
          <Link href="/">🏠 Trang chủ</Link>
          <span className="text-gray-300">/</span>
          <Link href="/gio-hang">Giỏ hàng</Link>
          <span className="text-gray-300">/</span>
          <span className="text-[#c41e3a] font-medium">Thanh toán</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-[#c41e3a] mb-6 flex items-center gap-3">
              <span className="w-1.5 h-7 bg-gradient-to-b from-[#ffd700] to-[#c41e3a] rounded-full"></span>
              📝 THÔNG TIN THANH TOÁN
            </h1>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-[#f2c18d]/30">
              <CheckoutForm />
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-[#f2c18d]/30 sticky top-28">
              <h2 className="text-lg font-bold text-[#c41e3a] mb-6 pb-4 border-b-2 border-[#c41e3a] flex items-center gap-2">
                <span>🛒</span> ĐƠN HÀNG CỦA BẠN
              </h2>

              {/* Header */}
              <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase pb-3 border-b">
                <span>Sản phẩm</span>
                <span>Tạm tính</span>
              </div>

              {/* Items */}
              <div className="py-4 border-b space-y-3 max-h-60 overflow-y-auto">
                {cart.items.map((item) => {
                  const price = item.product.salePrice || item.product.price;
                  const total = price * item.quantity;
                  return (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-700 flex-1 pr-4">
                        {item.product.name}{" "}
                        <span className="text-[#c41e3a] font-medium">
                          × {item.quantity}
                        </span>
                      </span>
                      <span className="text-[#c41e3a] font-semibold whitespace-nowrap">
                        {formatVND(total)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Subtotal */}
              <div className="flex justify-between py-4 border-b">
                <span className="text-gray-600">Tạm tính</span>
                <span className="font-semibold text-[#c41e3a]">
                  {formatVND(subtotal)}
                </span>
              </div>

              {/* Total */}
              <div className="flex justify-between py-4 border-b">
                <span className="font-bold text-lg">Tổng cộng</span>
                <span className="font-bold text-2xl text-[#c41e3a]">
                  {formatVND(subtotal)}
                </span>
              </div>

              {/* Payment Method */}
              <div className="py-4 bg-[#fff8e7] -mx-6 px-6 rounded-b-xl mt-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">💵</span>
                  <span className="font-semibold text-[#c41e3a]">
                    Thanh toán khi nhận hàng (COD)
                  </span>
                </div>
                <p className="text-sm text-gray-600 ml-9">
                  Trả tiền mặt khi nhận được hàng
                </p>
              </div>

              {/* Trust */}
              <div className="mt-6 pt-4 border-t border-dashed space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <span>🔒</span> Thông tin được bảo mật 100%
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span> Kiểm tra hàng trước khi thanh toán
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

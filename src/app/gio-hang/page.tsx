import { Metadata } from "next";
import Link from "next/link";
import { getCart } from "@/lib/cart-actions";
import CartTable from "@/components/CartTable";
import { formatVND } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Giỏ hàng",
  description: "Giỏ hàng của bạn - Shop Quà Tết Việt",
};

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const cart = await getCart();
  const subtotal = cart.items.reduce((acc, item) => {
    const price = item.product.salePrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);
  const isEmpty = cart.items.length === 0;

  return (
    <div className="bg-gradient-to-b from-[#fff8e7] to-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="breadcrumb mb-6">
          <Link href="/">🏠 Trang chủ</Link>
          <span className="text-gray-300">/</span>
          <span className="text-[#c41e3a] font-medium">Giỏ hàng</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-[#c41e3a] mb-8 flex items-center gap-3">
          <span className="w-1.5 h-8 bg-gradient-to-b from-[#ffd700] to-[#c41e3a] rounded-full"></span>
          🛒 GIỎ HÀNG CỦA BẠN
        </h1>

        {isEmpty ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-md border border-[#f2c18d]/30">
            <div className="w-28 h-28 mx-auto mb-6 bg-[#fff8e7] rounded-full flex items-center justify-center">
              <span className="text-5xl">🛒</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Giỏ hàng trống
            </h2>
            <p className="text-gray-500 mb-6">
              Chưa có sản phẩm nào trong giỏ hàng của bạn.
            </p>
            <Link href="/" className="btn btn-primary btn-shimmer">
              🎁 Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-[#f2c18d]/30">
                <CartTable items={cart.items} />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-[#f2c18d]/30 sticky top-28">
                <h2 className="text-lg font-bold text-[#c41e3a] mb-6 pb-4 border-b-2 border-[#c41e3a] flex items-center gap-2">
                  <span>📋</span> TỔNG CỘNG GIỎ HÀNG
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="font-semibold">{formatVND(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="text-gray-500 italic">
                      Tính khi thanh toán
                    </span>
                  </div>
                </div>

                <div className="border-t border-dashed pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Tổng cộng</span>
                    <span className="font-bold text-2xl text-[#c41e3a]">
                      {formatVND(subtotal)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/thanh-toan"
                  className="btn btn-primary btn-shimmer w-full py-4 text-base mb-4"
                >
                  ✅ TIẾN HÀNH THANH TOÁN
                </Link>

                <Link
                  href="/"
                  className="block text-center text-sm text-gray-500 hover:text-[#c41e3a] transition"
                >
                  ← Tiếp tục mua sắm
                </Link>

                {/* Trust badges */}
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>🔒</span> Thanh toán an toàn & bảo mật
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🚚</span> Giao hàng toàn quốc
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🔄</span> Đổi trả trong 7 ngày
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

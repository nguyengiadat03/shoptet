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
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-[#b71c1c] mb-8">GIỎ HÀNG</h1>

        {isEmpty ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Giỏ hàng trống
            </h2>
            <p className="text-gray-500 mb-6">
              Chưa có sản phẩm nào trong giỏ hàng của bạn.
            </p>
            <Link href="/" className="btn btn-primary btn-shimmer">
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <CartTable items={cart.items} />
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="order-summary sticky top-24">
                <h2 className="order-summary-title">TỔNG CỘNG GIỎ HÀNG</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="font-semibold">{formatVND(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="text-gray-500">Tính khi thanh toán</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">Tổng</span>
                    <span className="font-bold text-lg text-[#b71c1c]">
                      {formatVND(subtotal)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/thanh-toan"
                  className="btn btn-primary btn-shimmer w-full"
                >
                  TIẾN HÀNH THANH TOÁN
                </Link>

                <Link
                  href="/"
                  className="block text-center text-sm text-gray-600 mt-4 hover:text-[#b71c1c]"
                >
                  ← Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

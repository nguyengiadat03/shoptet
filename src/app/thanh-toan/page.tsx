import { Metadata } from "next";
import { redirect } from "next/navigation";
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

  if (cart.items.length === 0) {
    redirect("/gio-hang");
  }

  const subtotal = cart.items.reduce((acc, item) => {
    const price = item.product.salePrice || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            <h1 className="text-xl font-bold text-[#b71c1c] mb-6">
              THÔNG TIN THANH TOÁN
            </h1>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <CheckoutForm />
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="order-summary sticky top-24">
              <h2 className="order-summary-title">ĐƠN HÀNG CỦA BẠN</h2>

              {/* Header */}
              <div className="flex justify-between text-sm font-semibold text-gray-600 pb-3 border-b">
                <span>SẢN PHẨM</span>
                <span>TẠM TÍNH</span>
              </div>

              {/* Items */}
              <div className="py-4 border-b space-y-3">
                {cart.items.map((item) => {
                  const price = item.product.salePrice || item.product.price;
                  const total = price * item.quantity;
                  return (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="text-[#b71c1c] font-semibold">
                        {formatVND(total)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Subtotal */}
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Tạm tính</span>
                <span className="font-semibold text-[#b71c1c]">
                  {formatVND(subtotal)}
                </span>
              </div>

              {/* Total */}
              <div className="flex justify-between py-4 border-b">
                <span className="font-bold text-lg">Tổng</span>
                <span className="font-bold text-lg text-[#b71c1c]">
                  {formatVND(subtotal)}
                </span>
              </div>

              {/* Payment Method */}
              <div className="py-4">
                <p className="font-semibold text-[#b71c1c] mb-2">
                  Trả tiền mặt khi nhận hàng
                </p>
                <p className="text-sm text-gray-600">
                  Trả tiền mặt khi giao hàng
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

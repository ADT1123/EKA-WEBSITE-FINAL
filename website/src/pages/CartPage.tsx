// pages/CartPage.tsx
import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import Navbar from "../components/Navigation";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    appliedCoupon,
    setAppliedCoupon,
    discount,
    setDiscount,
  } = useCart();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponLabel, setCouponLabel] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const subtotalRaw = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const subtotal = subtotalRaw - discount;

  const handleGoHome = () => navigate("/shop");
  const handleCheckout = () => navigate("/checkout");

  const handleDecrease = (id: string, currentQty: number) => {
    if (currentQty <= 1) return;
    updateQuantity(id, currentQty - 1);
  };

  const handleIncrease = (id: string, currentQty: number) => {
    updateQuantity(id, currentQty + 1);
  };

  const handleApplyCoupon = async () => {
    const trimmed = couponCode.trim().toUpperCase();

    if (!trimmed) {
      setCouponError("Please enter a code.");
      setAppliedCoupon(null);
      setDiscount(0);
      return;
    }

    setLoading(true);
    setCouponError(null);

    try {
      const res = await fetch(`${API_BASE}/api/coupons/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trimmed, subtotal: subtotalRaw }),
      });

      const data = await res.json();

      if (data.valid) {
        setAppliedCoupon(data.coupon.code);
        setDiscount(data.coupon.discount);
        setCouponLabel(data.coupon.label);
        setCouponError(null);
      } else {
        setCouponError(data.message || "Invalid coupon");
        setAppliedCoupon(null);
        setDiscount(0);
      }
    } catch (error) {
      console.error("Coupon validation error:", error);
      setCouponError("Failed to validate coupon. Please try again.");
      setAppliedCoupon(null);
      setDiscount(0);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError(null);
    setCouponLabel("");
    setDiscount(0);
  };

  return (
    <div className="min-h-screen bg-[#fdf9ff] text-slate-900 relative overflow-hidden">
      {/* soft background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#ffecc4]/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-200/25 blur-3xl" />
      </div>

      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pt-24 pb-16">
        {/* header */}
        <div className="mb-12 flex items-center justify-between gap-3">
          <div className="pt-2">
            <span className="text-lg md:text-xl font-bold text-slate-900 block">
              YOUR CART
            </span>
          </div>
          {cart.length > 0 && (
            <span className="text-xs md:text-sm text-slate-600 rounded-full border border-[#ffd27a]/70 bg-white/80 px-3 py-1">
              {totalItems} gift{totalItems > 1 ? "s" : ""} in cart
            </span>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="rounded-2xl border border-purple-100 bg-white/90 p-6 md:p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <p className="text-sm md:text-base text-slate-600 mb-4">
              Your cart is empty for now.
            </p>
            <button
              type="button"
              onClick={handleGoHome}
              className="px-4 py-2 rounded-full text-xs md:text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-[2fr_minmax(0,1fr)]">
            {/* left: list with product images */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-2xl border border-[#ffd27a]/40 bg-white/95 shadow-[0_16px_45px_rgba(15,23,42,0.08)] flex items-start gap-4 p-4 md:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(15,23,42,0.16)]"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-[#ffd27a]/60 transition-all duration-300" />

                  {/* Product Image */}
                  <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="relative flex-1 pr-2">
                    <h2 className="text-sm md:text-base font-semibold text-slate-900">
                      {item.name}
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 mt-1 line-clamp-2">
                      {item.description ||
                        "A curated EKA gift experience with a mix of signature items for this occasion."}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-600">
                        <span className="mr-2 uppercase tracking-[0.18em] text-slate-400">
                          Qty
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDecrease(item.id, item.quantity)}
                          className="w-6 h-6 flex items-center justify-center rounded-full border border-slate-200 text-xs text-slate-700 hover:border-[#b98a46] hover:text-[#6b4e31] transition-colors disabled:opacity-40"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="mx-2 text-xs font-semibold text-slate-900 min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleIncrease(item.id, item.quantity)}
                          className="w-6 h-6 flex items-center justify-center rounded-full border border-slate-200 text-xs text-slate-700 hover:border-[#b98a46] hover:text-[#6b4e31] transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[11px] font-medium text-pink-600 hover:text-pink-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="mt-2 text-xs md:text-sm text-slate-500">
                      Product cost: <span className="font-medium">₹{item.price}</span>
                    </p>
                  </div>

                  <div className="text-right min-w-[90px] flex-shrink-0">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-1">
                      Total
                    </p>
                    <p className="text-sm md:text-base font-semibold text-slate-900">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* right: summary */}
            <aside className="rounded-2xl border border-purple-100 bg-white/95 shadow-[0_16px_45px_rgba(15,23,42,0.08)] p-5 md:p-6 flex flex-col gap-4">
              <div>
                <h2 className="text-sm md:text-base font-semibold text-slate-900 mb-1">
                  Order summary
                </h2>
                <p className="text-xs md:text-sm text-slate-500">
                  Live estimate for your selected product.
                </p>
              </div>

              {/* coupon row */}
              <div className="border border-slate-100 rounded-xl px-3 py-2.5 bg-slate-50/70">
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    disabled={loading}
                    className="flex-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs md:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#ffd27a] focus:border-[#ffd27a] disabled:opacity-50"
                  />
                  {appliedCoupon ? (
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="px-3 py-1.5 rounded-full text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      Clear
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={loading}
                      className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                      {loading && (
                        <span className="inline-block h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      )}
                      Apply
                    </button>
                  )}
                </div>
                {appliedCoupon && discount > 0 && (
                  <p className="mt-1.5 text-[11px] text-emerald-600">
                    {couponLabel}. You save ₹{discount}.
                  </p>
                )}
                {couponError && (
                  <p className="mt-1.5 text-[11px] text-pink-600">{couponError}</p>
                )}
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Quantity</span>
                  <span className="text-slate-700">{totalItems}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Items subtotal</span>
                  <span className="font-medium text-slate-900">₹{subtotalRaw}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Coupon savings</span>
                    <span className="text-emerald-600 font-medium">−₹{discount}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Shipping</span>
                  <span className="text-xs text-slate-500">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Total
                </span>
                <span className="text-base md:text-lg font-semibold text-slate-900">
                  ₹{subtotal}
                </span>
              </div>

              <div className="mt-2 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full px-4 py-2.5 rounded-full text-xs md:text-sm font-medium bg-[#4b2c5e] text-white shadow-[0_12px_30px_rgba(75,44,94,0.5)] hover:bg-[#5b3772] transition-colors"
                >
                  Go to checkout
                </button>
                <button
                  type="button"
                  onClick={handleGoHome}
                  className="w-full px-4 py-2.5 rounded-full text-xs md:text-sm font-medium border border-slate-300 text-slate-800 bg-white hover:border-purple-400 hover:text-purple-700 transition-colors"
                >
                  Continue browsing
                </button>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;

// pages/CartPage.tsx
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import Navbar from "../components/Navigation";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const handleGoHome = () => navigate("/shop");
  const handleCheckout = () => navigate("/checkout");

  const handleDecrease = (id: string, currentQty: number) => {
    updateQuantity(id, currentQty - 1);
  };

  const handleIncrease = (id: string, currentQty: number) => {
    updateQuantity(id, currentQty + 1);
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
        <div className="mb-8 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-purple-500 mb-2">
              Your cart
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900">
              Gifts ready to check out
            </h1>
            <p className="mt-2 text-sm md:text-base text-slate-600 max-w-2xl">
              Adjust quantities, remove boxes, and then continue to checkout to share
              delivery details and customisation notes.
            </p>
          </div>
          {cart.length > 0 && (
            <span className="text-xs md:text-sm text-slate-600">
              {totalItems} box{totalItems > 1 ? "es" : ""} in cart
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
              Continue browsing boxes
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-[2fr_minmax(0,1fr)]">
            {/* left: list */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="relative rounded-2xl border border-[#ffd27a]/40 bg-white/95 shadow-[0_16px_45px_rgba(15,23,42,0.08)] flex items-start justify-between gap-4 p-4 md:p-5"
                >
                  {/* gold edge ring */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-[#ffd27a]/60 transition-all duration-300" />

                  <div className="relative flex-1 pr-2">
                    <h2 className="text-sm md:text-base font-semibold text-slate-900">
                      {item.name}
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 mt-1 line-clamp-2">
                      {item.description ||
                        "A curated EKA gift box with a mix of signature items for this occasion."}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-600">
                        <span className="mr-2 uppercase tracking-[0.18em] text-slate-400">
                          Qty
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDecrease(item.id, item.quantity)}
                          className="w-6 h-6 flex items-center justify-center rounded-full border border-slate-200 text-xs text-slate-700 hover:border-[#b98a46] hover:text-[#6b4e31] transition-colors"
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
                        className="text-[11px] font-medium text-pink-600 hover:text-pink-700"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="mt-2 text-xs md:text-sm text-slate-500">
                      Approx. price per box:{" "}
                      <span className="font-medium">₹{item.price}</span>
                    </p>
                  </div>

                  <div className="text-right min-w-[90px]">
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
                  Live estimate based on your current selection. Final details and
                  shipping are confirmed at checkout.
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Items</span>
                  <span className="text-slate-700">
                    {totalItems} box{totalItems > 1 ? "es" : ""}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium text-slate-900">₹{subtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Shipping</span>
                  <span className="text-slate-500 text-xs">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Estimated total
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

import { useState, useMemo } from "react";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

const CheckoutPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  });

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid = () => {
    return (
      form.name.trim() !== "" &&
      form.email.trim() !== "" &&
      form.phone.trim() !== "" &&
      form.line1.trim() !== "" &&
      form.city.trim() !== "" &&
      form.state.trim() !== "" &&
      form.pincode.trim() !== "" &&
      cart.length > 0
    );
  };

  const handlePlaceOrder = async () => {
    if (!isFormValid()) {
      setMessage("Please fill all required details before placing the order.");
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      const items = cart.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const payload = {
        items,
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
        },
        shippingAddress: {
          line1: form.line1,
          line2: form.line2,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          country: "India",
        },
        notes: form.notes,
      };

      const { makeApiUrl, API_ENDPOINTS } = await import("../lib/api");
      const apiUrl = makeApiUrl(API_ENDPOINTS.ORDERS);
      
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Could not place the order. Please try again.");
      } else {
        setMessage("Order placed successfully. Your order ID is " + data.orderId);
        // yahan baad me: cart clear + thank-you page pe navigate kara sakta hai
      }
    } catch (err) {
      setMessage("Something went wrong while placing the order.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToCart = () => {
    navigate("/cart");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const inputClass =
    "border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:border-[#b98a46] focus:ring-1 focus:ring-[#ffd27a]";

  const textareaClass =
    "border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 bg-white focus:outline-none focus:border-[#b98a46] focus:ring-1 focus:ring-[#ffd27a] w-full min-h-[90px]";

  return (
    <div className="min-h-screen bg-[#fdf9ff] text-slate-900">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-28 pb-16">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-purple-500">
              Secure checkout
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900 mt-1">
              Confirm your EKA order
            </h1>
            <p className="text-sm md:text-base text-slate-600 mt-2">
              Fill in delivery details and review your gift boxes before placing the order.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleBackToCart}
              className="px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium border border-slate-300 text-slate-800 bg-white hover:border-[#b98a46] hover:text-[#6b4e31] transition-colors"
            >
              ← Back to cart
            </button>
            <button
              type="button"
              onClick={handleBackToHome}
              className="px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium border border-pink-200 text-pink-700 bg-white hover:bg-pink-50 transition-colors"
            >
              Home
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-6 rounded-2xl border border-[#ffd27a]/60 bg-[#fff8e1] px-4 py-3 text-sm text-[#6b4e31] font-medium">
            {message}
          </div>
        )}

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1.4fr,1fr]">
          {/* LEFT: info */}
          <section className="rounded-3xl border border-purple-100 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.06)] px-5 py-6 md:px-7 md:py-8">
            <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-4">
              Delivery details
            </h2>

            <div className="space-y-7">
              {/* Contact info */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 mb-3">
                  Contact information
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-slate-800">
                      Full name <span className="text-pink-600">*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Recipient name"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-slate-800">
                      Phone <span className="text-pink-600">*</span>
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="+91 ..."
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-[11px] font-semibold text-slate-800">
                      Email <span className="text-pink-600">*</span>
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="For order updates"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 mb-3">
                  Shipping address
                </p>
                <div className="grid gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-slate-800">
                      Address line 1 <span className="text-pink-600">*</span>
                    </label>
                    <input
                      name="line1"
                      value={form.line1}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="House / flat / building"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-slate-800">
                      Address line 2
                    </label>
                    <input
                      name="line2"
                      value={form.line2}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Landmark / area (optional)"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-slate-800">
                        City <span className="text-pink-600">*</span>
                      </label>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-slate-800">
                        State <span className="text-pink-600">*</span>
                      </label>
                      <input
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-slate-800">
                        Pincode <span className="text-pink-600">*</span>
                      </label>
                      <input
                        name="pincode"
                        value={form.pincode}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-slate-800">
                        Country
                      </label>
                      <input
                        value="India"
                        disabled
                        className="border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600 bg-slate-50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 mb-3">
                  Customisation & notes
                </p>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  className={textareaClass}
                  placeholder="Share any notes, names to include, or timing preferences."
                />
              </div>
            </div>
          </section>

          {/* RIGHT: summary */}
          <aside className="rounded-3xl border border-purple-100 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.06)] px-5 py-6 md:px-7 md:py-8 flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Order summary
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <p className="text-sm text-slate-500">
                  Your cart is empty. Add a box to continue.
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3 border-b border-slate-100 pb-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-medium text-slate-900">₹{subtotal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Shipping</span>
                <span className="text-xs text-slate-500">
                  Calculated after confirmation
                </span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Estimated order value
              </span>
              <span className="text-lg md:text-xl font-semibold text-slate-900">
                ₹{subtotal}
              </span>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={loading || !isFormValid()}
              className="mt-2 w-full px-4 py-2.5 rounded-full text-xs md:text-sm font-medium bg-[#4b2c5e] text-white shadow-[0_12px_30px_rgba(75,44,94,0.5)] hover:bg-[#5b3772] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Placing order..." : "Place order"}
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;

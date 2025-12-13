// pages/CheckoutPage.tsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

// Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Backend base URL from env
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// Indian states list
const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, clearCart, discount, appliedCoupon } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [stateQuery, setStateQuery] = useState("");
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [mounted, setMounted] = useState(false);

  const stateDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        stateDropdownRef.current &&
        !stateDropdownRef.current.contains(e.target as Node)
      ) {
        setShowStateDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const subtotalRaw = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const totalAmount = Math.max(subtotalRaw - (discount || 0), 0);

  // Filter states based on query
  const filteredStates = useMemo(() => {
    if (!stateQuery.trim()) return INDIAN_STATES;
    return INDIAN_STATES.filter((state) =>
      state.toLowerCase().includes(stateQuery.toLowerCase())
    );
  }, [stateQuery]);

  // basic validation
  const validate = () => {
    const e: { [key: string]: string } = {};

    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = "Enter a valid email";

    if (!phone.trim()) e.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(phone.trim()))
      e.phone = "Enter 10-digit phone number";

    if (!addressLine.trim()) e.addressLine = "Address is required";
    if (!city.trim()) e.city = "City is required";
    if (!stateValue.trim()) e.stateValue = "State is required";
    if (!pin.trim()) e.pin = "PIN code is required";
    else if (!/^[0-9]{6}$/.test(pin.trim()))
      e.pin = "Enter 6-digit PIN code";

    if (cart.length === 0) e.cart = "Your cart is empty";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (document.querySelector("#razorpay-sdk")) return resolve(true);
      const script = document.createElement("script");
      script.id = "razorpay-sdk";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Razorpay SDK failed to load. Please check your connection.");
        setLoading(false);
        return;
      }

      const fullAddress = `${addressLine.trim()}, ${city.trim()}, ${stateValue.trim()} - ${pin.trim()}`;

      // Create order via backend
      const orderResponse = await fetch(
        `${API_BASE}/api/payments/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: totalAmount,
            customerName: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            address: fullAddress,
            items: cart,
            discount,
            couponCode: appliedCoupon || null,
            subtotal: subtotalRaw,
          }),
        }
      );

      if (!orderResponse.ok) {
        throw new Error(`HTTP ${orderResponse.status}: ${orderResponse.statusText}`);
      }

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        alert("Failed to create order: " + (orderData.message || "Unknown error"));
        setLoading(false);
        return;
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "EKA Gifts",
        description: "Customized Gift Box",
        image: "/img/EKAlogo.png",
        order_id: orderData.orderId,
        prefill: {
          name: name.trim(),
          email: email.trim(),
          contact: phone.trim(),
        },
        notes: {
          address: fullAddress,
          couponCode: appliedCoupon || "",
        },
        theme: { color: "#ffd27a" },
        handler: async (response: RazorpayResponse) => {
          try {
            const verifyResponse = await fetch(
              `${API_BASE}/api/payments/verify`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  customerOrderId: orderData.customerOrderId,
                }),
              }
            );

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              clearCart();
              navigate(
                `/order-success?payment_id=${response.razorpay_payment_id}&order_id=${orderData.customerOrderId}`
              );
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Payment verification failed. Please contact support.");
          }
          setLoading(false);
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please check your connection and try again.");
      setLoading(false);
    }
  };

  const handleStateSelect = (state: string) => {
    setStateValue(state);
    setStateQuery(state);
    setShowStateDropdown(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120818] via-[#1c1030] to-[#06030a] pt-24 pb-16 relative overflow-hidden">
      {/* background glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-80 h-80 bg-[#ffd27a]/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-52 -right-36 w-96 h-96 bg-[#ff9f7a]/10 rounded-full blur-3xl" />

      <div
        className={`max-w-5xl mx-auto px-6 transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* back button */}
        <button
          onClick={() => navigate("/cart")}
          className="mb-6 flex items-center gap-2 text-sm text-[#ffd27a] hover:text-[#ffe6a8] transition-colors group"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          <span>Back to Cart</span>
        </button>

        <h1 className="text-4xl md:text-5xl font-semibold text-white mb-3">
          Checkout
        </h1>
        <p className="text-gray-300 mb-8">
          One last step before we start crafting your EKA gift.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* left: form */}
          <div className="bg-[#120818]/70 rounded-2xl p-6 md:p-7 border border-white/10 backdrop-blur-xl shadow-[0_0_35px_rgba(0,0,0,0.7)]">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Shipping details
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">
                  Full name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#ffd27a] transition-colors ${
                    errors.name ? "border-red-500/70" : "border-white/20"
                  }`}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#ffd27a] transition-colors ${
                    errors.email ? "border-red-500/70" : "border-white/20"
                  }`}
                  placeholder="Enter a valid email"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1.5">
                  Phone number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    const onlyDigits = e.target.value.replace(/\D/g, "");
                    setPhone(onlyDigits);
                  }}
                  maxLength={10}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#ffd27a] transition-colors ${
                    errors.phone ? "border-red-500/70" : "border-white/20"
                  }`}
                  placeholder="Contact Number"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                )}
              </div>

              {/* Address line */}
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">
                  Address line *
                </label>
                <textarea
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#ffd27a] transition-colors h-20 resize-none ${
                    errors.addressLine ? "border-red-500/70" : "border-white/20"
                  }`}
                  placeholder="House no, street, landmark"
                />
                {errors.addressLine && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.addressLine}
                  </p>
                )}
              </div>

              {/* city / state / pin */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-300 mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`w-full bg-white/5 border rounded-lg px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#ffd27a] transition-colors ${
                      errors.city ? "border-red-500/70" : "border-white/20"
                    }`}
                    placeholder="City"
                  />
                  {errors.city && (
                    <p className="mt-1 text-[10px] text-red-400">
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* Searchable State Dropdown */}
                <div className="relative" ref={stateDropdownRef}>
                  <label className="block text-xs text-gray-300 mb-1.5">
                    State *
                  </label>
                  <input
                    type="text"
                    value={stateQuery}
                    onChange={(e) => {
                      setStateQuery(e.target.value);
                      setShowStateDropdown(true);
                    }}
                    onFocus={() => setShowStateDropdown(true)}
                    className={`w-full bg-white/5 border rounded-lg px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#ffd27a] transition-colors ${
                      errors.stateValue
                        ? "border-red-500/70"
                        : "border-white/20"
                    }`}
                    placeholder="Select State"
                  />
                  {errors.stateValue && (
                    <p className="mt-1 text-[10px] text-red-400">
                      {errors.stateValue}
                    </p>
                  )}

                  {/* Dropdown menu */}
                  {showStateDropdown && (
                    <div className="absolute z-50 w-64 mt-1 bg-[#1c1030]/95 border border-[#ffd27a]/30 rounded-lg shadow-[0_8px_30px_rgba(255,210,122,0.3)] backdrop-blur-xl max-h-48 overflow-y-auto custom-scroll">
                      {filteredStates.length > 0 ? (
                        filteredStates.map((state, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleStateSelect(state)}
                            className="w-full text-left px-3 py-2 text-xs text-gray-200 hover:bg-[#ffd27a]/20 hover:text-[#ffd27a] transition-colors first:rounded-t-lg last:rounded-b-lg"
                          >
                            {state}
                          </button>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-xs text-gray-400 italic">
                          No states found
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-gray-300 mb-1.5">
                    PINCODE *
                  </label>
                  <input
                    type="tel"
                    value={pin}
                    onChange={(e) => {
                      const onlyDigits = e.target.value.replace(/\D/g, "");
                      setPin(onlyDigits);
                    }}
                    maxLength={6}
                    className={`w-full bg-white/5 border rounded-lg px-3 py-2.5 text-white text-xs focus:outline-none focus:border-[#ffd27a] transition-colors ${
                      errors.pin ? "border-red-500/70" : "border-white/20"
                    }`}
                    placeholder="6-digit"
                  />
                  {errors.pin && (
                    <p className="mt-1 text-[10px] text-red-400">
                      {errors.pin}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-gray-400 pt-1">
                By placing the order you agree to our{" "}
                <a
                  href="/shipping-policy"
                  className="text-[#ffd27a] underline cursor-pointer"
                >
                  Shipping Policy
                </a>
                .
              </p>
            </div>
          </div>

          {/* right: order summary */}
          <div className="bg-[#120818]/70 rounded-2xl p-6 md:p-7 border border-white/10 backdrop-blur-xl shadow-[0_0_35px_rgba(0,0,0,0.7)] md:translate-y-2">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Order summary
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 custom-scroll">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm text-gray-200"
                >
                  <div>
                    <p>{item.name}</p>
                    <p className="text-xs text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
              {cart.length === 0 && (
                <p className="text-sm text-gray-400 italic">
                  Your cart is empty.
                </p>
              )}
            </div>

            <div className="border-t border-white/15 mt-5 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>₹{subtotalRaw}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-gray-300">
                  <span>
                    Coupon savings {appliedCoupon && `(${appliedCoupon})`}
                  </span>
                  <span className="text-[#8cffc1]">−₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span className="text-[#8cffc1]">Free</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-white pt-2">
                <span>Total</span>
                <span className="text-[#ffd27a]">₹{totalAmount}</span>
              </div>
            </div>

            {errors.cart && (
              <p className="mt-3 text-xs text-red-400">{errors.cart}</p>
            )}

            {/* Pay button with shine animation */}
            <button
              onClick={handlePayment}
              disabled={loading || cart.length === 0}
              className="mt-6 w-full relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ffd27a] to-[#ffb347] px-8 py-3.5 font-semibold text-[#1c0f2b] text-sm shadow-[0_0_25px_rgba(255,210,122,0.65)] hover:shadow-[0_0_40px_rgba(255,210,122,0.95)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer blur-sm" />
              <span className="relative flex items-center gap-2 z-10">
                {loading && (
                  <span className="h-4 w-4 border-2 border-[#1c0f2b]/30 border-t-[#1c0f2b] rounded-full animate-spin" />
                )}
                {loading ? "Processing…" : `Pay ₹${totalAmount}`}
              </span>
            </button>

            <p className="text-[11px] text-gray-400 mt-3 text-center">
              Secure payment powered by Razorpay
            </p>
          </div>
        </div>

        {/* custom scrollbar + animations */}
        <style>
          {`
            .custom-scroll::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scroll::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scroll::-webkit-scrollbar-thumb {
              background: rgba(255,210,122,0.3);
              border-radius: 999px;
            }
            .custom-scroll::-webkit-scrollbar-thumb:hover {
              background: rgba(255,210,122,0.5);
            }
            @keyframes shimmer {
              0% { transform: translateX(-100%) rotate(45deg); }
              100% { transform: translateX(200%) rotate(45deg); }
            }
            .animate-shimmer {
              animation: shimmer 2s ease-in-out infinite;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default CheckoutPage;

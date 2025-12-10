// pages/CheckoutPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';

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

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // basic validation
  const validate = () => {
    const e: { [key: string]: string } = {};

    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = 'Enter a valid email';

    if (!phone.trim()) e.phone = 'Phone is required';
    else if (!/^[0-9]{10}$/.test(phone.trim())) e.phone = 'Enter 10-digit phone number';

    if (!address.trim()) e.address = 'Address is required';
    else if (address.trim().length < 10) e.address = 'Add a little more detail in address';

    if (cart.length === 0) e.cart = 'Your cart is empty';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (document.querySelector('#razorpay-sdk')) return resolve(true);
      const script = document.createElement('script');
      script.id = 'razorpay-sdk';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
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
        alert('Razorpay SDK failed to load. Please check your connection.');
        setLoading(false);
        return;
      }

      const orderResponse = await fetch('http://localhost:5000/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          customerName: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          address: address.trim(),
          items: cart,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        alert('Failed to create order: ' + orderData.message);
        setLoading(false);
        return;
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'EKA Gifts',
        description: 'Customized Gift Box',
        image: 'https://ekagifts.com/logo.png',
        order_id: orderData.orderId,
        prefill: {
          name: name.trim(),
          email: email.trim(),
          contact: phone.trim(),
        },
        notes: { address: address.trim() },
        theme: { color: '#ffd27a' },
        handler: async (response: RazorpayResponse) => {
          const verifyResponse = await fetch('http://localhost:5000/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customerOrderId: orderData.customerOrderId,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            clearCart();
            navigate(
              `/order-success?payment_id=${response.razorpay_payment_id}&order_id=${orderData.customerOrderId}`,
            );
          } else {
            alert('Payment verification failed. Please contact support.');
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
      console.error('Payment error:', err);
      alert('Payment failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120818] via-[#1c1030] to-[#06030a] pt-24 pb-16 relative overflow-hidden">
      {/* background glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-80 h-80 bg-[#ffd27a]/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-52 -right-36 w-96 h-96 bg-[#ff9f7a]/10 rounded-full blur-3xl" />

      <div
        className={`max-w-5xl mx-auto px-6 transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-semibold text-white mb-3">Checkout</h1>
        <p className="text-gray-300 mb-8">
          One last step before we start crafting your EKA gift.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* left: form */}
          <div className="bg-[#120818]/70 rounded-2xl p-6 md:p-7 border border-white/10 backdrop-blur-xl shadow-[0_0_35px_rgba(0,0,0,0.7)]">
            <h2 className="text-2xl font-semibold text-white mb-6">Shipping details</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Full name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#ffd27a] transition-colors ${
                    errors.name ? 'border-red-500/70' : 'border-white/20'
                  }`}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#ffd27a] transition-colors ${
                    errors.email ? 'border-red-500/70' : 'border-white/20'
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Phone number *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    const onlyDigits = e.target.value.replace(/\D/g, '');
                    setPhone(onlyDigits);
                  }}
                  maxLength={10}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#ffd27a] transition-colors ${
                    errors.phone ? 'border-red-500/70' : 'border-white/20'
                  }`}
                  placeholder="10-digit number"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1.5">
                  Delivery address *
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#ffd27a] transition-colors h-28 resize-none ${
                    errors.address ? 'border-red-500/70' : 'border-white/20'
                  }`}
                  placeholder="House no, street, landmark, city, state, PIN"
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-red-400">{errors.address}</p>
                )}
              </div>

              <p className="text-[11px] text-gray-400 pt-1">
                By placing the order you agree to our{' '}
                <span className="text-[#ffd27a] underline">Terms & Conditions</span>.
              </p>
            </div>
          </div>

          {/* right: order summary */}
          <div className="bg-[#120818]/70 rounded-2xl p-6 md:p-7 border border-white/10 backdrop-blur-xl shadow-[0_0_35px_rgba(0,0,0,0.7)] md:translate-y-2">
            <h2 className="text-2xl font-semibold text-white mb-6">Order summary</h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 custom-scroll">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm text-gray-200"
                >
                  <div>
                    <p>{item.name}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">₹{item.price * item.quantity}</p>
                </div>
              ))}
              {cart.length === 0 && (
                <p className="text-sm text-gray-400 italic">Your cart is empty.</p>
              )}
            </div>

            <div className="border-t border-white/15 mt-5 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>
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

            <button
              onClick={handlePayment}
              disabled={loading || cart.length === 0}
              className="mt-6 w-full relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#ffd27a] to-[#ffb347] px-8 py-3 font-semibold text-[#1c0f2b] text-sm shadow-[0_0_25px_rgba(255,210,122,0.7)] hover:shadow-[0_0_35px_rgba(255,210,122,0.9)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 bg-white/25 translate-x-[-120%] skew-x-[20deg] animate-[shine_2s_ease-in-out_infinite]" />
              <span className="relative flex items-center gap-2">
                {loading && (
                  <span className="h-4 w-4 border-2 border-[#1c0f2b]/40 border-t-[#1c0f2b] rounded-full animate-spin" />
                )}
                {loading ? 'Processing…' : `Pay ₹${totalAmount}`}
              </span>
            </button>

          <p className="text-[11px] text-gray-400 mt-3 text-center">
            Secure payment powered by Razorpay
          </p>
        </div>
      </div>
      {/* custom scrollbar + shine animation */}
      <style>
        {`
          .custom-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scroll::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.22);
            border-radius: 999px;
          }
          @keyframes shine {
            0% { transform: translateX(-120%) skewX(20deg); }
            60% { transform: translateX(120%) skewX(20deg); }
            100% { transform: translateX(120%) skewX(20deg); }
          }
        `}
      </style>
      </div>
    </div>
  );
};

export default CheckoutPage;

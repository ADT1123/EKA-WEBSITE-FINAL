// pages/OrderSuccess.tsx
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const orderId = searchParams.get('order_id');

  const [showCard, setShowCard] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const cardTimer = setTimeout(() => setShowCard(true), 200);     // card fade-in
    const detailsTimer = setTimeout(() => setShowDetails(true), 900); // details slide-in
    return () => {
      clearTimeout(cardTimer);
      clearTimeout(detailsTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120818] via-[#1c1030] to-[#06030a] flex items-center justify-center px-6 relative overflow-hidden">
      {/* subtle glow blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-80 h-80 bg-[#ffd27a]/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 bg-[#ff9f7a]/10 rounded-full blur-3xl" />

      {/* card */}
      <div
        className={`relative max-w-sm w-full bg-[#120818]/80 border border-white/10 rounded-3xl px-8 pt-10 pb-9 shadow-[0_0_40px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-700 ${
          showCard
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-6 scale-95'
        }`}
      >
        {/* animated circular tick */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            {/* outer pulsing ring */}
            <div className="absolute inset-0 rounded-full bg-[#ffd27a]/10 animate-ping" />
            {/* rotating gradient ring */}
            <div className="w-20 h-20 rounded-full bg-[conic-gradient(from_180deg,rgba(255,210,122,0.1),rgba(255,210,122,0.8),rgba(255,210,122,0.1))] animate-spin-slow" />
            {/* inner circle */}
            <div className="absolute inset-1 rounded-full bg-[#120818] flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ffd27a] to-[#ffb347] flex items-center justify-center shadow-[0_0_25px_rgba(255,210,122,0.7)]">
                <svg
                  className="w-8 h-8 text-[#1c0f2b]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="5 13 9 17 19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* heading */}
        <h1 className="text-center text-2xl font-semibold tracking-wide text-white mb-2">
          Payment Successful
        </h1>
        <p className="text-center text-sm text-gray-300 mb-6">
          Your EKA gift is now being prepared with love.
        </p>

        {/* details */}
        <div
          className={`bg-white/5 rounded-2xl px-5 py-4 border border-white/10 text-xs text-gray-200 space-y-3 transition-all duration-600 ${
            showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Payment ID</span>
            <span className="font-mono text-[11px] text-white truncate max-w-[170px] text-right">
              {paymentId || '—'}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-400">Order ID</span>
            <span className="font-mono text-[11px] text-white truncate max-w-[170px] text-right">
              {orderId || '—'}
            </span>
          </div>
        </div>

        {/* button */}
        <div className="mt-7 flex flex-col items-center gap-3">
          <Link
            to="/"
            className="relative inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-semibold text-[#1c0f2b] bg-gradient-to-r from-[#ffd27a] to-[#ffb347] shadow-[0_0_25px_rgba(255,210,122,0.7)] hover:shadow-[0_0_35px_rgba(255,210,122,0.9)] transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/20 translate-x-[-120%] skew-x-[20deg] animate-[shine_1.8s_ease-in-out_infinite]" />
            <span className="relative">Back to Home</span>
          </Link>
          <p className="text-[11px] text-gray-400">
            A confirmation has been sent to your email / WhatsApp.
          </p>
        </div>
      </div>

      {/* custom animations */}
      <style>
        {`
          .animate-spin-slow {
            animation: spin 4s linear infinite;
          }
          @keyframes shine {
            0% { transform: translateX(-120%) skewX(20deg); }
            60% { transform: translateX(120%) skewX(20deg); }
            100% { transform: translateX(120%) skewX(20deg); }
          }
        `}
      </style>
    </div>
  );
};

export default OrderSuccess;

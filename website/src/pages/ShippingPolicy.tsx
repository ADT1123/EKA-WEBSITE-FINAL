// pages/ShippingPolicy.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Package, Clock, MapPin, Truck, WarningCircle, EnvelopeSimple } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ShippingPolicy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.policy-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-[#fdf9ff] via-[#fff8f0] to-[#fdf9ff] overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#ffd27a]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-[#ffd27a]/60 rounded-full" />
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-purple-300/60 rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-16 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
            Shipping{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b2c5e] to-[#8b5a8e]">
              Policy
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-600 leading-relaxed mb-6">
            Everything you need to know about how we deliver your special gifts.
          </p>
          {/* Back to home */}
          <div className="flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-slate-300 text-slate-700 bg-white/80 hover:bg-white shadow-sm hover:shadow transition-all"
            >
              ← Back to home
            </Link>
          </div>
        </div>

        {/* Policy Content */}
        <div ref={contentRef} className="space-y-6">
          {/* 1. Processing Time */}
          <div className="policy-card rounded-2xl border border-[#ffd27a]/30 bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition-all duration-500">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-[#ffd27a]/20 to-[#f3c566]/20 flex items-center justify-center">
                <Clock size={24} weight="bold" className="text-[#d4a017]" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                  1. Processing Time
                </h2>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  All orders require <strong>3–5 business days</strong> for preparation. Custom orders may take longer depending on complexity.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Shipping Time */}
          <div className="policy-card rounded-2xl border border-[#ffd27a]/30 bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition-all duration-500">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-[#ffd27a]/20 to-[#f3c566]/20 flex items-center justify-center">
                <Truck size={24} weight="bold" className="text-[#d4a017]" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                  2. Shipping Time
                </h2>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  Delivery varies by location. <strong>Average delivery: 5–9 working days</strong> after dispatch.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Shipping Charges */}
          <div className="policy-card rounded-2xl border border-[#ffd27a]/30 bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition-all duration-500">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-[#ffd27a]/20 to-[#f3c566]/20 flex items-center justify-center">
                <Package size={24} weight="bold" className="text-[#d4a017]" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                  3. Shipping Charges
                </h2>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  Shipping charges are calculated at checkout based on your delivery location.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Delays */}
          <div className="policy-card rounded-2xl border border-[#ffd27a]/30 bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition-all duration-500">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-[#ffd27a]/20 to-[#f3c566]/20 flex items-center justify-center">
                <WarningCircle size={24} weight="bold" className="text-[#d4a017]" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                  4. Delays
                </h2>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-3">
                  We are not responsible for courier delays caused by:
                </p>
                <ul className="text-sm md:text-base text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Weather conditions</li>
                  <li>Festivals and public holidays</li>
                  <li>Lockdowns or travel restrictions</li>
                  <li>Strikes or labor issues</li>
                  <li>Remote area logistics challenges</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 5. Tracking Your Order */}
          <div className="policy-card rounded-2xl border border-[#ffd27a]/30 bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition-all duration-500">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-[#ffd27a]/20 to-[#f3c566]/20 flex items-center justify-center">
                <MapPin size={24} weight="bold" className="text-[#d4a017]" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                  5. Tracking Your Order
                </h2>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  After dispatch, a tracking link is shared via <strong>email/SMS</strong>. You can monitor your order's journey in real-time.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Non-Delivery */}
          <div className="policy-card rounded-2xl border border-[#ffd27a]/30 bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition-all duration-500">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-[#ffd27a]/20 to-[#f3c566]/20 flex items-center justify-center">
                <EnvelopeSimple size={24} weight="bold" className="text-[#d4a017]" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                  6. Non-Delivery
                </h2>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-3">
                  If your order hasn't arrived <strong>7 days after the estimated delivery date</strong>, please email us with:
                </p>
                <ul className="text-sm md:text-base text-slate-600 space-y-1.5 list-disc list-inside mb-4">
                  <li>Order ID</li>
                  <li>Full name</li>
                  <li>Tracking number</li>
                </ul>
                <a
                  href="mailto:info.ekagifts@gmail.com"
                  className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-[#4b2c5e] hover:text-[#5b3772] transition-colors"
                >
                  <EnvelopeSimple size={18} weight="bold" />
                  info.ekagifts@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-sm md:text-base text-slate-600 mb-4">
            Have more questions about shipping?
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#4b2c5e] to-[#6b4e7d] text-white font-semibold text-sm md:text-base shadow-lg hover:shadow-xl hover:from-[#5b3772] hover:to-[#7b5e8d] transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;

// components/Timeline.tsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "../CartContext";
import { CaretLeft, CaretRight, Truck, Coins, Headset, ShieldCheck } from "phosphor-react";

gsap.registerPlugin(ScrollTrigger);

type Product = {
  id: string;
  name: string;
  tag: string;
  price: string;
  details: string;
  images: string[];
};

const featuredProducts: Product[] = [
  {
    id: "f1",
    name: "Pastel Birthday Box",
    tag: "Soft & cheerful set",
    price: "₹1,499",
    details:
      "A pastel-toned birthday box with treats, a candle, and a personalised note to set a soft, cheerful mood.",
    images: ["/img/EKAPNGLOGO.png", "/img/EKAPNGLOGO.png", "/img/EKAPNGLOGO.png"],
  },
  {
    id: "f2",
    name: "Work Desk Essentials",
    tag: "Clean, focused setup",
    price: "₹1,899",
    details:
      "Desk organisers, a premium pen, and small desk accents for a clean, focused work corner.",
    images: ["/img/EKAPNGLOGO.png", "/img/EKAPNGLOGO.png", "/img/EKAPNGLOGO.png"],
  },
  {
    id: "f3",
    name: "Self‑Care Evening Kit",
    tag: "Calm, cosy unwind",
    price: "₹1,299",
    details:
      "Tea, cosy add-ons, and a small journal to help slow down in the evenings.",
    images: ["/img/EKAPNGLOGO.png", "/img/EKAPNGLOGO.png", "/img/EKAPNGLOGO.png"],
  },
  {
    id: "f4",
    name: "Thank You Mini Box",
    tag: "Short, sweet gesture",
    price: "₹899",
    details: "A compact trio designed for quick, heartfelt thank-you moments.",
    images: ["/img/EKAPNGLOGO.png", "/img/EKAPNGLOGO.png", "/img/EKAPNGLOGO.png"],
  },
  {
    id: "f5",
    name: "Festive Color Burst",
    tag: "Bright celebration pack",
    price: "₹2,199",
    details:
      "Festive snacks and decor pieces to bring a bright, celebratory feel.",
    images: ["/img/EKAPNGLOGO.png", "/img/EKAPNGLOGO.png", "/img/EKAPNGLOGO.png"],
  },
  {
    id: "f6",
    name: "Team Welcome Hamper",
    tag: "First‑day ready kit",
    price: "₹2,499",
    details:
      "A warm welcome set for new team members with essentials and a small treat.",
    images: ["/img/EKAPNGLOGO.png", "/img/EKAPNGLOGO.png", "/img/EKAPNGLOGO.png"],
  },
];

const Timeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const { addToCart } = useCart();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Features animation
      gsap.fromTo(
        '.eka-feature-item',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredProducts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === featuredProducts.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };

  const handleOpen = (product: Product) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
    setIsAdded(false);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setActiveImageIndex(0);
    setIsAdded(false);
  };

  const handleAddToCartFromModal = () => {
    if (!selectedProduct) return;
    const numericPrice = Number(selectedProduct.price.replace(/[₹,]/g, "")) || 0;
    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: numericPrice,
    });
    setIsAdded(true);
  };

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen py-12 md:py-24 px-3 md:px-4 bg-[#fdf9ff] overflow-hidden"
    >
      {/* background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-5%] w-60 h-60 bg-purple-200/15 blur-3xl" />
        <div className="absolute -bottom-24 right-[-5%] w-72 h-72 bg-pink-200/15 blur-3xl" />
        <div className="absolute top-20 left-16 w-2 h-2 bg-[#ffd27a]/60 rounded-full" />
        <div className="absolute bottom-24 right-24 w-1.5 h-1.5 bg-[#ffd27a]/40 rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-14 px-2">
          <h2
            ref={titleRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 mb-2 tracking-tight"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Ready‑to‑go gift boxes
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm md:text-base text-slate-600">
            Swipe through our curated EKA collection
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-8 sm:px-12 md:px-0">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            aria-label="Previous gift box"
            className="absolute left-0 md:left-0 md:-translate-x-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-[#4b2c5e] hover:border-[#ffd27a] hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <CaretLeft size={20} weight="bold" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next gift box"
            className="absolute right-0 md:right-0 md:translate-x-6 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-[#4b2c5e] hover:border-[#ffd27a] hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <CaretRight size={20} weight="bold" />
          </button>

          {/* Carousel Window */}
          <div 
            className="overflow-hidden py-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="min-w-full px-2 sm:px-3 flex-shrink-0"
                >
                  <div className="eka-feature-card group relative rounded-2xl md:rounded-[28px] border border-[#ffd27a]/40 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.15)] hover:shadow-[0_26px_80px_rgba(15,23,42,0.25)] transition-all duration-500 flex flex-col overflow-hidden max-w-md mx-auto">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl md:rounded-[28px] bg-gradient-to-br from-[#ffd27a]/60 via-transparent to-[#ffdd9c]/60 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />

                    <div className="relative z-10 h-full rounded-2xl md:rounded-[28px] bg-white/95 overflow-hidden border border-transparent group-hover:border-[#ffd27a]/80 transition-colors duration-500">
                      <div className="relative h-48 sm:h-56 md:h-64 w-full border-b border-purple-100/80 overflow-hidden bg-slate-50">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-x-4 sm:inset-x-6 top-3 sm:top-4 h-[3px] rounded-full bg-gradient-to-r from-[#ffd27a] via-[#f3c566] to-[#ffd27a] opacity-80" />
                      </div>

                      <div className="p-5 sm:p-6 md:p-7 flex flex-col">
                        <div className="mb-4 border-b border-slate-100 pb-3">
                          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900">
                            {product.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-pink-600 mt-1">
                            {product.tag}
                          </p>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 mb-5 line-clamp-3">
                          {product.details}
                        </p>

                        <div className="mt-auto flex items-center justify-between gap-3">
                          <div className="flex flex-col">
                            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-slate-400">
                              Starting at
                            </span>
                            <span className="text-base sm:text-lg font-semibold text-slate-900">
                              {product.price}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleOpen(product)}
                            className="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium bg-[#4b2c5e] text-white shadow-lg hover:bg-[#5b3772] active:scale-95 transition-all"
                          >
                            View details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {featuredProducts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-6 bg-[#4b2c5e]"
                    : "w-2 bg-slate-300"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div ref={featuresRef} className="mt-16 md:mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Cash on Delivery */}
            <div className="eka-feature-item group relative rounded-2xl border border-[#ffd27a]/30 bg-white/90 p-6 md:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition-all duration-500">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Coins size={48} weight="bold" className="text-[#d4a017]" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">
                  Cash On Delivery
                </h3>
                <p className="text-xs md:text-sm text-slate-600">
                  We accept cash on delivery also
                </p>
              </div>
            </div>

            {/* Free & Fast Delivery */}
            <div className="eka-feature-item group relative rounded-2xl border border-[#ffd27a]/30 bg-white/90 p-6 md:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition-all duration-500">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Truck size={48} weight="bold" className="text-[#d4a017]" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">
                  Free & Fast Delivery
                </h3>
                <p className="text-xs md:text-sm text-slate-600">
                  We provide free shipping all over India without any shipping fee
                </p>
              </div>
            </div>

            {/* 24/7 Customer Support */}
            <div className="eka-feature-item group relative rounded-2xl border border-[#ffd27a]/30 bg-white/90 p-6 md:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition-all duration-500">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Headset size={48} weight="bold" className="text-[#d4a017]" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">
                  24/7 Customer Support
                </h3>
                <p className="text-xs md:text-sm text-slate-600">
                  We are available here to solve your queries 24/7
                </p>
              </div>
            </div>

            {/* Secure Payment */}
            <div className="eka-feature-item group relative rounded-2xl border border-[#ffd27a]/30 bg-white/90 p-6 md:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition-all duration-500">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck size={48} weight="bold" className="text-[#d4a017]" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">
                  Secure Payment
                </h3>
                <p className="text-xs md:text-sm text-slate-600">
                  100% secure payment with trusted gateways
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div
          className="absolute inset-0 z-50 flex items-end sm:items-center justify-center bg-black/45 backdrop-blur-sm px-0 sm:px-3 md:px-6 py-4"
          onClick={handleClose}
        >
          <div
            className="relative w-full sm:max-w-2xl md:max-w-5xl rounded-t-3xl sm:rounded-3xl bg-gradient-to-br from-white via-[#fff8e9] to-[#fff2d9] shadow-[0_-10px_50px_rgba(0,0,0,0.3)] sm:shadow-[0_40px_120px_rgba(15,23,42,0.6)] border-t sm:border border-[#ffd27a]/80 p-4 sm:p-5 md:p-8 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              className="sticky top-0 right-0 float-right text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-slate-400 hover:text-slate-800 z-10 px-3 py-1.5 rounded-full border border-slate-200 bg-white/90 backdrop-blur-sm shadow-sm"
            >
              Close
            </button>

            <div className="grid gap-5 sm:gap-7 md:grid-cols-[1.2fr,1fr] pt-2 sm:pt-0 clear-both">
              <div>
                <div className="relative aspect-[4/3] w-full rounded-xl sm:rounded-2xl border border-[#ffd27a]/60 bg-slate-50 overflow-hidden shadow-[0_16px_50px_rgba(75,44,94,0.25)]">
                  <img
                    src={selectedProduct.images[activeImageIndex]}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-x-4 sm:inset-x-8 top-3 sm:top-4 h-[3px] rounded-full bg-gradient-to-r from-[#ffd27a] via-[#f3c566] to-[#ffd27a]" />
                </div>

                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={img + idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-lg sm:rounded-xl border overflow-hidden ${
                        idx === activeImageIndex
                          ? "border-[#ffd27a] ring-2 ring-[#ffd27a]/60"
                          : "border-slate-200"
                      } bg-slate-50`}
                    >
                      <img
                        src={img}
                        alt={`${selectedProduct.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="mb-4">
                  <p className="inline-flex items-center px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-semibold tracking-[0.22em] uppercase bg-[#fff8e1] text-[#8a5a1e] border border-[#ffd27a]/70 mb-3">
                    EKA gift box · Preview
                  </p>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 mb-1">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-sm md:text-base text-pink-600">
                    {selectedProduct.tag}
                  </p>
                </div>

                <p className="text-sm md:text-base text-slate-700 mb-4 leading-relaxed">
                  {selectedProduct.details}
                </p>

                <div className="border-l-2 border-[#ffd27a]/80 pl-3 sm:pl-4 mb-5">
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-slate-400 mb-1">
                    Price
                  </p>
                  <p className="text-xl sm:text-2xl font-semibold text-slate-900">
                    {selectedProduct.price}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1">
                    Final value depends on quantity and customisation.
                  </p>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCartFromModal}
                    disabled={isAdded}
                    className={`w-full sm:flex-1 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium shadow-[0_12px_30px_rgba(75,44,94,0.5)] transition-all ${
                      isAdded
                        ? "bg-emerald-500 text-white cursor-default"
                        : "bg-[#4b2c5e] text-white hover:bg-[#5b3772] active:scale-95"
                    }`}
                  >
                    {isAdded ? "✓ Added to cart" : "Add to cart"}
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium border border-slate-300 text-slate-800 bg-white hover:border-[#b98a46] hover:text-[#6b4e31] active:scale-95 transition-all"
                  >
                    Keep browsing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;

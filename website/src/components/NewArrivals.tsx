// components/NewArrivals.tsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { shopProducts } from "../data/shopProducts";
import { useCart } from "../CartContext";

gsap.registerPlugin(ScrollTrigger);

// Ids ya tags ke basis pe jo products new hain unko pick karo
const newArrivalIds = ["vision-board", "mini-desk-calendar"]; // change as needed
const newArrivalProducts = shopProducts.filter((p) =>
  newArrivalIds.includes(p.id)
);

const NewArrivals = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [showToast, setShowToast] = useState(false);
  const [toastProductName, setToastProductName] = useState("");
  const [addingId, setAddingId] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(".eka-new-card", { opacity: 1, y: 0, scale: 1 });
        return;
      }

      // Heading animation
      gsap.fromTo(
        ".eka-new-heading",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards animation
      gsap.fromTo(
        ".eka-new-card",
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!newArrivalProducts.length) return null;

  const handleView = (id: string) => {
    navigate(`/product/${id}`);
  };

  const handleQuickAdd = (id: string) => {
    const product = newArrivalProducts.find((p) => p.id === id);
    if (!product || addingId === id) return;

    setAddingId(id);

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
    });

    setToastProductName(product.name);
    setShowToast(true);

    setTimeout(() => setShowToast(false), 2200);
    setTimeout(() => setAddingId(null), 1500);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 bg-[#fdf9ff] overflow-hidden"
    >
      {/* toast bottom-right (same style as Shop) */}
      {showToast && (
        <div className="fixed z-40 bottom-6 right-4 md:right-8 animate-slideIn">
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/98 backdrop-blur-md shadow-[0_20px_50px_rgba(15,23,42,0.4)] border-2 border-emerald-400/60">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 text-white text-base font-bold shadow-lg">
              ✓
            </div>
            <div className="text-xs md:text-sm">
              <p className="font-bold text-slate-900 mb-0.5">Added to cart!</p>
              <p className="text-slate-600 line-clamp-1 max-w-[200px]">
                {toastProductName}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* soft background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-8%] w-72 h-72 bg-purple-200/15 blur-3xl" />
        <div className="absolute -bottom-24 right-[-8%] w-80 h-80 bg-pink-200/15 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="eka-new-heading text-center mb-10 md:mb-14">
          <p className="inline-flex items-center justify-center px-4 py-1.5 text-xs md:text-sm tracking-[0.3em] uppercase text-[#b98a46] rounded-full bg-gradient-to-r from-[#fff8e1]/90 to-[#fff2d9]/90 border border-[#ffd27a]/60 shadow-sm mb-4 backdrop-blur-sm">
            New arrivals
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 leading-tight">
            Fresh picks from EKA
          </h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600">
            Recently added gifts and kits, ready to ship for your next occasion.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {newArrivalProducts.map((product) => {
            const isAdding = addingId === product.id;
            return (
              <div
                key={product.id}
                className="eka-new-card group relative rounded-3xl border border-slate-200/80 bg-white p-6 md:p-7 shadow-[0_14px_40px_rgba(15,23,42,0.12)] hover:shadow-[0_22px_70px_rgba(15,23,42,0.22)] transition-all duration-500 text-left flex flex-col hover:-translate-y-2"
              >
                {/* image - bigger */}
                <button
                  type="button"
                  onClick={() => handleView(product.id)}
                  className="relative mb-5 rounded-2xl overflow-hidden h-52 md:h-60 bg-slate-50 border border-slate-100 w-full"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-[1deg]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>

                {/* name + price */}
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-base md:text-lg font-bold text-slate-900 group-hover:text-[#6b4e31] transition-colors duration-300 line-clamp-2">
                    {product.name}
                  </h3>
                  <span className="text-sm md:text-base font-semibold text-[#4b2c5e] whitespace-nowrap">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* description */}
                <p className="text-xs md:text-sm text-slate-600 mb-5 line-clamp-1">
                  {product.description}
                </p>

                {/* bottom pill */}
                <div className="mt-auto flex items-center justify-between pt-1">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                    New · Limited
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuickAdd(product.id)}
                    disabled={isAdding}
                    className={`inline-flex items-center px-4 md:px-5 py-2 md:py-2.5 rounded-full 
                               text-xs md:text-sm font-semibold text-white 
                               shadow-[0_12px_32px_rgba(75,44,94,0.6)]
                               transition-all duration-300
                               ${
                                 isAdding
                                   ? "bg-emerald-500 group-hover:bg-emerald-500 scale-105"
                                   : "bg-[#4b2c5e] group-hover:bg-[#5b3772] group-hover:shadow-[0_16px_40px_rgba(75,44,94,0.75)] group-hover:-translate-y-0.5 group-hover:scale-105"
                               }`}
                  >
                    {isAdding ? "Added" : "Add to cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* toast animation keyframes */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>
    </section>
  );
};

export default NewArrivals;

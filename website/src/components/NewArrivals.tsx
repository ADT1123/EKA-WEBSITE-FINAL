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

type ButtonState = "idle" | "added" | "goToCart";

const NewArrivals = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [buttonStates, setButtonStates] = useState<Record<string, ButtonState>>(
    {}
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(".eka-new-card", { opacity: 1, y: 0, scale: 1 });
        return;
      }

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

  const handleAddToCart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const product = newArrivalProducts.find((p) => p.id === id);
    if (!product) return;

    // cart add
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
    });

    // step 1: Added state
    setButtonStates((prev) => ({ ...prev, [id]: "added" }));

    // step 2: after 1.2s -> Go to cart
    setTimeout(() => {
      setButtonStates((prev) => ({ ...prev, [id]: "goToCart" }));
    }, 1200);
  };

  const handleGoToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/cart");
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-24 bg-[#fdf9ff] overflow-hidden"
    >
      {/* soft background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-8%] w-72 h-72 bg-purple-200/15 blur-3xl" />
        <div className="absolute -bottom-24 right-[-8%] w-80 h-80 bg-pink-200/15 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="eka-new-heading text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight mb-2">
            New arrivals
          </h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600">
            Freshly added EKA pieces curated for your next celebration.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {newArrivalProducts.map((product) => {
            const state: ButtonState = buttonStates[product.id] ?? "idle";

            return (
              <div
                key={product.id}
                onClick={() => handleView(product.id)}
                className="eka-new-card group relative rounded-3xl border border-slate-200/80 bg-white p-6 md:p-7 shadow-[0_14px_40px_rgba(15,23,42,0.12)] hover:shadow-[0_22px_70px_rgba(15,23,42,0.22)] transition-all duration-500 text-left flex flex-col hover:-translate-y-2 cursor-pointer"
              >
                {/* image */}
                <div className="relative mb-5 rounded-2xl overflow-hidden h-52 md:h-60 bg-slate-50 border border-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-[1deg]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

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
                <p className="text-xs md:text-sm text-slate-600 mb-5 line-clamp-2">
                  {product.description}
                </p>

                {/* bottom row */}
                <div className="mt-auto flex items-center justify-between pt-1">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                    New · Limited
                  </span>

                  {/* Button states */}
                  {state === "idle" && (
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(e, product.id)}
                      className="inline-flex items-center px-4 md:px-5 py-2 md:py-2.5 rounded-full 
                        text-xs md:text-sm font-semibold bg-[#4b2c5e] text-white 
                        shadow-[0_12px_32px_rgba(75,44,94,0.6)]
                        hover:bg-[#5b3772] hover:shadow-[0_16px_40px_rgba(75,44,94,0.75)]
                        hover:-translate-y-0.5 hover:scale-105
                        transition-all duration-300"
                    >
                      Add to cart
                    </button>
                  )}

                  {state === "added" && (
                    <button
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center px-4 md:px-5 py-2 md:py-2.5 rounded-full 
                        text-xs md:text-sm font-semibold bg-emerald-500 text-white 
                        shadow-[0_12px_32px_rgba(16,185,129,0.6)]
                        transition-all duration-300"
                    >
                      Added
                    </button>
                  )}

                  {state === "goToCart" && (
                    <button
                      type="button"
                      onClick={handleGoToCart}
                      className="inline-flex items-center px-4 md:px-5 py-2 md:py-2.5 rounded-full 
                        text-xs md:text-sm font-semibold bg-[#ffd27a] text-slate-900 
                        shadow-[0_12px_32px_rgba(255,210,122,0.6)]
                        hover:bg-[#ffcc66] hover:shadow-[0_16px_40px_rgba(255,210,122,0.85)]
                        hover:-translate-y-0.5 hover:scale-105
                        transition-all duration-300"
                    >
                      Go to cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;

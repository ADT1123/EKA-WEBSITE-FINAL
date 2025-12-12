import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { shopProducts } from "../data/shopProducts";
import { useCart } from "../CartContext";

const bannerImages = [
  "/img/ekabannershop1.png",
  "/img/4.jpg",
  "/img/6.jpg",
  "/img/7.jpg",
];

const Shop = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const products = useMemo(() => shopProducts, []);
  const [showToast, setShowToast] = useState(false);
  const [toastProductName, setToastProductName] = useState("");
  const [addingId, setAddingId] = useState<string | null>(null);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);

  const [activeSlide, setActiveSlide] = useState(0);

  // Navbar scroll hide logic (Shop page only)
  useEffect(() => {
    let ticking = false;

    const updateNavbar = () => {
      const scrollY = window.scrollY;
      setIsNavbarHidden(scrollY > 50);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto slide banner
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % bannerImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleViewDetails = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleQuickAdd = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product || addingId === id) return;

    setAddingId(id);
    addToCart({
      id: product.id, name: product.name, price: product.price,
      image: ""
    });

    setToastProductName(product.name);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);

    setTimeout(() => {
      setAddingId(null);
    }, 1800);
  };

  return (
    <div className="min-h-screen text-slate-900 relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#fff8e1_0,#fff8e1_20%,#fdf9ff_55%,#f5ecff_90%)]">
      {/* background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#ffecc4]/60 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-200/40 blur-3xl animate-pulse" />
      </div>

      {/* toast bottom-right */}
      {showToast && (
        <div className="fixed z-50 bottom-6 right-4 md:right-8 animate-slideIn">
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/98 backdrop-blur-md shadow-[0_20px_50px_rgba(15,23,42,0.4)] border-2 border-emerald-400/60 transform transition-all duration-300">
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

      {/* Navbar with scroll hide (Shop only) */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          isNavbarHidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <Navigation />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-28 pb-16">
        {/* banner (no text, auto sliding) */}
        <div className="mb-10 md:mb-12">
          <div className="relative w-full overflow-hidden rounded-3xl border border-[#ffd27a]/60 bg-slate-50 shadow-[0_22px_65px_rgba(15,23,42,0.22)]">
            <div className="relative aspect-[16/6] md:aspect-[16/5] w-full">
              {bannerImages.map((src, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    activeSlide === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>

            {/* small dots indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {bannerImages.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeSlide === index
                      ? "w-5 bg-[#ffd27a]"
                      : "w-2.5 bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* product grid */}
        <div className="relative">
          <div className="relative z-10 grid gap-7 md:gap-8 lg:gap-9 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const isAdding = addingId === product.id;
              return (
                <div
                  key={product.id}
                  onClick={() => handleViewDetails(product.id)}
                  className="group relative rounded-3xl border border-slate-200/70 bg-white/95 backdrop-blur-sm shadow-[0_18px_45px_rgba(15,23,42,0.12)] hover:shadow-[0_28px_80px_rgba(15,23,42,0.22)] transition-all duration-500 overflow-hidden flex flex-col hover:-translate-y-2 cursor-pointer"
                >
                  {/* subtle outline + glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl">
                    <div className="absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-[#ffd27a]/70 transition-all duration-400" />
                    <div className="absolute -inset-0.5 rounded-[1.7rem] border border-transparent group-hover:border-[#ffd27a]/50 group-hover:shadow-[0_0_26px_rgba(255,210,122,0.85)] transition-all duration-400" />
                  </div>

                  <div className="relative z-10 flex-1 flex flex-col">
                    {/* image */}
                    <div className="relative h-48 md:h-52 w-full overflow-hidden bg-gradient-to-br from-slate-50 to-purple-50/30 border-b border-[#ffd27a]/30">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-[1deg]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {/* top accent */}
                      <div className="absolute inset-x-6 top-3 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#ffd27a] to-transparent opacity-70" />
                    </div>

                    {/* content */}
                    <div className="p-5 md:p-6 flex-1 flex flex-col">
                      {/* name */}
                      <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2 group-hover:text-[#6b4e31] transition-colors duration-300 line-clamp-2">
                        {product.name}
                      </h3>

                      {/* 2-line description */}
                      <p className="text-xs md:text-sm text-slate-600 mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* price + button */}
                      <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                        <p className="text-lg md:text-xl font-bold text-slate-900">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickAdd(product.id);
                          }}
                          disabled={isAdding}
                          className={`px-4 py-2 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-semibold text-white transition-all duration-300 flex items-center gap-1.5 ${
                            isAdding
                              ? "bg-emerald-500 shadow-[0_12px_30px_rgba(16,185,129,0.6)] scale-105"
                              : "bg-[#4b2c5e] shadow-[0_10px_26px_rgba(75,44,94,0.55)] hover:bg-[#5b3772] hover:shadow-[0_14px_34px_rgba(75,44,94,0.7)] hover:scale-105"
                          }`}
                        >
                          {isAdding ? (
                            <>
                              <span className="inline-flex h-4 w-4 relative">
                                <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-white/60 opacity-75" />
                                <span className="relative inline-flex rounded-full h-4 w-4 bg:white/90" />
                              </span>
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <span className="text-[13px]">＋</span>
                              <span>Add to cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* bottom accent line */}
                  <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-[#ffd27a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* soft shimmer */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer below main content */}
      <Footer />

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Shop;

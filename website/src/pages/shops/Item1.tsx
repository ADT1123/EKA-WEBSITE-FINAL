// pages/shops/Item1.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../CartContext";
import { shopProducts } from "../../data/shopProducts.ts";
import Navigation from "../../components/Navigation";

const Item1 = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [showToast, setShowToast] = useState(false);
  const [adding, setAdding] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = shopProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,#fff8e1_0,#fff8e1_20%,#fdf9ff_55%,#f5ecff_90%)]">
        <button
          onClick={() => navigate("/shop")}
          className="px-6 py-3 bg-[#4b2c5e] text-white rounded-full hover:bg-[#5b3772] transition-colors"
        >
          Back to shop
        </button>
      </div>
    );
  }

  // FIX: ensure all image paths are valid; if any missing/invalid, fall back to product.image
  const images =
    product.images && product.images.length > 0
      ? product.images.map((src) => src || product.image)
      : [product.image];

  const addOnce = () => {
    if (adding) return;
    setAdding(true);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
    setTimeout(() => setAdding(false), 500);
  };

  const handleAddToCart = () => {
    addOnce();
  };

  const handleBuyNow = () => {
    if (!adding) {
      addOnce();
      setTimeout(() => {
        navigate("/cart");
      }, 200);
    } else {
      navigate("/cart");
    }
  };

  return (
    <div className="min-h-screen text-slate-900 relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#fff8e1_0,#fff8e1_20%,#fdf9ff_55%,#f5ecff_90%)]">
      {/* Toast bottom-right */}
      {showToast && (
        <div className="fixed z-40 bottom-6 right-4 md:right-8">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white shadow-[0_18px_45px_rgba(15,23,42,0.35)] border border-emerald-300/70">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-sm">
              ✓
            </div>
            <div className="text-xs md:text-sm">
              <p className="font-semibold text-slate-900">Added to cart</p>
              <p className="text-slate-500">
                {product.name} has been added to your cart.
              </p>
            </div>
          </div>
        </div>
      )}

      <Navigation />

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-28 pb-16">
        <button
          onClick={() => navigate("/shop")}
          className="mb-8 flex items-center gap-2 text-sm text-slate-600 hover:text-[#6b4e31] transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Back to shop
        </button>

        <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
          {/* Image + gallery section */}
          <div className="relative">
            <div className="sticky top-28 space-y-4">
              {/* main image */}
              <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border-2 border-[#ffd27a]/70 bg-slate-50 shadow-[0_30px_80px_rgba(75,44,94,0.3)]">
                <img
                  src={images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = product.image;
                  }}
                />
              </div>

              {/* thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((src, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden border transition-all duration-200 ${
                        activeImageIndex === idx
                          ? "border-[#ffd27a] ring-2 ring-[#ffd27a]/60"
                          : "border-slate-200 hover:border-[#ffd27a]/60"
                      }`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = product.image;
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details section */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {product.name}
            </h1>

            <p className="text-base md:text-lg text-slate-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-8 p-6 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-[#ffd27a]/40 shadow-lg">
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-[#6b4e31] bg-clip-text text-transparent mb-2">
                ₹{product.price}
              </p>
              <p className="text-sm text-slate-500">(Inclusive of all taxes)</p>
            </div>

            {product.features.map((block, idx) => (
              <div key={idx} className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  {block.title}
                </h2>
                <ul className="space-y-2">
                  {block.points.map((pt, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <span className="text-[#ffd27a] text-lg">✓</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-wrap gap-4 mt-6">
              {/* Buy now first */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="px-8 py-4 rounded-full text-sm md:text-base font-semibold text-[#1c0f2b] bg-gradient-to-r from-[#ffd27a] to-[#ffb347] shadow-[0_16px_40px_rgba(255,210,122,0.7)] hover:shadow-[0_20px_50px_rgba(255,210,122,0.9)] transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Buy now</span>
              </button>

              {/* Add to cart second */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`px-8 py-4 rounded-full text-sm md:text-base font-semibold text-white transition-all duration-300 flex items-center gap-2 ${
                  adding
                    ? "bg-[#5b3772] scale-105 shadow-[0_18px_40px_rgba(75,44,94,0.65)]"
                    : "bg-[#4b2c5e] hover:bg-[#5b3772] hover:shadow-[0_18px_40px_rgba(75,44,94,0.65)] hover:scale-105 shadow-[0_12px_28px_rgba(75,44,94,0.5)]"
                }`}
              >
                {adding && (
                  <span className="inline-flex h-4 w-4 relative">
                    <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-white/60 opacity-75" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-white/80" />
                  </span>
                )}
                <span>{adding ? "Adding..." : "Add to cart"}</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Item1;

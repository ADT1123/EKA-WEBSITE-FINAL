import { useState, useMemo } from "react";
import Navigation from "../components/Navigation";
import { useCart } from "../CartContext";
import { shopProducts, Audience, ShopProduct } from "../data/shopProducts";

const Shop = () => {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState<Audience | "all">("all");
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);

  const filteredProducts = useMemo(() => {
    if (filter === "all") return shopProducts;
    return shopProducts.filter((p) => p.audience === filter || p.audience === "both");
  }, [filter]);

  const handleOpen = (product: ShopProduct) => {
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
    });
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen text-slate-900 relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#fff8e1_0,#fff8e1_20%,#fdf9ff_55%,#f5ecff_90%)]">
      {/* extra soft gold / purple blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#ffecc4]/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-200/25 blur-3xl" />
        <div className="absolute top-1/3 right-6 w-40 h-40 bg-[#ffd27a]/30 blur-2xl rounded-full" />
        <div className="absolute bottom-1/4 left-10 w-28 h-28 bg-pink-200/30 blur-2xl rounded-full" />
      </div>

      <Navigation />

      <main className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-28 pb-16">
        {/* Header + filters */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-purple-500">
              EKA shop
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900 mt-1">
              Curated gifts by who you’re gifting
            </h1>
            <p className="text-sm md:text-base text-slate-600 mt-2 max-w-xl">
              Choose a track for her, for him, or for both. Explore each card to see
              detailed options and add them to your cart.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium border ${
                filter === "all"
                  ? "border-[#ffd27a] bg-white text-[#6b4e31]"
                  : "border-slate-300 bg-white text-slate-700 hover:border-[#ffd27a]"
              } transition-colors`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter("her")}
              className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium border ${
                filter === "her"
                  ? "border-[#ffd27a] bg-white text-[#6b4e31]"
                  : "border-slate-300 bg-white text-slate-700 hover:border-[#ffd27a]"
              } transition-colors`}
            >
              For her
            </button>
            <button
              type="button"
              onClick={() => setFilter("him")}
              className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium border ${
                filter === "him"
                  ? "border-[#ffd27a] bg-white text-[#6b4e31]"
                  : "border-slate-300 bg-white text-slate-700 hover:border-[#ffd27a]"
              } transition-colors`}
            >
              For him
            </button>
            <button
              type="button"
              onClick={() => setFilter("both")}
              className={`px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium border ${
                filter === "both"
                  ? "border-[#ffd27a] bg-white text-[#6b4e31]"
                  : "border-slate-300 bg-white text-slate-700 hover:border-[#ffd27a]"
              } transition-colors`}
            >
              For both
            </button>
          </div>
        </div>

        {/* Product grid */}
        <div className="relative">
          <div className="relative z-10 grid gap-6 md:gap-7 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
            <div
                key={product.id}
                className="group relative rounded-3xl border border-[#ffd27a]/70 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.16)] hover:shadow-[0_34px_110px_rgba(15,23,42,0.28)] transition-all duration-400 overflow-hidden flex flex-col"
            >
                {/* edge-only bright gold glow */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl">
                <div className="absolute inset-0 rounded-3xl ring-2 ring-transparent group-hover:ring-[#ffd27a]/70 transition-all duration-300" />
                <div className="absolute -inset-1 rounded-[1.6rem] border border-transparent group-hover:border-[#ffd27a]/40 group-hover:shadow-[0_0_22px_rgba(255,210,122,0.9)] transition-all duration-300" />
                </div>

                <div className="relative z-10 flex-1 flex flex-col">
                {/* image */}
                <div className="relative h-40 md:h-44 w-full overflow-hidden bg-slate-50 border-b border-purple-100/80">
                    <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.18em] bg-white/90 text-purple-700 border border-purple-100">
                    {product.audience === "her"
                        ? "For her"
                        : product.aience === "him"
                        ? "For him"
                        : "For both"}
                    </div>
                </div>

                {/* content */}
                <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <h3 className="text-sm md:text-base font-semibold text-slate-900 mb-1.5">
                    {product.name}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 mb-3">
                    {product.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3">
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                        Starting at
                        </p>
                        <p className="text-base md:text-lg font-semibold text-slate-900">
                        ₹{product.price}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => handleOpen(product)}
                        className="px-3.5 py-1.5 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-medium bg-[#4b2c5e] text-white shadow-[0_10px_24px_rgba(75,44,94,0.45)] hover:bg-[#5b3772] transition-colors"
                    >
                        View details
                    </button>
                    </div>
                </div>

                </div>

                {/* bottom gold line */}
                <div className="absolute inset-x-5 bottom-3 h-[2px] rounded-full bg-[#ffd27a] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            </div>
            ))}


            {filteredProducts.length === 0 && (
              <p className="col-span-full text-sm text-slate-500">
                No boxes found for this filter yet.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Product detail popup */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-4xl rounded-3xl bg-white shadow-[0_30px_90px_rgba(15,23,42,0.5)] border border-[#ffd27a]/70 p-5 md:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-5 top-4 text-[11px] uppercase tracking-[0.2em] text-slate-400 hover:text-slate-800"
            >
              Close
            </button>

            <div className="grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
              {/* image side */}
              <div>
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#ffd27a]/60 bg-slate-50 shadow-[0_20px_60px_rgba(75,44,94,0.25)]">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-6 top-4 h-[3px] rounded-full bg-[#ffd27a]" />
                </div>
              </div>

              {/* text side */}
              <div className="flex flex-col">
                <p className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.22em] uppercase bg-[#fff8e1] text-[#8a5a1e] border border-[#ffd27a]/70 mb-3">
                  EKA gift box ·{" "}
                  {selectedProduct.audience === "her"
                    ? "for her"
                    : selectedProduct.audience === "him"
                    ? "for him"
                    : "for both"}
                </p>

                <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
                  {selectedProduct.name}
                </h2>
                <p className="text-sm md:text-base text-slate-700 mb-4">
                  {selectedProduct.description}
                </p>

                <div className="mb-5">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 mb-1">
                    Starting price
                  </p>
                  <p className="text-lg md:text-xl font-semibold text-slate-900">
                    ₹{selectedProduct.price}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Final amount may vary based on customisation and quantity.
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="px-5 py-2.5 rounded-full text-xs md:text-sm font-medium bg-[#4b2c5e] text-white shadow-[0_12px_30px_rgba(75,44,94,0.5)] hover:bg-[#5b3772] transition-colors"
                  >
                    Add this box to cart
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-5 py-2.5 rounded-full text-xs md:text-sm font-medium border border-slate-300 text-slate-800 bg-white hover:border-[#b98a46] hover:text-[#6b4e31] transition-colors"
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

export default Shop;

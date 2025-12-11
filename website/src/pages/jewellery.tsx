// pages/jewellery.tsx
import React from "react";
import { Link } from "react-router-dom";

const JewelleryComingSoon: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#120818] text-white flex items-center justify-center px-6">
      <main className="max-w-2xl mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[#ffd27a] mb-4">
          Jewellery Line
        </p>

        <h1 className="text-3xl md:text-4xl font-semibold mb-3">
          Jewellery collection
          <span className="block text-[#ffd27a] mt-1">coming soon.</span>
        </h1>

        <p className="text-sm md:text-base text-gray-300 mb-8">
          We are working on a curated range of elegant jewellery pieces to pair
          beautifully with your EKA gifts. Stay tuned for the launch.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Link
            to="/shop"
            className="px-6 py-2.5 rounded-full text-sm font-semibold bg-[#ffd27a] text-[#1c1026] hover:bg-[#ffdf92] transition-colors"
          >
            Explore gifts for now
          </Link>
          <Link
            to="/"
            className="px-6 py-2.5 rounded-full text-sm font-semibold border border-white/20 text-gray-100 hover:bg-white/10 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        <p className="text-[11px] text-gray-500">
          Made by EKA Gifts • Jewellery section under construction.
        </p>
      </main>
    </div>
  );
};

export default JewelleryComingSoon;

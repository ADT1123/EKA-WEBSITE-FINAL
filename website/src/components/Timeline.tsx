// components/Timeline.tsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        ".timeline-card",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cards = [
    {
      key: "her",
      heading: "FOR HER",
      subtext: "Elegant Essentials & Gifts",
      image: "/img/for-her.jpg", // ✅ replace with your image path
      tag: "her",
    },
    {
      key: "him",
      heading: "FOR HIM",
      subtext: "Elegant Essentials & Gifts",
      image: "/img/for-him.jpg", // ✅ replace with your image path
      tag: "him",
    },
    {
      key: "corporate",
      heading: "FOR CORPORATE",
      subtext: "Premium Hampers & Gifts",
      image: "/img/for-corporate.jpg", // ✅ replace with your image path
      tag: "corporate",
    },
  ];

  const handleCardClick = (tag: string) => {
    navigate(`/shop?tag=${tag}`);
  };

  return (
    <div
      ref={sectionRef}
      className="relative py-16 md:py-24 px-4 bg-[#fdf9ff]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2
            ref={titleRef}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900"
          >
            Shop By Category
          </h2>
          <p className="text-sm md:text-base text-slate-600 mt-2">
            Pick a collection to explore curated hampers
          </p>
        </div>

        <div ref={cardsRef} className="grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => handleCardClick(c.tag)}
              className="timeline-card group relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100/60 shadow-[0_12px_40px_rgba(75,44,94,0.12)] hover:shadow-[0_20px_60px_rgba(75,44,94,0.25)] transition-all duration-500 flex flex-col items-stretch hover:-translate-y-2"
            >
              {/* Image section */}
              <div className="relative w-full h-48 md:h-56 overflow-hidden bg-white/50">
                <img
                  src={c.image}
                  alt={c.heading}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              </div>

              {/* Text content */}
              <div className="relative p-6 md:p-7 flex flex-col items-center text-center bg-gradient-to-b from-purple-50/80 to-white/90">
                <h3 className="text-xl md:text-2xl font-bold text-[#4b2c5e] mb-1 tracking-wide group-hover:text-[#5b3772] transition-colors duration-300">
                  {c.heading}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 opacity-80 mb-4">
                  {c.subtext}
                </p>

                {/* Shop Now button */}
                <span
                  className="inline-flex px-5 py-2 rounded-full text-xs md:text-sm font-semibold 
                            bg-[#4b2c5e] text-white 
                            shadow-[0_10px_26px_rgba(75,44,94,0.55)]
                            border border-transparent
                            group-hover:bg-[#5b3772]
                            group-hover:shadow-[0_16px_40px_rgba(75,44,94,0.8)]
                            group-hover:border-[#ffd27a]
                            group-hover:-translate-y-1
                            group-hover:scale-110
                            group-hover:rotate-[-1.5deg]
                            transition-all duration-300 ease-out
                            relative overflow-hidden"
                >
                  {/* inner shimmer for crazy hover */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  <span className="relative">Shop Now</span>
                </span>

              </div>

              {/* Subtle glow ring */}
              <div className="absolute inset-0 ring-1 ring-transparent group-hover:ring-[#ffd27a]/50 rounded-3xl transition-all duration-400 pointer-events-none" />


              {/* Shimmer effect */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;

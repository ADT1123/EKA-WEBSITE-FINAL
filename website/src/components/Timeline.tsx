// components/Timeline.tsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cards = [
    {
      key: "her",
      gradient: "from-[#ffd27a] to-[#ffb347]",
      tag: "her",
      imageText: "FOR HER",
    },
    {
      key: "him",
      gradient: "from-[#ffd27a] to-[#ffb347]",
      tag: "him",
      imageText: "FOR HIM",
    },
    {
      key: "corporate",
      gradient: "from-[#ffd27a] to-[#ffb347]",
      tag: "corporate",
      imageText: "CORPORATE",
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
            Ready‑to‑go gift boxes
          </h2>
          <p className="text-sm md:text-base text-slate-600 mt-2">
            Pick a lane to explore curated hampers
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => handleCardClick(c.tag)}
              className="group relative rounded-3xl overflow-hidden border border-[#ffd27a]/60 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.18)] hover:shadow-[0_26px_80px_rgba(15,23,42,0.32)] transition-all duration-400 flex flex-col items-stretch h-[280px] md:h-[320px]"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-400`}
              />
              
              {/* Gold & Purple Placeholder Image */}
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-300 to-purple-500 opacity-20" />
                <div className="relative bg-gradient-to-r from-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider drop-shadow-lg">
                  {c.imageText}
                </div>
              </div>
              
              <span className="absolute top-4 left-4 inline-flex px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.22em] uppercase bg-[#fff8e1] text-[#8a5a1e] border border-[#ffd27a]/70">
                EKA · Collection
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HERO_IMAGE = '/img/ekabg2.png'; // yahan apna hero image path

const Hero = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(
          heroRef.current,
          { opacity: 0, scale: 1.02 },
          { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' }
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 1.3, ease: 'power2.out' },
          '-=0.7'
        )
        .fromTo(
          buttonRef.current,
          { opacity: 0, y: 32, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.6)' },
          '-=0.5'
        );
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="
        relative w-screen min-h-screen
        flex flex-col items-center justify-end
        pb-16 md:pb-24 px-4 md:px-6
        overflow-hidden
      "
    >
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          ref={imageRef}
          src={HERO_IMAGE}
          alt="EKA hero"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* dark/gradient overlay for mobile readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/0 md:from-black/30" />
      </div>

      {/* CTA */}
      <div className="relative z-20 w-full max-w-xs sm:max-w-sm flex justify-center">
        <Link to="/shop" className="w-full flex justify-center">
          <Button
            ref={buttonRef}
            size="lg"
            className="
              group relative
              w-full sm:w-auto
              px-6 py-4 sm:px-8 sm:py-6
              text-base sm:text-lg md:text-xl
              font-medium
              bg-white/92 hover:bg-white
              backdrop-blur-2xl
              shadow-xl sm:shadow-2xl
              hover:shadow-[0_22px_45px_-12px_rgba(0,0,0,0.25)]
              border border-white/60 hover:border-white/90
              text-slate-900 hover:text-slate-950
              transition-all duration-500
              hover:scale-[1.02]
              rounded-2xl sm:rounded-3xl
              overflow-hidden
            "
          >
            <span className="flex items-center justify-center gap-2 relative z-10">
              <span className="truncate">Explore collections</span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-all duration-400 ease-out group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;

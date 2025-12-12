import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  let currentIndex = useRef(0);

  const heroImages = [
    '/img/3.jpg',
    '/img/2.jpg', 
    '/img/ekacalendar.jpg',
    '/img/visionboard.jpg',
    '/img/ekahero.jpg'
  ];

  useEffect(() => {
    // Video jaisa buttery smooth crossfade transition
    const interval = setInterval(() => {
      const nextIndex = (currentIndex.current + 1) % heroImages.length;
      
      // Current image - gentle fade + subtle scale
      gsap.to(imagesRef.current[currentIndex.current], {
        opacity: 0,
        scale: 0.98,
        duration: 1.6,
        ease: 'power2.inOut'
      });
      
      // Next image - smooth reveal
      gsap.set(imagesRef.current[nextIndex], {
        opacity: 0,
        scale: 1.02
      });
      
      gsap.to(imagesRef.current[nextIndex], {
        opacity: 1,
        scale: 1,
        duration: 1.8,
        ease: 'power2.out'
      });
      
      currentIndex.current = nextIndex;
    }, 4500);

    // Smooth hero entrance
    const ctx = gsap.context(() => {
      gsap.timeline()
        .fromTo(heroRef.current, 
          { opacity: 0, scale: 1.03 }, 
          { opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out' }
        )
        .fromTo(imagesRef.current[0], 
          { opacity: 0, scale: 1.05 }, 
          { opacity: 1, scale: 1, duration: 1.6, ease: 'power2.out' }, "-=0.8"
        )
        .fromTo(buttonRef.current,
          { opacity: 0, y: 50, scale: 0.9 }, 
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'back.out(1.6)' }, "-=0.6"
        );
    }, heroRef);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-screen h-screen flex flex-col items-center justify-end pb-20 px-6 overflow-hidden"
    >
      {/* Ultra Smooth Crossfade Carousel - Optimized */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((src, i) => (
          <img
            key={i}
            ref={(el) => { imagesRef.current[i] = el; }}
            src={src}
            srcSet={`
              ${src}?w=640 640w,
              ${src}?w=750 750w,
              ${src}?w=828 828w,
              ${src}?w=1080 1080w,
              ${src}?w=1200 1200w,
              ${src}?w=1920 1920w,
              ${src}?w=2560 2560w
            `}
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, 1920px"
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-0 will-change-[opacity,transform]"
            style={{ willChange: 'opacity, transform' }}
          />
        ))}
      </div>

      {/* Elegant CTA */}
      <div className="relative z-20 w-full max-w-sm flex justify-center">
    <Link to="/shop">
          <Button 
            ref={buttonRef}
            size="lg" 
            className="group relative px-8 py-6 text-xl font-medium bg-white/92 hover:bg-white backdrop-blur-2xl shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-white/60 hover:border-white/90 text-slate-900 hover:text-slate-950 transition-all duration-700 hover:scale-[1.02] hover:shadow-pink-500/40 rounded-3xl overflow-hidden will-change-transform"
          >
            <span className="flex items-center gap-2 relative z-10">
              Explore collections
              <svg 
                className="w-5 h-5 group-hover:translate-x-1.5 transition-all duration-500 ease-out group-hover:scale-110"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            
            {/* Enhanced glow + shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400/15 via-transparent to-purple-400/15 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-3xl -z-10 scale-[1.02]" />
            
            {/* Micro shimmer effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 rounded-3xl overflow-hidden" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;

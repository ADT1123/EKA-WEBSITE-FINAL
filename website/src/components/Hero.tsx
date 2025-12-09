import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);
  const bgImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // whole hero subtle fade + lift
      tl.fromTo(
        heroRef.current,
        { opacity: 0, y: 20, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power2.out',
        }
      );

      // logo + title + subtitle + ctas as a smooth chain
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.35'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'back.out(1.4)',
          },
          '-=0.4'
        );

      // background float
      gsap.to('.hero-floating', {
        y: -10,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.35, from: 'random' },
      });

      // ============ PARALLAX EFFECTS ============

      // Background image parallax - subtle movement
      gsap.to(bgImageRef.current, {
        y: 150,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2.5,
        },
      });

      // Background blobs parallax
      gsap.to('.hero-floating:nth-child(1)', {
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      });

      gsap.to('.hero-floating:nth-child(2)', {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to('.hero-floating:nth-child(3)', {
        y: 120,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.8,
        },
      });

      // Content parallax + fade out
      gsap.to(contentWrapperRef.current, {
        yPercent: -15,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // Logo subtle parallax
      gsap.to(logoRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-section"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax - No Scale */}
      <div className="absolute inset-0 z-0">
        <img
          ref={bgImageRef}
          src="/img/EKABG1.png"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating blobs on top of background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-[1]">
        <div className="hero-floating absolute -top-24 -left-16 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="hero-floating absolute -bottom-28 -right-10 h-80 w-80 rounded-full bg-purple-300/40 blur-3xl" />
        <div className="hero-floating absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-200/40 blur-3xl" />
      </div>

      <div 
        ref={contentWrapperRef}
        className="relative z-10 w-full max-w-6xl px-5 md:px-8 lg:px-12"
      >
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-center gap-10 lg:gap-16">
          {/* left: text */}
          <div className="w-full lg:w-1/2">
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-tight text-slate-900"
            >
              Gifts that feel
              <span className="block bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent mt-1">
                more like emotions.
              </span>
            </h1>

            <div
              ref={ctaRef}
              className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center gap-3 md:gap-4"
            >
              <Link to="/shop" className="w-full sm:w-auto">
                <Button size="lg" className="eka-btn w-full sm:w-auto">
                  Explore collections
                </Button>
              </Link>

              <Link to="/about" className="w-full sm:w-auto">
                {/* Your about button */}
              </Link>
            </div>
          </div>

          {/* right: big logo */}
          <div
            ref={logoRef}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-pink-200/40 blur-2xl" />
              <img
                src="/img/EKAPNGLOGO.png"
                alt="EKA logo"
                className="relative h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 w-auto drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

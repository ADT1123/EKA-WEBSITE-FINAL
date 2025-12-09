import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    step: '01',
    date: 'Day 1',
    title: 'You share the occasion',
    description:
      'Tell us who you are gifting, what the occasion is, and the mood you want to create.',
  },
  {
    step: '02',
    date: 'Day 2-3',
    title: 'We curate the concept',
    description:
      'Our team picks products, colors and materials that match the story you want to tell.',
  },
  {
    step: '03',
    date: 'Day 4-6',
    title: 'Products are sourced',
    description:
      'We work with trusted makers to source quality pieces that feel premium, not generic.',
  },
  {
    step: '04',
    date: 'Day 7-8',
    title: 'Box is designed & packed',
    description:
      'Every detail is arranged by hand so the unboxing feels intentional and put‑together.',
  },
  {
    step: '05',
    date: 'Day 9',
    title: 'Notes & personalization',
    description:
      'We add your message, names, and small touches that make the gift feel truly personal.',
  },
  {
    step: '06',
    date: 'Day 10',
    title: 'Delivered on time',
    description:
      'The finished gift goes out with careful packing and tracking so it reaches safely.',
  },
];

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        gsap.set('.eka-timeline-item', { opacity: 1, y: 0, scale: 1 });
        gsap.set('.eka-timeline-dot', { opacity: 1, scale: 1 });
        return;
      }

      // Heading animation
      gsap.fromTo(
        '.eka-process-heading',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Timeline line progressive draw
      gsap.fromTo(
        '.eka-timeline-line',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate dots with stagger
      gsap.fromTo(
        '.eka-timeline-dot',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animate cards from bottom
      gsap.fromTo(
        '.eka-timeline-item',
        { 
          opacity: 0, 
          y: 40,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 md:py-28 lg:py-32 bg-[#fdf9ff] overflow-hidden"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-[-8%] w-72 h-72 bg-purple-200/15 blur-3xl" />
        <div className="absolute -bottom-32 right-[-8%] w-80 h-80 bg-pink-200/15 blur-3xl" />
        <div className="absolute top-20 left-20 w-2 h-2 bg-[#ffd27a]/60 rounded-full" />
        <div className="absolute bottom-32 right-24 w-1.5 h-1.5 bg-[#ffd27a]/40 rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Heading */}
        <div className="eka-process-heading text-center mb-14 md:mb-20">
          <p className="inline-flex items-center justify-center px-4 py-1.5 text-sm md:text-base tracking-[0.3em] uppercase text-[#b98a46] rounded-full bg-gradient-to-r from-[#fff8e1]/90 to-[#fff2d9]/90 border border-[#ffd27a]/60 shadow-sm mb-4 backdrop-blur-sm">
            How EKA works
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            From idea to delivered gift
          </h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-slate-600 leading-relaxed">
            A simple, clear process so you always know what is happening — from
            the first message to the moment it is opened.
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div ref={timelineRef} className="relative pt-8">
          {/* Horizontal Line at Top */}
          <div className="absolute top-0 left-0 right-0 h-1 hidden md:block">
            <div className="eka-timeline-line w-full h-full bg-gradient-to-r from-[#ffd27a] via-[#d4a017] to-[#ffd27a] rounded-full shadow-lg" />
          </div>

          {/* Timeline Grid - All Cards Below Line */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-4 pt-8">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="relative flex flex-col items-center"
              >
                {/* Dot on Line (Desktop only) */}
                <div className="hidden md:block absolute -top-8 left-1/2 -translate-x-1/2 z-10">
                  <div className="eka-timeline-dot relative">
                    {/* Outer Glow */}
                    <div className="absolute inset-0 w-6 h-6 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-[#ffd27a]/40 blur-md" />
                    
                    {/* Dot */}
                    <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-[#ffd27a] to-[#d4a017] border-4 border-white shadow-lg" />
                  </div>
                </div>

                {/* Card Below Line */}
                <div className="w-full">
                  <div className="eka-timeline-item relative rounded-2xl border-2 border-[#ffd27a]/40 bg-white p-5 shadow-[0_16px_50px_rgba(212,160,23,0.15)] hover:shadow-[0_25px_70px_rgba(212,160,23,0.25)] hover:border-[#ffd27a]/60 transition-all duration-500">
                    {/* Top Gold Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-[#ffd27a] to-[#d4a017]" />

                    {/* Date Badge */}
                    <div className="inline-flex items-center px-3 py-1 mb-3 rounded-full bg-gradient-to-r from-[#fff8e1] to-[#fff2d9] border border-[#ffd27a]/50">
                      <span className="text-xs font-bold text-[#8a5a1e] tracking-wider">
                        {step.date}
                      </span>
                    </div>

                    {/* Step Number */}
                    <div className="text-4xl font-bold text-[#d4a017] mb-2">
                      {step.step}
                    </div>

                    {/* Title */}
                    <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 leading-tight">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Bottom Gold Accent */}
                    <div className="absolute bottom-3 right-3 w-6 h-6 rounded-lg bg-[#ffd27a]/20" />
                  </div>
                </div>

                {/* Connecting Line (Mobile Vertical) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden w-0.5 h-8 bg-gradient-to-b from-[#ffd27a] to-[#d4a017] my-4 mx-auto" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

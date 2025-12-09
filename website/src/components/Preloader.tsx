import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const CleanPreloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const gifRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      gifRef.current,
      { opacity: 0, scale: 0.9, y: 10 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }
    )
      // hold so total ~3s before fade (0.6 + 2.4)
      .to({}, { duration: 2.4 })
      // fade out the whole overlay
      .to(preloaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => onComplete(),
      });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#fdf9ff]"
    >
      <div className="w-[160px] sm:w-[190px] md:w-[220px] lg:w-[240px] max-w-[70vw]">
        <img
          ref={gifRef}
          src="/img/EKAloader.gif"
          alt="Loading EKA"
          className="w-full h-auto block mx-auto"
        />
      </div>
    </div>
  );
};

export default CleanPreloader;

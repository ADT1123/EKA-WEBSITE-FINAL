import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-col',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.social-pill',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          delay: 0.5,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
          },
        }
      );

      // floating white particles
      gsap.to('.footer-particle', {
        y: 'random(-12, 12)',
        x: 'random(-10, 10)',
        duration: 'random(4, 7)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.4,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Featured Products', path: '/shop' },
    { name: 'Customize Gift', path: '/custom' },
    { name: 'Shop Now', path: '/shop' },
    { name: 'Our Services', path: '/services' },
  ];

  const socialButtons = [
    { name: 'Instagram', url: '#' },
    { name: 'Facebook', url: '#' },
    { name: 'Twitter', url: '#' },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative pt-20 pb-10 px-6 md:px-12 overflow-hidden rounded-t-[40px]"
      style={{
        background: 'linear-gradient(135deg, #1f0c29 0%, #4b2c5e 100%)',
      }}
    >
      {/* background glows */}
      <div className="absolute top-[-120px] left-[-120px] w-96 h-96 bg-purple-500/25 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-120px] right-[-120px] w-80 h-80 bg-orange-400/15 blur-[110px] rounded-full pointer-events-none" />

      {/* white particles */}
      <div className="pointer-events-none absolute inset-0">
        <span className="footer-particle absolute top-10 left-10 w-1 h-1 bg-white/70 rounded-full" />
        <span className="footer-particle absolute top-20 right-24 w-1.5 h-1.5 bg-white/60 rounded-full" />
        <span className="footer-particle absolute bottom-16 left-1/3 w-1 h-1 bg-white/50 rounded-full" />
        <span className="footer-particle absolute bottom-24 right-1/4 w-1.5 h-1.5 bg-white/65 rounded-full" />
        <span className="footer-particle absolute top-1/2 left-16 w-1 h-1 bg-white/55 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* brand */}
          <div className="footer-col lg:col-span-1 space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="/img/EKAPNGLOGO.png"
                alt="EKA Logo"
                className="h-16 w-auto opacity-90 brightness-0 invert"
              />
            </Link>
            <p className="text-white/80 text-base leading-relaxed max-w-xs font-light">
              Premium & Customizable Gifts for Every Occasion
            </p>
          </div>

          <div className="hidden lg:block lg:col-span-1" />

          {/* quick links */}
          <div className="footer-col space-y-6">
            <h3 className="text-xl font-bold text-[#ffdcb0] tracking-wide">
              Quick Links
              <div className="w-12 h-0.5 bg-[#ffdcb0] mt-2 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="relative inline-flex text-white/75 text-sm md:text-base font-light transition-colors duration-200 hover:text-[#ffdcb0]"
                  >
                    {link.name}
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#ffdcb0] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="footer-col space-y-7">
            <h3 className="text-xl font-bold text-[#ffdcb0] tracking-wide">
              Contact Us
              <div className="w-12 h-0.5 bg-[#ffdcb0] mt-2 rounded-full" />
            </h3>

            <div className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1">
                  Email
                </p>
                <a
                  href="mailto:info.ekagifts@gmail.com"
                  className="relative inline-flex text-white/90 text-base font-medium hover:text-[#ffdcb0] transition-colors"
                >
                  info.ekagifts@gmail.com
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#ffdcb0] transition-all duration-300 hover:w-full" />
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1">
                  Phone
                </p>
                <a
                  href="tel:+919999999999"
                  className="relative inline-flex text-white/90 text-base font-medium hover:text-[#ffdcb0] transition-colors"
                >
                  +91 99999 99999
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#ffdcb0] transition-all duration-300 hover:w-full" />
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1">
                  Address
                </p>
                <p className="text-white/80 text-base leading-relaxed">
                  Mumbai, Maharashtra
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* bottom row */}
        <div className="border-t border-white/10 pt-10 mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 footer-col">
          <div className="space-y-4">
            <h4 className="text-[#ffdcb0] font-bold text-lg">Follow us</h4>
            <div className="flex flex-wrap gap-3">
              {socialButtons.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="social-pill relative px-6 py-2.5 rounded-full bg-white/5 border border-white/15 text-white/80 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:bg-[#ffdcb0] hover:text-[#2b1737] hover:border-[#ffdcb0]"
                >
                  {social.name}
                  <span className="pointer-events-none absolute left-6 right-6 bottom-1 h-[2px] w-0 bg-[#b98a46] rounded-full transition-all duration-300 group-hover:w-[60%]" />
                </a>
              ))}
            </div>
          </div>

          <div className="text-white/30 text-xs mt-4 md:mt-0">
            © {new Date().getFullYear()} EKA Gifts. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// pages/Contact.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  EnvelopeSimple,
  Phone,
  MapPin,
  InstagramLogo,
  FacebookLogo,
  LinkedinLogo,
} from 'phosphor-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const infoCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.contact-info-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: infoCardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-[#fdf9ff] via-[#fff8f0] to-[#fdf9ff] overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#ffd27a]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-[#ffd27a]/60 rounded-full" />
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-purple-300/60 rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-16 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
            Get in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b2c5e] to-[#8b5a8e]">
              Touch
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-600 leading-relaxed">
            Have a question or need a custom gift? Reach out and we&apos;ll help you
            craft something special.
          </p>
          {/* Back to home */}
          <div className="mt-6 flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-slate-300 text-slate-700 bg-white/80 hover:bg-white shadow-sm hover:shadow transition-all"
            >
              ← Back to home
            </Link>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div
          ref={infoCardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20"
        >
          {/* Email Card */}
          <div className="contact-info-card group relative rounded-2xl border border-[#ffd27a]/30 bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition-all duration-500">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-[#ffd27a]/20 to-[#f3c566]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <EnvelopeSimple size={32} weight="bold" className="text-[#d4a017]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                Email Us
              </h3>
              <a
                href="mailto:info.ekagifts@gmail.com"
                className="text-sm md:text-base text-slate-600 hover:text-[#4b2c5e] transition-colors break-all"
              >
                info.ekagifts@gmail.com
              </a>
            </div>
          </div>

          {/* Phone Card */}
          <div className="contact-info-card group relative rounded-2xl border border-[#ffd27a]/30 bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition-all duration-500">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-[#ffd27a]/20 to-[#f3c566]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Phone size={32} weight="bold" className="text-[#d4a017]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                Call Us
              </h3>
              <a
                href="tel:+919244012840"
                className="text-sm md:text-base text-slate-600 hover:text-[#4b2c5e] transition-colors"
              >
                +91 92440 12840
              </a>
              <a
                href="tel:+919999258697"
                className="text-sm md:text-base text-slate-600 hover:text-[#4b2c5e] transition-colors"
              >
                +91 99992 58697
              </a>
              <p className="text-xs md:text-sm text-slate-500 mt-2">
                Mon–Sat, 9 AM–7 PM IST
              </p>
            </div>
          </div>

          {/* Location Card */}
          <div className="contact-info-card group relative rounded-2xl border border-[#ffd27a]/30 bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition-all duration-500">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-[#ffd27a]/20 to-[#f3c566]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MapPin size={32} weight="bold" className="text-[#d4a017]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                Visit Us
              </h3>
              <p className="text-sm md:text-base text-slate-600">
                Mumbai, Maharashtra
                <br />
                India
              </p>
            </div>
          </div>
        </div>

        {/* Map + Socials + Business Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Map */}
          <div className="rounded-3xl border border-[#ffd27a]/40 bg-white/95 backdrop-blur-sm overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.12)] h-64 md:h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160991781!2d72.71637063901937!3d19.08219783971336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="EKA Location"
            />
          </div>

          <div className="space-y-8">
            {/* Social Links */}
            <div className="rounded-3xl border border-[#ffd27a]/40 bg-white/95 backdrop-blur-sm p-6 md:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                Follow Us
              </h3>
              <p className="text-sm md:text-base text-slate-600 mb-6">
                Stay connected with us on social media for the latest updates,
                gift ideas, and special offers.
              </p>

              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/ekagifts.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 rounded-full bg-gradient-to-br from-[#ffd27a]/20 to-[#f3c566]/20 flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                  aria-label="Instagram"
                >
                  <InstagramLogo size={24} weight="bold" className="text-[#d4a017]" />
                </a>

                <a
                  href="https://www.facebook.com/people/Eka-Gifts/pfbid02UgQx21c7MnZWRGzDzeYdczXy37iXJ3qswNQSyMk5pUd2tQssmJTKRnLXbRLcjsjbl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 rounded-full bg-gradient-to-br from-[#ffd27a]/20 to-[#f3c566]/20 flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                  aria-label="Facebook"
                >
                  <FacebookLogo size={24} weight="bold" className="text-[#d4a017]" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 rounded-full bg-gradient-to-br from-[#ffd27a]/20 to-[#f3c566]/20 flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <LinkedinLogo size={24} weight="bold" className="text-[#d4a017]" />
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="rounded-3xl border border-[#ffd27a]/40 bg-white/95 backdrop-blur-sm p-6 md:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                Business Hours
              </h3>
              <div className="space-y-2 text-sm md:text-base">
                <div className="flex justify-between">
                  <span className="text-slate-600">Monday – Friday</span>
                  <span className="font-medium text-slate-900">9:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Saturday and Sunday</span>
                  <span className="font-medium text-slate-900">
                    9:00 AM – 5:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Contact;


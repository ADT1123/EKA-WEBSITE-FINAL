// pages/About.tsx or components/AboutPage.tsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { List, X, ShoppingCart } from 'phosphor-react';
import { useCart } from '../CartContext';

gsap.registerPlugin(ScrollTrigger);

// Simple Counter Component
const Counter = ({ 
  end, 
  label, 
  suffix = '' 
}: { 
  end: number; 
  label: string; 
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            gsap.to({ val: 0 }, {
              val: end,
              duration: 2,
              ease: 'power2.out',
              onUpdate: function() {
                setCount(Math.ceil(this.targets()[0].val));
              }
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={counterRef} className="text-center fade-up">
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-base md:text-lg text-white/70 font-light tracking-wide">
        {label}
      </p>
    </div>
  );
};

const AboutPage = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth fade-up animations
      const fadeElements = gsap.utils.toArray<HTMLElement>('.fade-up');
      
      fadeElements.forEach((element) => {
        gsap.fromTo(
          element,
          { 
            opacity: 0, 
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Hero animation
      gsap.fromTo(
        '.hero-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.2,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Subtle Gradient Background - Less Gold */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4b2c5e] via-[#5a3d6b] to-[#6b4e7d]">
        {/* Subtle overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,210,122,0.2),transparent_50%)]" />
        </div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 py-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
              <span className="text-xl md:text-2xl font-bold text-white">E</span>
            </div>
            <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              EKA
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-white/80 hover:text-white transition-colors duration-300 font-light"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white transition-colors duration-300 font-medium"
            >
              About
            </Link>
            <Link
              to="/products"
              className="text-white/80 hover:text-white transition-colors duration-300 font-light"
            >
              Products
            </Link>
            <Link
              to="/contact"
              className="text-white/80 hover:text-white transition-colors duration-300 font-light"
            >
              Contact
            </Link>
          </div>

          {/* Cart + Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative p-2 md:p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <ShoppingCart size={20} className="text-white" weight="bold" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-[#4b2c5e] text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              {mobileMenuOpen ? (
                <X size={20} className="text-white" weight="bold" />
              ) : (
                <List size={20} className="text-white" weight="bold" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-6 py-4 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-6 py-4 text-white hover:bg-white/10 transition-all duration-300 font-medium"
            >
              About
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-6 py-4 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              Products
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-6 py-4 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              Contact
            </Link>
          </div>
        )}
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24 lg:py-32">
        
        {/* Hero Section */}
        <div className="hero-content text-center mb-32 md:mb-40">
          <p className="text-sm md:text-base tracking-[0.4em] uppercase text-white/60 mb-8 font-light">
            About EKA
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-10 leading-[1.1]">
            Thoughtful gifting,<br />made simple
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed font-light">
            We design personalized gift boxes that feel handmade,<br className="hidden md:block" />
            not mass-produced.
          </p>
        </div>

        {/* Stats Section */}
        <div className="fade-up mb-32 md:mb-40">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-20">
            <Counter end={1500} label="Happy Customers" suffix="+" />
            <Counter end={3200} label="Gifts Delivered" suffix="+" />
            <Counter end={150} label="Unique Products" suffix="+" />
            <Counter end={98} label="Satisfaction Rate" suffix="%" />
          </div>
        </div>

        {/* Mission Statement */}
        <div className="fade-up max-w-4xl mx-auto mb-32 md:mb-40">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-12 leading-tight">
            Why We Started
          </h2>
          <div className="space-y-8 text-center">
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
              EKA began with a simple question: Why do most gifts feel rushed, generic, or impersonal?
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
              We wanted to create something different — gift boxes that carry meaning, not just products. Every box starts with a conversation about the person, the occasion, and the feeling you want to create.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="fade-up max-w-4xl mx-auto mb-32 md:mb-40">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-16 leading-tight">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                Quality over quantity
              </h3>
              <p className="text-base md:text-lg text-white/70 font-light leading-relaxed">
                Every product is chosen with care
              </p>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                Personal touch
              </h3>
              <p className="text-base md:text-lg text-white/70 font-light leading-relaxed">
                Each box feels handcrafted, not factory-made
              </p>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                Sustainable choices
              </h3>
              <p className="text-base md:text-lg text-white/70 font-light leading-relaxed">
                We work with makers who care about impact
              </p>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                On-time delivery
              </h3>
              <p className="text-base md:text-lg text-white/70 font-light leading-relaxed">
                We respect your deadlines and moments
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="fade-up text-center">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
            Ready to create something special?
          </h3>
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto font-light">
            Let's design a gift that tells your story — one that feels personal, thoughtful, and unforgettable.
          </p>
          <button className="px-10 py-5 rounded-full text-lg font-medium bg-white text-[#4b2c5e] shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:bg-white/90 hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)] hover:-translate-y-1 active:scale-95 transition-all duration-300">
            Start Your Custom Gift
          </button>
        </div>

      </div>
    </section>
  );
};

export default AboutPage;

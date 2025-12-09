// components/Navigation.tsx
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { List, X, ShoppingCart } from "phosphor-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const logoRef = useRef<HTMLDivElement | null>(null);
  const { cart } = useCart();

  const navItems = [
    { name: "Home", href: "/", isPage: true },
    { name: "About", href: "/About", isPage: true },
    { name: "Shop", href: "/shop", isPage: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      
      // Logo fade on scroll
      if (logoRef.current) {
        const opacity = Math.max(0.3, 1 - y / 300);
        gsap.to(logoRef.current, {
          opacity,
          duration: 0.2,
          overwrite: "auto",
        });
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".mobile-menu",
        { opacity: 0, x: "100%" },
        { opacity: 1, x: "0%", duration: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(
        ".mobile-nav-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.1, delay: 0.2 }
      );
    }
  }, [isOpen]);

  const handleNavClick = (href: string, isPage: boolean) => {
    if (isPage) {
      navigate(href);
    } else {
      const targetId = href.substring(2);
      const selector = `#${targetId}`;

      const scrollToSection = () => {
        const element = document.querySelector(selector);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };

      if (location.pathname === "/") {
        scrollToSection();
      } else {
        navigate("/");
        setTimeout(scrollToSection, 150);
      }
    }
    setIsOpen(false);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Glassmorphism Navbar */}
      <nav
        className={`fixed top-3 left-1/2 -translate-x-1/2 z-[9999] max-w-5xl w-[94%] md:w-[90%] lg:w-[80%] rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-2xl shadow-[0_18px_40px_rgba(15,23,42,0.18)] border border-white/50"
            : "bg-white/70 backdrop-blur-xl shadow-[0_12px_30px_rgba(15,23,42,0.12)] border border-white/40"
        }`}
      >
        <div className="px-4 md:px-6 py-2.5">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center z-10"
            >
              <div ref={logoRef} className="flex items-center">
                <img
                  src="/img/EKAPNGLOGO.png"
                  alt="EKA logo"
                  className="h-10 md:h-14 w-auto transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </Link>

            {/* Desktop Menu - Centered */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 z-10">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative text-xs md:text-sm font-medium uppercase tracking-[0.16em] transition-all duration-300 group ${
                    location.pathname === item.href
                      ? "text-[#d4a017]"
                      : "text-slate-600 hover:text-[#d4a017]"
                  }`}
                >
                  <span>{item.name}</span>
                  <div
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-[#d4a017] transition-all duration-300 ${
                      location.pathname === item.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Cart Icon Desktop */}
            <Link
              to="/cart"
              className="hidden md:flex relative p-2.5 rounded-xl bg-gradient-to-br from-[#4b2c5e] to-[#6b4e7d] hover:from-[#5b3772] hover:to-[#7b5e8d] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 z-10"
            >
              <ShoppingCart size={20} className="text-white" weight="bold" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ffd27a] text-[#4b2c5e] text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Buttons */}
            <div className="flex md:hidden items-center gap-3">
              {/* Cart Icon Mobile */}
              <Link
                to="/cart"
                className="relative p-2 rounded-xl bg-gradient-to-br from-[#4b2c5e] to-[#6b4e7d] shadow-lg"
              >
                <ShoppingCart size={18} className="text-white" weight="bold" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ffd27a] text-[#4b2c5e] text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-9 h-9 rounded-xl bg-white/90 border border-white/70 flex items-center justify-center shadow-sm hover:bg-[#4b2c5e] hover:border-[#4b2c5e] transition-all duration-300 group"
              >
                <List size={20} className="text-[#4b2c5e] group-hover:text-white transition-colors" weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[10000] md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="mobile-menu absolute right-0 top-0 h-full w-72 max-w-full bg-white/98 backdrop-blur-xl border-l border-[#ffd27a]/30 shadow-2xl">
            <div className="p-6 border-b border-[#ffd27a]/20 flex justify-between items-center">
              <span className="text-slate-900 font-bold text-lg tracking-wide">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-[#4b2c5e]/10 flex items-center justify-center hover:bg-[#4b2c5e] transition-all duration-300 group"
              >
                <X size={16} className="text-[#4b2c5e] group-hover:text-white transition-colors" weight="bold" />
              </button>
            </div>

            <nav className="p-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`mobile-nav-item block py-3 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 ${
                    location.pathname === item.href
                      ? "bg-gradient-to-r from-[#4b2c5e] to-[#6b4e7d] text-white shadow-lg"
                      : "text-slate-700 hover:bg-[#ffd27a]/20 hover:text-[#4b2c5e]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Cart in Mobile Menu */}
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className={`mobile-nav-item flex items-center justify-between py-3 px-4 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 ${
                  location.pathname === "/cart"
                    ? "bg-gradient-to-r from-[#4b2c5e] to-[#6b4e7d] text-white shadow-lg"
                    : "text-slate-700 hover:bg-[#ffd27a]/20 hover:text-[#4b2c5e]"
                }`}
              >
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="w-6 h-6 bg-[#ffd27a] text-[#4b2c5e] text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#ffd27a]/20">
              <div className="text-center">
                <p className="text-xs text-slate-400 font-light">Made with care at EKA</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;

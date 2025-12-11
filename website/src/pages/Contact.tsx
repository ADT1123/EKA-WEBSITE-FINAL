// pages/Contact.tsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  EnvelopeSimple, 
  Phone, 
  MapPin, 
  InstagramLogo, 
  FacebookLogo, 
  LinkedinLogo,
  PaperPlaneTilt,
  CheckCircle,
  WarningCircle
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoCardsRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      // Info cards animation
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

      // Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setErrorMessage('');

    // Simulate API call (replace with your actual backend endpoint)
    try {
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      setFormStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

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
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b2c5e] to-[#8b5a8e]">Touch</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-600 leading-relaxed">
            Have a question or need a custom gift? We'd love to hear from you. 
            Reach out and let's create something special together.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div ref={infoCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {/* Email Card */}
          <div className="contact-info-card group relative rounded-2xl border border-[#ffd27a]/30 bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition-all duration-500">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-[#ffd27a]/20 to-[#f3c566]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <EnvelopeSimple size={32} weight="bold" className="text-[#d4a017]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Email Us</h3>
              <a 
                href="mailto:hello@ekagifts.com" 
                className="text-sm md:text-base text-slate-600 hover:text-[#4b2c5e] transition-colors"
              >
                hello@ekagifts.com
              </a>
              <a 
                href="mailto:support@ekagifts.com" 
                className="text-sm md:text-base text-slate-600 hover:text-[#4b2c5e] transition-colors"
              >
                support@ekagifts.com
              </a>
            </div>
          </div>

          {/* Phone Card */}
          <div className="contact-info-card group relative rounded-2xl border border-[#ffd27a]/30 bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition-all duration-500">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-[#ffd27a]/20 to-[#f3c566]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Phone size={32} weight="bold" className="text-[#d4a017]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Call Us</h3>
              <a 
                href="tel:+919876543210" 
                className="text-sm md:text-base text-slate-600 hover:text-[#4b2c5e] transition-colors"
              >
                +91 98765 43210
              </a>
              <p className="text-xs md:text-sm text-slate-500 mt-2">Mon-Sat, 9AM-7PM IST</p>
            </div>
          </div>

          {/* Location Card */}
          <div className="contact-info-card group relative rounded-2xl border border-[#ffd27a]/30 bg-white/90 backdrop-blur-sm p-6 md:p-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition-all duration-500">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-[#ffd27a]/20 to-[#f3c566]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MapPin size={32} weight="bold" className="text-[#d4a017]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Visit Us</h3>
              <p className="text-sm md:text-base text-slate-600">
                Mumbai, Maharashtra<br />India
              </p>
            </div>
          </div>
        </div>

        {/* Form + Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <div ref={formRef} className="relative">
            <div className="rounded-3xl border border-[#ffd27a]/40 bg-white/95 backdrop-blur-sm p-6 md:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Send us a message</h2>
              <p className="text-sm md:text-base text-slate-600 mb-6 md:mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffd27a] focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffd27a] focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffd27a] focus:border-transparent transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffd27a] focus:border-transparent transition-all"
                    placeholder="Custom Gift Inquiry"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffd27a] focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your gifting needs..."
                  />
                </div>

                {/* Status Messages */}
                {formStatus === 'success' && (
                  <div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <CheckCircle size={24} weight="bold" className="text-emerald-600 flex-shrink-0" />
                    <p className="text-sm text-emerald-800">
                      Thank you! Your message has been sent successfully.
                    </p>
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-200">
                    <WarningCircle size={24} weight="bold" className="text-red-600 flex-shrink-0" />
                    <p className="text-sm text-red-800">
                      {errorMessage || 'Something went wrong. Please try again.'}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full px-6 py-3.5 rounded-full text-base font-semibold bg-[#4b2c5e] text-white shadow-[0_12px_30px_rgba(75,44,94,0.4)] hover:bg-[#5b3772] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {formStatus === 'loading' ? (
                    <>
                      <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <PaperPlaneTilt size={20} weight="bold" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Map + Social */}
          <div className="space-y-8">
            {/* Map Placeholder */}
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

            {/* Social Links */}
            <div className="rounded-3xl border border-[#ffd27a]/40 bg-white/95 backdrop-blur-sm p-6 md:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">Follow Us</h3>
              <p className="text-sm md:text-base text-slate-600 mb-6">
                Stay connected with us on social media for the latest updates, gift ideas, and special offers.
              </p>

              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 rounded-full bg-gradient-to-br from-[#ffd27a]/20 to-[#f3c566]/20 flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                  aria-label="Instagram"
                >
                  <InstagramLogo size={24} weight="bold" className="text-[#d4a017]" />
                </a>

                <a
                  href="https://facebook.com"
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
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">Business Hours</h3>
              <div className="space-y-2 text-sm md:text-base">
                <div className="flex justify-between">
                  <span className="text-slate-600">Monday - Friday</span>
                  <span className="font-medium text-slate-900">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Saturday</span>
                  <span className="font-medium text-slate-900">10:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Sunday</span>
                  <span className="font-medium text-slate-900">Closed</span>
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

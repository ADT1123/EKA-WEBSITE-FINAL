// components/Portfolio.tsx
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Preloader from './Preloader';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Timeline from './Timeline'; // ← Fixed import path
import Contact from './Contact';
import Footer from './Footer';
import LogoLoop from './LogoLoop';

const Portfolio = () => {
  const [loading, setLoading] = useState(true);

  // Partner logos data
  const partnerLogos = [
    {
      src: '/logo-Photoroom.png',
      alt: 'Team UAS NMIMS',
      href: '#'
    },
    {
            src: '/logo-Photoroom.png',
      title: 'NMIMS University'
    },
    {
      src: '/logo-Photoroom.png',
      title: 'AUVSI Competition'
    },
    {
      src: '/logo-Photoroom.png',
      title: 'DRDO Partner'
    },
    {
      src: '/logo-Photoroom.png',
      title: 'IEEE'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.main-content', { opacity: 0, scale: 1.1 });
    });
    return () => ctx.revert();
  }, []);

  const handlePreloaderComplete = () => {
    setLoading(false);
    gsap.to('.main-content', {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
      delay: 0.2
    });
  };

  return (
    <div className="relative">
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      
      <div className="main-content">
        <Navigation />
        
        <main>
          <section id="home">
            <Hero />
          </section>
          
          <section id="about">
            <About />
          </section>

          <section id="Timeline">
            <Timeline />
          </section>
          
          
        </main>
        <div className="bg-[#fdf9ff]">
        <Footer />
        </div>

      </div>
    </div>
  );
};

export default Portfolio;

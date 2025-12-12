// pages/About.tsx
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-28 pb-24 max-w-4xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Content */}
        <div className="space-y-20 md:space-y-28">
          {/* Introduction */}
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8">
              At Eka Gifts, we believe that a gift is more than just a product - it is an{' '}
              <span className="font-semibold text-[#4b2c5e]">emotion, a memory, and a personal expression of love</span>.
            </p>
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
              We specialise in creating <span className="font-semibold text-[#4b2c5e]">customised, hand-crafted, premium gifting experiences</span> 
              for individuals, celebrations, and businesses across India.
            </p>
          </div>

          {/* Journey */}
          <div className="text-center max-w-xl mx-auto">
            <div className="bg-gradient-to-br from-[#fdf9ff] to-white rounded-2xl p-8 md:p-12 border border-[#ffd27a]/20">
              <h3 className="text-2xl md:text-3xl font-black text-[#4b2c5e] mb-4">Our journey started with a simple idea:</h3>
              <p className="text-xl text-slate-600 font-medium italic border-l-4 border-[#ffd27a]/40 pl-4">
                to make gifting thoughtful, meaningful, and truly personal.
              </p>
            </div>
          </div>

          {/* Offerings */}
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 text-center mb-12">Today, Eka Gifts is known for:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Personalized DIY Vision Board Kits",
                "Corporate & Employee Gifting", 
                "Celebration Hampers",
                "Custom Decor & Keepsakes",
                "Festive Gift Sets",
                "Specially Curated Custom Orders"
              ].map((item) => (
                <div key={item} className="p-6 rounded-xl bg-white/50 border border-slate-200/50">
                  <h4 className="text-lg font-semibold text-slate-900">{item}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-6 font-medium">
              Every order is <span className="font-black text-[#4b2c5e]">hand-crafted with precision</span>, 
              quality-checked, packed with love, and shipped with care.
            </p>
            <p className="text-lg md:text-xl text-slate-700">
              We don't just sell gifts — we help create <span className="font-semibold text-[#6b4e7d]">moments that people never forget</span>.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 border border-[#ffd27a]/20 rounded-2xl bg-[#fdf9ff]/50">
              <h4 className="text-2xl font-black text-[#4b2c5e] mb-4 bg-gradient-to-r from-[#4b2c5e] to-[#4b2c5e] bg-clip-text text-transparent">
                Our Vision
              </h4>
              <p className="text-lg text-slate-700 leading-relaxed">
                To become India's most trusted personalized gifting brand where creativity meets emotion.
              </p>
            </div>
            <div className="p-8 border border-[#ffd27a]/20 rounded-2xl bg-[#fdf9ff]/50">
              <h4 className="text-2xl font-black text-[#4b2c5e] mb-4 bg-gradient-to-r from-[#4b2c5e] to-[#4b2c5e] bg-clip-text text-transparent">
                Our Mission
              </h4>
              <p className="text-lg text-slate-700 leading-relaxed">
                To deliver high-quality, beautiful, and thoughtful gifts that transform ordinary moments into extraordinary memories.
              </p>
            </div>
          </div>

          {/* Values */}
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 text-center mb-12">Our Values</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[
                { title: "Authenticity", desc: "Real craftsmanship, real emotions" },
                { title: "Quality First", desc: "Superior materials and detail-oriented finishing" },
                { title: "Customer Delight", desc: "Every customer is family" },
                { title: "Innovation", desc: "Always creating something new" }
              ].map((value) => (
                <div key={value.title} className="p-6 border-l-4 border-[#ffd27a]/40 pl-6 bg-white/50 rounded-xl">
                  <h4 className="text-xl font-semibold text-slate-900 mb-2">{value.title}</h4>
                  <p className="text-slate-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="text-center max-w-lg mx-auto">
            <div className="p-10 md:p-12 border border-[#ffd27a]/30 rounded-2xl bg-[#fdf9ff]/50">
              <h3 className="text-2xl font-black text-[#4b2c5e] mb-6">For collaborations or inquiries</h3>
              <a 
                href="mailto:info.ekagifts@gmail.com"
                className="inline-block text-black"
              >
                info.ekagifts@gmail.com
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;

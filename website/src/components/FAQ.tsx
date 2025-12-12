// pages/FAQPage.tsx
import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const faqs = [
  {
    q: "Do you accept cancellations?",
    a: "No, all orders are final. Once an order is confirmed, it cannot be cancelled.",
  },
  {
    q: "Do you offer refunds?",
    a: "No, we follow a strict no refund policy. Please review your order details carefully before checking out.",
  },
  {
    q: "How long does delivery take?",
    a: "Order processing usually takes 3–5 working days. Delivery timelines after dispatch depend on your pin code and courier partner.",
  },
  {
    q: "Do you ship across India?",
    a: "Yes, we ship pan-India to all states through trusted courier partners.",
  },
  {
    q: "Are products customizable?",
    a: "Yes, most EKA products are customisable. You can share your occasion, preferences, and requirements, and we will suggest suitable options.",
  },
  {
    q: "What if I receive a damaged item?",
    a: "If your order arrives damaged, please email us within 3 days of delivery with clear photos and your order details. Our team will review and assist you with the next steps.",
  },
  {
    q: "How do I contact support?",
    a: "You can reach our support team by emailing info.ekagifts@gmail.com. We aim to respond as quickly as possible during working hours.",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-2xl mx-auto px-4 md:px-1 pt-24 pb-14">
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-xl md:text-2xl font-medium tracking-[0.18em] uppercase text-slate-900 mb-1">
            Frequently Asked Questions
          </h1>
        </div>

        {/* FAQ list with dividers */}
        <div className="border border-slate-200 rounded-2xl bg-white shadow-sm">
          {faqs.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => handleToggle(i)}
                  className="w-full flex items-center justify-between px-4 md:px-5 py-2.5 md:py-3 text-left hover:bg-slate-50/70 transition-colors"
                >
                  <span className="flex-1 text-xs md:text-sm text-slate-800">
                    {item.q}
                  </span>

                  {/* minimal chevron with smooth motion */}
                  <span
                    className={`ml-3 text-slate-500 text-[11px] md:text-xs transform transition-transform duration-200 ease-out ${
                      open ? "rotate-180 scale-110" : "scale-100"
                    }`}
                  >
                    ▼
                  </span>
                </button>

                <div
                  className={`px-4 md:px-5 overflow-hidden transition-all duration-200 ease-out ${
                    open ? "max-h-32 pb-2 md:pb-3" : "max-h-0 pb-0"
                  }`}
                >
                  <p
                    className={`text-[11px] md:text-xs text-slate-600 leading-relaxed transition-opacity duration-200 ${
                      open ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.a}
                  </p>
                </div>

                {/* divider between items */}
                {i !== faqs.length - 1 && (
                  <div className="h-px bg-slate-200 mx-4 md:mx-5" />
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-[11px] md:text-xs text-slate-500 text-center">
          Still need help? Email us at{" "}
          <span className="font-medium">info.ekagifts@gmail.com</span>.
        </p>
      </main>
    </div>
  );
};

export default FAQPage;

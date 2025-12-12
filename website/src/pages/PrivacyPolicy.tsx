// pages/PrivacyPolicy.tsx
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#fdf9ff] text-slate-900 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pt-28 pb-16">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm md:text-base text-slate-600 mb-8">
          This Privacy Policy explains how Eka Gifts (“we”, “us”, or “our”) collects, uses, and protects your personal information when you visit our website or place an order.
        </p>

        {/* 1. Information We Collect */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">
            1. Information We Collect
          </h2>
          <p className="text-sm md:text-base text-slate-600 mb-2">
            We may collect the following types of information when you interact with Eka Gifts:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-slate-600">
            <li>Name, email address, and phone number</li>
            <li>Billing and shipping address</li>
            <li>
              Payment details (card / UPI / wallet) processed securely by third‑party payment gateways
            </li>
            <li>Order history and transaction details</li>
            <li>Device, browser, and usage data for analytics and performance tracking</li>
          </ul>
          <p className="mt-3 text-xs md:text-sm text-slate-500">
            We do not store your full card or UPI credentials on our servers. These are handled directly by trusted payment partners.
          </p>
        </section>

        {/* 2. How We Use Your Information */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">
            2. How We Use Your Information
          </h2>
          <p className="text-sm md:text-base text-slate-600 mb-2">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-slate-600">
            <li>Process, confirm, and deliver your orders</li>
            <li>Provide customer support and respond to queries</li>
            <li>Send order updates, confirmations, and important notifications</li>
            <li>Maintain and improve website performance and user experience</li>
            <li>Detect, prevent, or investigate fraud and unauthorized activities</li>
            <li>Comply with applicable legal, regulatory, or tax obligations</li>
          </ul>
        </section>

        {/* 3. Sharing of Information */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">
            3. Sharing of Information
          </h2>
          <p className="text-sm md:text-base text-slate-600 mb-2">
            We only share your information with third parties when it is necessary for our services or required by law, including:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-slate-600">
            <li>Courier and logistics partners to deliver your orders</li>
            <li>Payment gateway providers to process secure transactions</li>
            <li>Service providers who help us host, maintain, or analyse our website</li>
            <li>Government or legal authorities when required to comply with law</li>
          </ul>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            We do not sell or rent your personal information to any third party.
          </p>
        </section>

        {/* 4. Cookies & Tracking */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">
            4. Cookies & Tracking Technologies
          </h2>
          <p className="text-sm md:text-base text-slate-600 mb-2">
            Our website may use cookies and similar technologies to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-slate-600">
            <li>Remember your preferences and cart items</li>
            <li>Improve page load times and performance</li>
            <li>Understand how visitors use our site for analytics</li>
          </ul>
          <p className="mt-3 text-xs md:text-sm text-slate-500">
            You can manage or disable cookies in your browser settings, but some features of the site may not work properly if cookies are turned off.
          </p>
        </section>

        {/* 5. Security of Your Data */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">
            5. Security of Your Data
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            We use reasonable technical and organisational safeguards to protect your personal information, including secure servers, encryption where appropriate, and limited access only to authorised personnel. However, no method of transmission or storage is completely risk‑free, so absolute security cannot be guaranteed.
          </p>
        </section>

        {/* 6. Your Rights */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">
            6. Your Rights & Choices
          </h2>
          <p className="text-sm md:text-base text-slate-600 mb-2">
            Depending on applicable law, you may have the right to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-slate-600">
            <li>Request access to the personal data we hold about you</li>
            <li>Ask us to update or correct inaccurate information</li>
            <li>Request deletion of your data, where legally allowed</li>
            <li>Opt out of non‑essential marketing emails</li>
          </ul>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            To exercise these rights or raise a privacy concern, you can contact us at:{" "}
            <span className="font-semibold">info.ekagifts@gmail.com</span>.
          </p>
        </section>

        {/* 7. Changes to This Policy */}
        <section className="mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">
            7. Changes to This Policy
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The updated version will be posted on this page with a revised “Last updated” date. We encourage you to review this page periodically.
          </p>
        </section>

        {/* 8. Contact Us */}
        <section>
          <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">
            8. Contact Us
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            If you have any questions about this Privacy Policy or how we handle your data, please contact us at:{" "}
            <span className="font-semibold">info.ekagifts@gmail.com</span>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

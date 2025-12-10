// pages/tnc.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2a1a3d] via-[#3d2952] to-[#1a0f2e]">
      {/* Header/Navbar space */}
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back to Home */}
          <Link 
            to="/" 
            className="inline-flex items-center text-[#ffd27a] hover:text-white mb-8 transition-colors"
          >
            ← Back to Home
          </Link>

          {/* Main Content */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms & Conditions
            </h1>
            <p className="text-gray-300 mb-8">EKA GIFTS</p>

            <div className="space-y-8 text-gray-200 leading-relaxed">
              {/* Introduction */}
              <section>
                <p>
                  By accessing this website and placing an order with Eka Gifts ("we", "us", "our", or "Merchant"), 
                  you ("User", "you", "your") agree to be bound by the following Terms & Conditions. Please read them 
                  carefully before using our platform. If you do not agree, please do not use our website.
                </p>
                <p className="mt-4">
                  We reserve the right to modify these Terms at any time without prior notice. Continued use of the 
                  website after updates constitutes your acceptance of the revised Terms.
                </p>
              </section>

              {/* Eligibility */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Eligibility</h2>
                <p>
                  You confirm that you are legally eligible to enter into a binding contract under Indian law and that 
                  all information provided by you is accurate and truthful.
                </p>
              </section>

              {/* Definitions */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Definitions</h2>
                <ul className="space-y-2 list-disc pl-6">
                  <li><strong className="text-[#ffd27a]">Platform / Website</strong> refers to the official website of Eka Gifts.</li>
                  <li><strong className="text-[#ffd27a]">Transaction</strong> refers to any order placed for products or services.</li>
                  <li><strong className="text-[#ffd27a]">Transaction Amount</strong> refers to the total amount paid by the User.</li>
                  <li><strong className="text-[#ffd27a]">User</strong> refers to any person purchasing from the Platform.</li>
                  <li><strong className="text-[#ffd27a]">Payment Instrument</strong> includes UPI, credit cards, debit cards, 
                    net banking, wallets, or any approved digital payment mode.</li>
                </ul>
              </section>

              {/* Merchant's Rights */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Merchant's Rights</h2>
                <p>We reserve the right to:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Refuse service to anyone for any reason</li>
                  <li>Modify or discontinue any product without notice</li>
                  <li>Collect, store, and use your personal data strictly for order fulfillment and legal purposes</li>
                </ul>
              </section>

              {/* User Responsibilities */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">User Responsibilities</h2>
                <p>You agree to:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Provide complete, accurate, and current personal and payment details</li>
                  <li>Use only authorized payment methods</li>
                  <li>Ensure correct shipping details while placing the order</li>
                  <li>Avoid any misuse of the platform</li>
                </ul>
              </section>

              {/* Prohibited Activities */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Prohibited Activities</h2>
                <p>You agree <strong>not</strong> to:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Engage in fraud, fake orders, chargebacks, or misuse of the platform</li>
                  <li>Copy, resell, or misuse any content of Eka Gifts</li>
                  <li>Harass, defame, threaten, or harm the brand or its team</li>
                  <li>Use bots, scripts, or automated tools</li>
                  <li>Upload harmful software or spam</li>
                </ul>
                <p className="mt-4 font-semibold text-[#ffd27a]">
                  Violation of any of the above may lead to permanent account blocking and legal action.
                </p>
              </section>

              {/* Payment Disclaimer */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Payment Disclaimer</h2>
                <p>
                  All payments on Eka Gifts are processed via secure third-party payment gateways. We are <strong>not 
                  responsible</strong> for:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Bank server issues</li>
                  <li>Payment failures</li>
                  <li>Delayed transactions</li>
                  <li>Unauthorized use of your payment instrument</li>
                </ul>
                <p className="mt-4">
                  You are solely responsible for safeguarding your payment credentials.
                </p>
              </section>

              {/* Refund & Cancellation Policy - STRICT */}
              <section className="border-2 border-[#ffd27a]/50 rounded-xl p-6 bg-[#ffd27a]/5">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Refund & Cancellation Policy <span className="text-[#ffd27a]">(STRICT)</span>
                </h2>
                
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-5 mb-6">
                  <p className="text-white font-bold text-lg mb-2">⚠️ ALL SALES ARE FINAL</p>
                  <p className="text-red-200 font-semibold">
                    NO CANCELLATION • NO REFUND • NO EXCHANGE
                  </p>
                </div>

                <p className="mb-4 font-semibold text-white">
                  Once an order is placed and payment is successfully completed:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  <li><strong className="text-white">No cancellation requests</strong> will be accepted</li>
                  <li><strong className="text-white">No refunds</strong> will be issued</li>
                  <li><strong className="text-white">No replacements or exchanges</strong> will be provided</li>
                  <li><strong className="text-white">No order modifications</strong> will be allowed</li>
                </ul>

                <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                  <p className="font-semibold text-white mb-2">Why This Policy?</p>
                  <p>
                    Since our products are <strong className="text-[#ffd27a]">customized, handmade, and personalized</strong>, 
                    every order is created specifically for the customer and cannot be resold.
                  </p>
                </div>

                <p className="mt-6 text-white font-semibold">
                  By placing an order with Eka Gifts, you clearly understand and agree to this strict no refund and 
                  no cancellation policy.
                </p>
              </section>

              {/* Shipping & Delivery Policy */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Shipping & Delivery Policy</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Delivery timelines shown are estimated and not guaranteed</li>
                  <li>Shipping charges, if applicable, are calculated at checkout</li>
                  <li>Delays due to logistics, weather, strikes, or third-party issues are beyond our control</li>
                </ul>
                <p className="mt-4">
                  If you do not receive your order within <strong className="text-[#ffd27a]">seven days</strong> of the 
                  estimated delivery date, you must contact us immediately at{' '}
                  <a 
                    href="mailto:seller+04e14ce30cb749f9ac14019106423ba2@instamojo.com" 
                    className="text-[#ffd27a] hover:underline break-all"
                  >
                    seller+04e14ce30cb749f9ac14019106423ba2@instamojo.com
                  </a>
                </p>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
                <p>Eka Gifts shall <strong>not</strong> be liable for:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Any indirect, incidental, or consequential damages</li>
                  <li>Delay in delivery due to third-party logistics</li>
                  <li>Misuse of products after delivery</li>
                  <li>Incorrect information provided by the User</li>
                </ul>
                <p className="mt-4 font-semibold text-[#ffd27a]">
                  The maximum liability of Eka Gifts shall never exceed the transaction amount paid by the User.
                </p>
              </section>

              {/* Reviews & Feedback Policy */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Reviews & Feedback Policy</h2>
                <p>Users may post reviews only if they have real experience with Eka Gifts.</p>
                <p className="mt-3">Reviews must <strong>not</strong> be:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Abusive</li>
                  <li>Misleading</li>
                  <li>Fake</li>
                  <li>Promotional in nature</li>
                </ul>
                <p className="mt-4">
                  We reserve full rights to remove any review at our discretion.
                </p>
              </section>

              {/* Governing Law & Dispute Resolution */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Governing Law & Dispute Resolution</h2>
                <p>
                  These Terms shall be governed by the laws of India. Any dispute shall be resolved through arbitration 
                  in Bengaluru as per the Arbitration and Conciliation Act, 1996.
                </p>
                <p className="mt-4">
                  Courts of <strong className="text-[#ffd27a]">Bengaluru, Karnataka</strong> shall have exclusive jurisdiction.
                </p>
              </section>

              {/* Grievance Redressal */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Grievance Redressal</h2>
                <p>
                  For any issues related to orders, payments, or delivery, please contact us at:
                </p>
                <p className="mt-3 bg-white/5 rounded-lg p-4 border border-white/10">
                  <a 
                    href="mailto:seller+04e14ce30cb749f9ac14019106423ba2@instamojo.com" 
                    className="text-[#ffd27a] hover:underline break-all"
                  >
                    seller+04e14ce30cb749f9ac14019106423ba2@instamojo.com
                  </a>
                </p>
              </section>

              {/* Final Disclaimer */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Final Disclaimer</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All purchases are made at the User's sole discretion</li>
                  <li>Product colors may slightly vary due to screen settings</li>
                  <li>Eka Gifts is not responsible for incorrect details entered by the User</li>
                </ul>
                <p className="mt-6 font-semibold text-white text-lg bg-[#ffd27a]/10 border border-[#ffd27a]/30 rounded-lg p-4">
                  By placing an order, you acknowledge that you have read, understood, and agreed to all the above policies.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

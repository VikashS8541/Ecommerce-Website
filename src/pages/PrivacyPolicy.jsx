import React from "react";

const PrivacyPolicy = () => (
  <section className="container py-10">
    <h1 className="text-3xl font-bold heading-color mb-6">Privacy Policy</h1>
    <div className="para space-y-4">
      <p>We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our ecommerce website.</p>
      <h2 className="text-xl font-semibold heading-color mt-6 mb-2">Information We Collect</h2>
      <ul className="list-disc ml-6">
        <li>Personal details (name, email, address, etc.) provided during checkout or account creation.</li>
        <li>Order and payment information for processing your purchases.</li>
        <li>Browsing and usage data to improve your shopping experience.</li>
      </ul>
      <h2 className="text-xl font-semibold heading-color mt-6 mb-2">How We Use Your Information</h2>
      <ul className="list-disc ml-6">
        <li>To process orders and deliver products.</li>
        <li>To communicate order updates and offers.</li>
        <li>To improve our website and services.</li>
      </ul>
      <h2 className="text-xl font-semibold heading-color mt-6 mb-2">Your Rights</h2>
      <ul className="list-disc ml-6">
        <li>You can request access, correction, or deletion of your personal data at any time.</li>
        <li>Contact us for any privacy-related concerns.</li>
      </ul>
      <p>By using our site, you agree to this Privacy Policy. We may update this policy as needed.</p>
    </div>
  </section>
);

export default PrivacyPolicy;

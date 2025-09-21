import React from "react";

const TermsOfUse = () => (
  <section className="container py-10">
    <h1 className="text-3xl font-bold heading-color mb-6">Terms of Use</h1>
    <div className="para space-y-4">
      <p>Welcome to our ecommerce website. By accessing or using our site, you agree to comply with and be bound by these Terms of Use.</p>
      <h2 className="text-xl font-semibold heading-color mt-6 mb-2">Use of Site</h2>
      <ul className="list-disc ml-6">
        <li>You must be at least 18 years old or have parental consent to use this site.</li>
        <li>Do not misuse our services or attempt unauthorized access.</li>
      </ul>
      <h2 className="text-xl font-semibold heading-color mt-6 mb-2">Intellectual Property</h2>
      <ul className="list-disc ml-6">
        <li>All content, images, and trademarks are the property of this site or its licensors.</li>
        <li>Do not copy or distribute content without permission.</li>
      </ul>
      <h2 className="text-xl font-semibold heading-color mt-6 mb-2">Limitation of Liability</h2>
      <ul className="list-disc ml-6">
        <li>We are not liable for any damages arising from your use of the site.</li>
      </ul>
      <p>We may update these terms at any time. Continued use of the site means you accept the changes.</p>
    </div>
  </section>
);

export default TermsOfUse;

import React from "react";

const ShippingPolicy = () => (
  <section className="container py-10">
    <h1 className="text-3xl font-bold heading-color mb-6">Shipping Policy</h1>
    <div className="para space-y-4">
      <p>We offer fast and reliable shipping to your doorstep. Please review our shipping policy below:</p>
      <ul className="list-disc ml-6">
        <li>Orders are processed within 1-2 business days.</li>
        <li>Standard shipping typically takes 3-7 business days.</li>
        <li>Shipping fees are calculated at checkout based on your location and order value.</li>
        <li>Tracking information will be provided once your order ships.</li>
      </ul>
      <p>If you have any questions about shipping, please contact our support team.</p>
    </div>
  </section>
);

export default ShippingPolicy;

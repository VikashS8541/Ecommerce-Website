import React from "react";

const ReturnsExchanges = () => (
  <section className="container py-10">
    <h1 className="text-3xl font-bold heading-color mb-6">Returns & Exchanges</h1>
    <div className="para space-y-4">
      <p>We want you to be completely satisfied with your purchase. If you are not happy with your order, you can return or exchange items under the following conditions:</p>
      <ul className="list-disc ml-6">
        <li>Returns are accepted within 14 days of delivery.</li>
        <li>Items must be unused, in original packaging, and with all tags attached.</li>
        <li>Some items (e.g., personal care, sale items) may not be eligible for return.</li>
      </ul>
      <h2 className="text-xl font-semibold heading-color mt-6 mb-2">How to Return</h2>
      <ul className="list-disc ml-6">
        <li>Contact our support team to initiate a return or exchange.</li>
        <li>Provide your order number and reason for return.</li>
        <li>We will provide instructions for shipping the item back.</li>
      </ul>
      <p>Refunds are processed within 5-7 business days after we receive your return. Shipping fees are non-refundable.</p>
    </div>
  </section>
);

export default ReturnsExchanges;

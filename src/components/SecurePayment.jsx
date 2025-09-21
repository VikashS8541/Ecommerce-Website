import React from "react";
import { Payment, LocalShipping, SupportAgent, CardGiftcard } from "@mui/icons-material";
const SecurePayment = () => {


  const features = [
    {
      icon: <Payment fontSize="large" style={{ color: "white" }} />,
      title: "Secure Payments",
      desc: "Tellus gravida ipsum aut facilisis tempus at et aliquam estsem.",
    },
    {
      icon: <LocalShipping fontSize="large" style={{ color: "white" }} />,
      title: "Free Shipping",
      desc: "Non pulvinar aenean ultrices lectus vitae imperdiet aeu.",
    },
    {
      icon: <SupportAgent fontSize="large" style={{ color: "white" }} />,
      title: "24/7 Support",
      desc: "Nullam iaculis vestibulum arcu id urnain pellentesque quis.",
    },
    {
      icon: <CardGiftcard fontSize="large" style={{ color: "white" }} />,
      title: "Gifts & Sales",
      desc: "Aliquet ullamcorper leo mi vel sit pretium euismod eget libero.",
    },
  ];

  return (
    <section className="secure-payment-section mt-16">
      <div className="container">
        <div className="feature-box bg-[#212529] text-white rounded-2xl p-8 py-12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  gap-8">
          {features.map((item,idx)=>(
            <div key={idx} className="features-boxes flex items-start gap-4">
              <span>{item.icon}</span>
              <div className="features-content">
                <h3 className="text-lg font-normal pb-1">{item.title}</h3>
                <p className="text-sm opacity-80 font-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurePayment;

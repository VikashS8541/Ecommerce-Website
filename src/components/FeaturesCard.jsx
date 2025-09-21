import React from "react";
import { Computer, Diamond, Spa } from "@mui/icons-material";
import featureOne from "../assets/images/FeatureOne.jpg";
import featureTwo from "../assets/images/FeatureTwo.jpg";
import featureThree from "../assets/images/FeatureThree.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Features = () => {
  const features = [
    {
      icon: <Computer fontSize="large" className="text-indigo-600" />,
      title: "Innovative Technology",
      description:
        "We bring you the latest in cutting-edge tech, from smart devices to futuristic gadgets, crafted to make life easier and smarter.",
      image:featureOne,
    },
    {
      icon: <Diamond fontSize="large" className="text-pink-500" />,
      title: "Elegant Jewellery",
      description:
        "From timeless classics to modern designs, our jewellery collection is crafted with precision to reflect beauty and sophistication.",
      image:featureTwo,
    },
    {
      icon: <Spa fontSize="large" className="text-green-500" />,
      title: "Beauty & Wellness",
      description:
        "Discover our beauty and wellness range, made with care to help you shine naturally and feel your absolute best every day.",
        image:featureThree,
    },
  ];

  return (
    <section className="py-12 px-6 lg:px-20">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="overflow-hidden">
                <LazyLoadImage
                  loading="lazy"
                  effect="blur"
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full rounded-2xl object-cover"
                />
              </div>
              <div className="flex flex-col items-center mt-6 space-y-3">
                <div className="bg-gray-100 p-4 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold heading-color">
                  {feature.title}
                </h3>
                <p className="font-normal para">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

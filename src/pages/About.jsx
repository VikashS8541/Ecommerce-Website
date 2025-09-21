import React from "react";
import { Link } from "react-router-dom";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import FeaturesCard from "../components/featuresCard";
import Stats from "../components/Stats";
import TestimonialSlider from "../components/TestimonialSlider";
import SecurePayment from "../components/SecurePayment";
import AccordionBox from "../components/AccordionBox";

const About = () => {
  return (
    <>
      <section className="about-title my-16">
        <div className="container">
          <div className="title-button-container gap-6 md:gap-0 flex-wrap md:flex-nowrap flex items-start justify-between w-full">
            <div className="heading-title max-w-full md:max-w-[480px] lg:max-w-[640px] xl:max-w-4xl">
              <h6 className="heading-color text-md lg:text-lg font-normal mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
                nemo?
              </h6>
              <h1 className="heading-color tex-xl lg:text-2xl font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate, ex commodi molestiae et necessitatibus architecto
                consequatur voluptates iure aperiam atque.
              </h1>
            </div>
            <Link to="/products" className="border transition transition-duration-500 ease hover:bg-orange-500 hover:text-white hover:border-orange py-3 px-4 heading-color rounded-lg">View All Products <span><NorthEastIcon/></span></Link>
          </div>
        </div>
      </section>
      <FeaturesCard/>
      <Stats/>
      <TestimonialSlider/>
      <AccordionBox/>
      <SecurePayment/>
    </>
  );
};

export default About;

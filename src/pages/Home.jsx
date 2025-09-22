import React from "react";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import SecurePayment from "../components/SecurePayment";
import voucher from "../assets/images/mega-image.png";
import SendIcon from "@mui/icons-material/Send";
import LogoBox from "../components/LogoBox";
import Fragnance from "../assets/images/fragnance.jpeg";
import Beauty from "../assets/images/Beauty.jpeg";
import Mobile from "../assets/images/mobile-accessories.jpeg";
import { Link } from "react-router-dom";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Home = () => {

  // Notification state for feedback
  const [notification, setNotification] = useState("");
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 1500);
  };

  // React Hook Form for voucher
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const onVoucherSubmit = (data) => {
    showNotification("Thank you for subscribing!");
    reset();
  };

  return (
    <>
      <section className="home-banner  relative min-h-[500px] md:min-h-[700px] 2xl-min-h-[900px] w-full flex items-center justify-start">
        <div className="container">
          <div className="content-box max-w-[750px]">
            <h1 className=" text-4xl md:text-7xl xxl:text-8xl font-semibold text-white">
              Everything You Need, All in One Place
            </h1>
            <p className=" para text-lg italic">
              From fashion to gadgets, home essentials to beauty – explore
              endless choices designed to make your life easier.
            </p>
            <Link to="/products" className="mt-4 explore-btn light-btn flex">
              <span className="mt-[2px]">Explore Collection</span>
              <ArrowOutwardOutlinedIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="discount-offers mt-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto w-full">
            {/* Big Left Image */}
            <div className="big-image-box relative rounded-2xl col-span-1 md:col-span-2 overflow-hidden group">
              <LazyLoadImage
                loading="lazy"
                effect="blur"
                src={Fragnance}
                alt="Fragnance"
                className="rounded-2xl w-full h-[250px] md:h-full lg:h-full object-cover 
          transition duration-400 ease transform group-hover:scale-110 z-0"
              />
              <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 text-white z-10">
                <h3
                  className="text-lg sm:text-2xl md:text-xl lg:text-4xl xl:text-5xl md:mb-3 font-semibold uppercase"
                  style={{ lineHeight: "1.2" }}
                >
                  New Top Fragnance Collection
                </h3>
                <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-1">
                  20{" "}
                  <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl">
                    %
                  </span>{" "}
                  OFF
                </p>
                <Link
                  to="/products?category=fragrances"
                  className="mt-3 px-4 sm:px-5 py-2 sm:py-3 w-max bg-white text-black font-semibold rounded-lg flex items-center gap-2"
                >
                  View Offer
                  <span className="mt-[-2px]">
                    <NorthEastIcon style={{ fontSize: "10px" }} />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Side Small Boxes */}
            <div className="flex flex-col gap-6 w-full">
              {/* Beauty Collection */}
              <div className="rounded-2xl w-full flex items-center relative overflow-hidden group">
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-10">
                  <h3 className="text-md md:text-xs lg:text-lg font-semibold uppercase text-gray-800">
                    New Beauty Collection
                  </h3>
                  <p className="text-md mb-2 md:text-xs mt-1 font-bold text-gray-900">
                    10 <span className="text-sm">%</span> OFF
                  </p>
                  <Link
                    to="/products?category=beauty"
                    className="mt-1 px-4 text-md md:text-xs lg:text-lg sm:px-5 py-2 sm:py-3 w-max border border-gray-300 rounded-lg bg-white text-black font-medium flex items-center gap-2"
                  >
                    View Offer
                    <span className="mt-[-2px]">
                      <NorthEastIcon style={{ fontSize: "10px" }} />
                    </span>
                  </Link>
                </div>
                <LazyLoadImage
                  loading="lazy"
                  effect="blur"
                  src={Beauty}
                  alt="Beauty"
                  className="rounded-2xl w-full h-full object-cover 
            transition duration-400 ease transform group-hover:scale-110 z-0"
                />
              </div>

              {/* Mobile Collection */}
              <div className="rounded-2xl w-full flex items-center relative overflow-hidden group">
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-10">
                  <h3 className="text-md md:text-xs lg:text-lg font-semibold uppercase text-white">
                    New Mobile Collection
                  </h3>
                  <p className="text-md mb-2 md:text-xs mt-1 font-bold text-white">
                    12 <span className="text-sm">%</span> OFF
                  </p>
                  <Link
                    to="/products?category=Mobile Accessories"
                    className="mt-1 px-4 text-md md:text-xs lg:text-lg sm:px-5 py-2 sm:py-3 w-max border border-gray-300 rounded-lg bg-white text-black font-medium flex items-center gap-2"
                  >
                    View Offer
                    <span className="mt-[-2px]">
                      <NorthEastIcon style={{ fontSize: "10px" }} />
                    </span>
                  </Link>
                </div>
                <LazyLoadImage
                  loading="lazy"
                  effect="blur"
                  src={Mobile}
                  alt="Mobile"
                  className="rounded-2xl w-full h-full object-cover 
            transition duration-400 ease transform group-hover:scale-110 z-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <LogoBox />

      <section className="features-products mt-16">
        <div className="container">
          <div className="features-title-all-products flex items-center justify-between">
            <h2 className="heading-color text-2xl md:text-4xl font-semibold">
              Featured Products
            </h2>
            <Link
              to="/products"
              className="border py-3 xs:text-xs flex md:gap-2 px-4 heading-color transition transition-duration-500 ease hover:bg-orange-500 hover:text-white hover:border-orange rounded-lg"
            >
              View All Products{" "}
              <span>
                <NorthEastIcon />
              </span>
            </Link>
          </div>

          <div className="features-product-container">
            <ProductCard showNotification={showNotification} />
            {notification && (
              <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-6 py-2 rounded shadow-lg z-[9999] transition-all">
                {notification}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="voucher-box mt-16">
        <div className="container">
          <div className="voucher-box-content bg-[#ffebbe] flex-wrap md:flex-nowrap p-6  md:p-10 lg:px-[200px] rounded-3xl  flex item-start justify-between gap-10">
            <div className="voucher-box-content-left w-full">
              <LazyLoadImage
                loading="lazy"
                effect="blur"
                className="h-full md:h-[400px] w-full rounded-3xl"
                src={voucher}
                alt="voucher"
              />
            </div>
            <div className="voucher-box-content-right flex w-full flex-col item-center justify-center">
              <h2 className="text-4xl heading-color font-semibold">
                Get Voucher
              </h2>
              <p className="text-md mt-4 heading-color">
                Subscribe Today and Unlock Up to{" "}
                <span className="font-bold italic text-2xl"> 70% OFF </span>{" "}
                Your Next Purchase!
              </p>
              <form onSubmit={handleSubmit(onVoucherSubmit)} className="gap-6 md:gap-0 flex-wrap md:flex-nowrap flex item-center justify-start border mt-6">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow rounded-l-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address"
                    }
                  })}
                  disabled={isSubmitting}
                />
                <button type="submit" disabled={isSubmitting} className="flex items-center text-center justify-center gap-2 bg-gray-900 text-white px-5 py-3 font-semibold w-full md:w-auto xs:rounded-lg md:rounded-r-lg hover:bg-gray-800 transition">
                  <SendIcon fontSize="small" />
                  {isSubmitting ? "Submitting..." : "Subscribe"}
                </button>
              </form>
              {errors.email && (
                <span className="text-red-500 text-sm mt-2 block">{errors.email.message}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <SecurePayment />
    </>
  );
};

export default Home;

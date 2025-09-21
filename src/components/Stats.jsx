import React from "react";
import CountUp from "react-countup";
import model from "../assets/images/model.jpg";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Stats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // only once
    threshold: 0.5, // trigger when 50% visible
  });

  return (
    <section className="stats-section my-16 relative">
      <div className="container">
        <div className="counter-content-container flex-wrap md:flex-nowrap flex item-start justify-center gap-16">
          <div className="image-box w-full h-auto md:w-1/3 rounded-xl">
            <LazyLoadImage
              loading="lazy"
              className="h-full rounded-xl w-full"
              src={model}
              effect="blur" 
              alt="stats-images"
            />
          </div>
          <div className="content-box w-full md:w-1/2 mt-0 lg:mt-16 flex flex-col gap-6 md:gap-10">
            <h2 className="text-4xl font-semibold heading-color">
              Your Deserve The Best
            </h2>
            <p className="para font-normal">
              Our story started with a simple dream: to create a space where
              parents could find clothes that kids love to wear and are built to
              withstand all their adventures.
            </p>
            <div className="counter-box">
              <div className="row flex item-start justify-start gap-10">
                  <div ref={ref} className="text-center md:w-[100px] space-y-3">
                    <h2 className="text-5xl font-semibold heading-color">
                      {inView ? (
                        <CountUp
                          end={12}
                          duration={4}
                          easingFn={(t, b, c, d) => {
                            t /= d;
                            return c * (--t * t * t + 1) + b;
                          }}
                        />
                      ) : (
                        0
                      )}
                      +
                    </h2>
                    <p className="para text-xl font-normal">Years</p>
                  </div>
                  <div ref={ref} className="text-center md:w-[100px] space-y-3">
                    <h2 className="text-5xl font-semibold heading-color">
                      {inView ? (
                        <CountUp
                          end={60}
                          duration={3.5}
                          easingFn={(t, b, c, d) => {
                            t /= d;
                            return c * (--t * t * t + 1) + b;
                          }}
                        />
                      ) : (
                        0
                      )}
                      +
                    </h2>
                    <p className="para text-xl font-normal">Stores</p>
                  </div>
                  <div ref={ref} className="text-center md:w-[100px] space-y-3">
                    <h2 className="text-5xl font-semibold heading-color">
                      {inView ? (
                        <CountUp
                          end={10}
                          duration={4}
                          easingFn={(t, b, c, d) => {
                            t /= d;
                            return c * (--t * t * t + 1) + b;
                          }}
                        />
                      ) : (
                        0
                      )}
                      +
                    </h2>
                    <p className="para text-xl font-normal">Countries</p>
                  </div>
                </div>
            </div>
            <div className="mt-6 link-box">
              <Link to="/products"
              className="border transition transition-duration-500 ease hover:bg-orange-500 hover:text-white hover:border-orange py-3 px-4 heading-color rounded-lg bg-gray-900 text-white"
            >
              Explore Our Collection
              <NorthEastIcon className="ml-2" style={{ fontSize: "20px" }} />
            </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;

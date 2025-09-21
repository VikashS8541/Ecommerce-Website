import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Samatha Jackson",
    role: "Client",
    text: "My little ones are so picky, but they love the fun designs and bright colors. And as a mom, I love that the clothes are both stylish and sturdy!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Carter",
    role: "Customer",
    text: "The tech gadgets I bought here are amazing. High-quality and affordable. Totally recommend this store!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sophia Brown",
    role: "Designer",
    text: "I adore the jewelry collection. It’s elegant and adds the perfect touch to any outfit!",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const TestimonialSlider = () => {
  return (
    <section className="testimonial my-16 relative">
      <div className="container">
        <div className="carousel-box rounded-2xl py-8 border shadow-md bg-white p-8">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop
            className=" mx-auto swiper-box"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col items-center text-center space-y-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-16 h-16 rounded-full border-2 border-gray-200"
                  />
                  <p className="text-lg para italic md:max-w-4xl">“{t.text}”</p>
                  <h4 className="font-bold heading-color">{t.name}</h4>
                  <span className="text-sm para">{t.role}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;

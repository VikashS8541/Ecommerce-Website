import React from "react";
import { useForm } from "react-hook-form";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SecurePayment from "../components/SecurePayment";
import { Link } from "react-router-dom";
const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Here you would typically send the data to your backend
    alert("Message sent successfully!");
    reset();
  };

  return (
    <>
      <section className="min-h-screen contact-form-page my-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold heading-color mb-4">
              Have Questions?
            </h1>
            <h2 className="text-3xl font-semibold heading-color mb-6">
              We're Here for You!
            </h2>
            <p className="text-lg para max-w-3xl mx-auto">
              Senectus velit sagittis inceptos fringilla mus mauris convallis
              lobortis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-3 block text-sm font-medium heading-color mb-1"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-1 outline-none box-shadow-none focus:ring-orange-500 focus:border-orange-500 transition duration-200 ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-3 block text-sm font-medium heading-color mb-1"
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-1 outline-none box-shadow-none focus:ring-orange-500 focus:border-orange-500 transition duration-200 ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm font-medium heading-color mb-1"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-1 outline-none box-shadow-none focus:ring-orange-500 focus:border-orange-500 transition duration-200 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-3 block text-sm font-medium heading-color mb-1"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Subject"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-1 outline-none box-shadow-none focus:ring-orange-500 focus:border-orange-500 transition duration-200 ${
                      errors.subject ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-3 block text-sm font-medium heading-color mb-1"
                  >
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Your Message"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-1 outline-none box-shadow-none focus:ring-orange-500 focus:border-orange-500 transition duration-200 ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("message", {
                      required: "Message is required",
                    })}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#212529] text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-500 transition duration-200 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h3 className="text-xl font-semibold heading-color mb-6">
                  Contact Information
                </h3>

                <div className="flex flex-col gap-6">
                  <div className="flex items-start">
                    <div className="bg-white shadow-lg p-3 rounded-full mr-4">
                      <LocationOnIcon className="heading-color" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h4 className="font-medium heading-color mb-1">
                        Address
                      </h4>
                      <p className="para">
                        8460 Rockville Ave.
                        <br />
                        Greenville, NC 27834
                      </p>
                      <Link to="#" className=" border py-3 px-4 heading-color transition transition-duration-500 ease hover:bg-orange-500 hover:text-white hover:border-orange rounded-lg">
                        Get Directions
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white shadow-lg p-3 rounded-full mr-4">
                      <PhoneIcon className="heading-color" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h4 className="font-medium heading-color mb-1">
                        Call Us Today
                      </h4>
                      <Link to="tel:+73099321312" className="para block">
                        <span className="heading-color font-semibold">Mobile:</span> +73 099 321 312
                      </Link>
                      <Link to="mailto:onlineshopping@gmail.com" className="para block">
                      <span className="heading-color font-semibold">Email:</span> onlineshopping@gmail.com
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white shadow-lg p-3 rounded-full mr-4">
                      <ScheduleIcon className="heading-color" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h4 className="font-medium heading-color mb-1">
                        Opening Hours
                      </h4>
                      <p className="para"><span className="heading-color font-semibold">Mon-Fri:</span> 08:30 - 20:00</p>
                      <p className="para"><span className="heading-color font-semibold">Sat-Sun:</span> 10:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#212529] rounded-2xl shadow-lg p-6 md:p-8 text-white">
                <h3 className="text-xl font-semibold mb-4">
                  Need Immediate Assistance?
                </h3>
                <p className="mb-6">
                  Our team is available to help you with any questions or
                  concerns you may have.
                </p>
                <Link to="tel:+73099321312" className="bg-white heading-color py-3 px-6 rounded-lg font-medium hover:bg-orange-500 hover:text-white transition duration-200">
                  Call Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SecurePayment />
    </>
  );
};

export default Contact;

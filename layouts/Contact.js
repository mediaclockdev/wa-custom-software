"use client";

import config from "@config/config.json";
import Banner from "./components/Banner";
import { motion } from "framer-motion";
import { AnimatedText } from "./service/AnimatedText";
import { MdLocationOn } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { FaEnvelope, FaMobile, FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import { markdownify } from "@lib/utils/textConverter";
import { useState } from "react";
import * as yup from "yup";
import ButtonLink from "./components/ui/ButtonLink";

const SERVICE_OPTIONS = [
  "Custom Software Development",
  "MVP or Prototype",
  "UI/UX Design",
  "Website Design",
  "Help on Existing Product",
];

const contactSchema = yup.object().shape({
  selectedServices: yup.array().min(1, "Please select at least one service"),
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .matches(/[a-zA-Z]/, "Name must contain at least one letter")
    .matches(
      /^[a-zA-Z]+([\s\-'][a-zA-Z]+)*$/,
      "Name can only contain letters, spaces, hyphens, and apostrophes",
    ),
  companyName: yup.string().trim(),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email address"),
  phone: yup.string().trim(),
  description: yup
    .string()
    .trim()
    .required("Description is required")
    .test(
      "not-only-whitespace",
      "Description is required",
      (val) => val && val.trim().length > 0,
    ),
});

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, banner, services, contact_info } = frontmatter;

  const [formData, setFormData] = useState({
    selectedServices: [],
    name: "",
    companyName: "",
    email: "",
    phone: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value;

    // Email: strip all whitespace (emails never have spaces)
    if (e.target.name === "email") {
      value = value.replace(/\s/g, "");
    } else if (e.target.name === "phone") {
      // Allow only digits, spaces, +, -, and parentheses for phone
      value = value.replace(/[^\d\s+\-()]/g, "");
    } else {
      // Prevent leading whitespace on other fields
      value = value.replace(/^\s+/, "");

      // Collapse multiple consecutive spaces into one (except for description)
      if (e.target.name !== "description") {
        value = value.replace(/\s{2,}/g, " ");
      }
    }

    setFormData({ ...formData, [e.target.name]: value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const toggleService = (service) => {
    setFormData((prev) => {
      const selected = prev.selectedServices.includes(service)
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service];
      return { ...prev, selectedServices: selected };
    });
    if (errors.selectedServices) {
      setErrors((prev) => ({ ...prev, selectedServices: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsSuccess(false);

    try {
      await contactSchema.validate(formData, { abortEarly: false });
      setIsSuccess(true);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const fieldErrors = {};
        err.inner.forEach((error) => {
          if (error.path) {
            fieldErrors[error.path] = error.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };

  const parts = banner?.title?.split(/<\/?br\s*\/?>/i);

  return (
    <section className="section">
      <Banner title={title} />

      <div className="container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold leading-[1.1] text-gray-900 "
          >
            {parts?.map((part, i) => {
              if (i === parts.length - 1) {
                return (
                  <span
                    key={i}
                    className="inline bg-gradient-to-r from-primary to-secondary bg-[length:200%_100%] bg-clip-text text-transparent pb-2"
                  >
                    <AnimatedText text={part} />
                  </span>
                );
              }

              return (
                <span key={i} className="inline">
                  {part}
                </span>
              );
            })}
          </motion.h1>

          <p className="text-gray-600 text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
            {banner?.description?.replace(
              " We work with businesses across Perth and Western Australia.",
              "",
            ) ||
              "Get in touch to discuss your IT, software development, web development, or digital marketing requirements."}
            <br />
            <br />
            {(banner?.description?.includes("We work with businesses") ||
              true) && (
              <span className="font-semibold text-primary">
                We work with businesses across Perth and Western Australia.
              </span>
            )}
          </p>
        </motion.div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          {[
            {
              Icon: MdLocationOn,
              title: "Office Address",
              size: 34,
              link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact_info?.address ? contact_info.address.replace(/<[^>]*>/g, "") : "41 Clearview Avenue, Yokine, Western Australia 6060")}`,
              content: contact_info?.address ? (
                markdownify(contact_info.address, "span")
              ) : (
                <>
                  41 Clearview Avenue <br />
                  Yokine, Western Australia 6060
                </>
              ),
            },
            {
              Icon: FaClock,
              title: "Business Hours",
              size: 28,
              content: contact_info?.business_hours ? (
                markdownify(contact_info.business_hours, "span")
              ) : (
                <>
                  Monday to Friday <br />
                  9:00 – 6:00
                </>
              ),
            },
            {
              Icon: FaPhoneAlt,
              title: "Contact",
              size: 28,
              content: (
                <div className="flex flex-col gap-0 mt-2 relative z-20">
                  {contact_info?.phone && (
                    <a
                      href={`tel:${contact_info.phone}`}
                      className="flex items-start justify-center gap-2 hover:text-primary transition-colors duration-300"
                    >
                      <span className="text-gray-800 break-all">
                        <span className="hidden lg:inline">Phone: </span>
                        {contact_info.phone}
                      </span>
                    </a>
                  )}

                  <a
                    href={`mailto:${contact_info?.email || config.contact_info.email}`}
                    className="flex items-start mt-0.5 justify-center gap-2 hover:text-primary transition-colors duration-300"
                  >
                    <span className="text-gray-800 break-all">
                      <span className="hidden lg:inline">Email: </span>
                      {contact_info?.email || config.contact_info.email}
                    </span>
                  </a>
                </div>
              ),
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group flex flex-col items-center text-center p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 relative ${item.link ? "cursor-pointer" : "cursor-default"}`}
            >
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 rounded-3xl"
                  aria-label={item.title}
                />
              )}
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5 transition-all duration-500  group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-md bg-gradient-to-br group-hover:from-secondary group-hover:to-primary">
                <item.Icon
                  size={item.size}
                  className="text-primary group-hover:text-white transition-colors duration-500"
                />
              </div>
              <h3 className="font-semibold text-2xl mb-3 text-gray-900">
                {item.title}
              </h3>
              <div className="text-gray-800 text-lg leading-relaxed">
                {item.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Section - Stacked and Centered */}
        <div className="max-w-4xl mx-auto flex flex-col gap-8 items-center">
          {/* Top - Services (Centered & Horizontal Flow) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="w-full text-center"
          >
            <h3 className="text-3xl font-bold mb-6">How Can We Help You?</h3>

            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {(services || []).map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    y: -6,
                    scale: 1.05,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 18,
                  }}
                >
                  <Link
                    href={item.link}
                    className="px-6 py-3 rounded-full text-md md:text-lg font-medium 
              bg-white text-primary border border-gray-200 shadow-sm
                hover:shadow-lg hover:border-secondary/50 transition-colors duration-300 cursor-pointer inline-block"
                  >
                    {item.title}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom - Form (Centered) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full relative"
          >
            {/* Background Blob for aesthetic */}
            <div className="lg:absolute -inset-10 bg-gradient-to-r from-primary/10 to-blue-400/10 rounded-[4rem] blur-2xl opacity-60 -z-10"></div>

            <div className="rounded-[2.5rem] bg-white p-4 md:p-14 shadow-[0_20px_60px_rgb(0,0,0,0.06)] border border-gray-100 relative z-10 w-full animate-fade-in-up text-center">
              <h3 className="text-3xl font-bold mb-2">Drop Your Message</h3>
              <p className="text-gray-500 mb-4">
                We usually respond within 24 hours.
              </p>

              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm rounded-[2.5rem]"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-gray-600 mb-6 text-center max-w-sm">
                    Thank you for reaching out. We will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        selectedServices: [],
                        name: "",
                        companyName: "",
                        email: "",
                        phone: "",
                        description: "",
                      });
                    }}
                    className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Service Selection */}
                <div className="space-y-3 text-left w-full">
                  <label className="text-sm font-medium text-gray-700 ml-1">
                    What services do you need?{" "}
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {SERVICE_OPTIONS.map((service) => {
                      const isSelected =
                        formData.selectedServices.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`px-5 py-2.5 rounded-full text-sm md:text-base font-medium border transition-all duration-300 cursor-pointer
                            ${
                              isSelected
                                ? "bg-gradient-to-r from-primary to-secondary text-white border-transparent shadow-md scale-[1.03]"
                                : "bg-white text-gray-700 border-gray-200 hover:border-primary/40 hover:shadow-sm"
                            }`}
                        >
                          {isSelected && <span className="mr-1.5">✓</span>}
                          {service}
                        </button>
                      );
                    })}
                  </div>
                  {errors.selectedServices && (
                    <span className="text-red-500 text-sm mt-1 ml-1 block">
                      {errors.selectedServices}
                    </span>
                  )}
                </div>

                {/* Name + Company Name */}
                <div className="grid md:grid-cols-2 gap-6 w-full">
                  <div className="space-y-2 text-left w-full">
                    <label className="text-sm font-medium text-gray-700 ml-1">
                      Name <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 rounded-xl border ${errors.name ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"} bg-gray-50/50 focus:bg-white focus:ring-2 transition-all outline-none`}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-sm mt-1 ml-1 block">
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 text-left w-full">
                    <label className="text-sm font-medium text-gray-700 ml-1">
                      Company Name
                    </label>
                    <input
                      name="companyName"
                      type="text"
                      placeholder="Your Company"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-primary/20 bg-gray-50/50 focus:bg-white focus:ring-2 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid md:grid-cols-2 gap-6 w-full">
                  <div className="space-y-2 text-left w-full">
                    <label className="text-sm font-medium text-gray-700 ml-1">
                      Email <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 rounded-xl border ${errors.email ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"} bg-gray-50/50 focus:bg-white focus:ring-2 transition-all outline-none`}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm mt-1 ml-1 block">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 text-left w-full">
                    <label className="text-sm font-medium text-gray-700 ml-1">
                      Phone{" "}
                      <span className="text-gray-400 font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+61 4XX XXX XXX"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-primary/20 bg-gray-50/50 focus:bg-white focus:ring-2 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2 text-left w-full">
                  <label className="text-sm font-medium text-gray-700 ml-1">
                    Description{" "}
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <textarea
                    name="description"
                    rows="5"
                    placeholder="Tell us about your project..."
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 rounded-xl border ${errors.description ? "border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-primary focus:ring-primary/20"} bg-gray-50/50 focus:bg-white focus:ring-2 transition-all outline-none resize-none`}
                  />
                  {errors.description && (
                    <span className="text-red-500 text-sm mt-1 ml-1 block">
                      {errors.description}
                    </span>
                  )}
                </div>

                {/* <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] bg-gradient-to-r hover:from-primary hover:to-secondary mt-4"
                >
                  Send Message
                </button> */}
                <ButtonLink title="Send Message" onClick={handleSubmit} />
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

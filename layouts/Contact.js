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

const contactSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z\s\-']+$/, "Name can only contain letters, spaces, hyphens, and apostrophes")
    .required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  subject: yup
    .string()
    .required("Subject is required"),
  message: yup
    .string()
    .required("Message is required"),
});

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, banner, services, contact_info } = frontmatter;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
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
                    className="inline bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_100%] bg-clip-text text-transparent pb-2"
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
            {banner?.description?.replace(" We work with businesses across Perth and Western Australia.", "") || "Get in touch to discuss your IT, software development, web development, or digital marketing requirements."}
            <br />
            <br />
            {(banner?.description?.includes("We work with businesses") || true) && (
              <span className="font-semibold text-primary">We work with businesses across Perth and Western Australia.</span>
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
              content: contact_info?.address ? markdownify(contact_info.address, "span") : (
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
              content: contact_info?.business_hours ? markdownify(contact_info.business_hours, "span") : (
                <>
                  Monday to Friday <br />
                  9:00 AM – 6:00 PM AST
                </>
              ),
            },
            {
              Icon: FaPhoneAlt,
              title: "Contact",
              size: 28,
              content: (
                <div className="flex flex-col gap-2 mt-2 relative z-20">
                  {contact_info?.phone && (
                    <a
                      href={`tel:${contact_info.phone}`}
                      className="flex items-start justify-center gap-2 hover:text-primary transition-colors duration-300"
                    >
                      <FaPhoneAlt className="text-primary text-lg shrink-0 mt-1" />
                      <span className="text-gray-700 break-all">
                        <span className="hidden lg:inline">Phone: </span>
                        {contact_info.phone}
                      </span>
                    </a>
                  )}
                  {contact_info?.mobile && (
                    <a
                      href={`tel:${contact_info.mobile}`}
                      className="flex items-start justify-center gap-2 hover:text-primary transition-colors duration-300"
                    >
                      <FaMobile className="text-primary text-lg shrink-0 mt-1" />
                      <span className="text-gray-700 break-all">
                        <span className="hidden lg:inline">Mobile: </span>
                        {contact_info.mobile}
                      </span>
                    </a>
                  )}
                  <a
                    href={`mailto:${contact_info?.email || config.contact_info.email}`}
                    className="flex items-start mt-0.5 justify-center gap-2 hover:text-primary transition-colors duration-300"
                  >
                    <FaEnvelope className="text-primary text-lg shrink-0 mt-1" />
                    <span className="text-gray-700 break-all">
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
                <item.Icon size={item.size} className="text-primary group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="font-semibold text-2xl mb-3 text-gray-900">
                {item.title}
              </h3>
              <div className="text-gray-600 text-lg leading-relaxed">
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
            <h3 className="text-3xl font-bold mb-6">
              How Can We Help You?
            </h3>

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
              <p className="text-gray-500 mb-10">We usually respond within 24 hours.</p>

              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm rounded-[2.5rem]"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h4>
                  <p className="text-gray-600 mb-6 text-center max-w-sm">
                    Thank you for reaching out. We will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
              >
                <div className="grid md:grid-cols-2 gap-6 w-full">
                  <div className="space-y-2 text-left w-full">
                    <label className="text-sm font-medium text-gray-700 ml-1">
                      Full Name <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 rounded-xl border ${errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-primary focus:ring-primary/20'} bg-gray-50/50 focus:bg-white focus:ring-2 transition-all outline-none`}
                    />
                    {errors.name && <span className="text-red-500 text-sm mt-1 ml-1 block">{errors.name}</span>}
                  </div>
                  <div className="space-y-2 text-left w-full">
                    <label className="text-sm font-medium text-gray-700 ml-1">
                      Email Address <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-primary focus:ring-primary/20'} bg-gray-50/50 focus:bg-white focus:ring-2 transition-all outline-none`}
                    />
                    {errors.email && <span className="text-red-500 text-sm mt-1 ml-1 block">{errors.email}</span>}
                  </div>
                </div>

                <div className="space-y-2 text-left w-full">
                  <label className="text-sm font-medium text-gray-700 ml-1">
                    Subject <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 rounded-xl border ${errors.subject ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-primary focus:ring-primary/20'} bg-gray-50/50 focus:bg-white focus:ring-2 transition-all outline-none`}
                  />
                  {errors.subject && <span className="text-red-500 text-sm mt-1 ml-1 block">{errors.subject}</span>}
                </div>

                <div className="space-y-2 text-left w-full">
                  <label className="text-sm font-medium text-gray-700 ml-1">
                    Message <span className="text-red-500 font-bold">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 rounded-xl border ${errors.message ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-primary focus:ring-primary/20'} bg-gray-50/50 focus:bg-white focus:ring-2 transition-all outline-none resize-none`}
                  />
                  {errors.message && <span className="text-red-500 text-sm mt-1 ml-1 block">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98] bg-gradient-to-r hover:from-primary hover:to-blue-600 mt-4"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

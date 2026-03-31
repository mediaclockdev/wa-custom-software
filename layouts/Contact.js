"use client";

import config from "@config/config.json";
import Banner from "./components/Banner";
import { motion } from "framer-motion";
import { AnimatedText } from "./service/AnimatedText";
import { MdLocationOn, MdAccessTime, MdPhone, MdCheckCircle, MdPhoneIphone, MdMail } from "react-icons/md";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, banner, services } = frontmatter;

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

      <div className="container max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl lg:text-6xl font-bold leading-tight text-gray-900 "
          >
            {parts?.map((part, i) => {
              if (i === parts.length - 1) {
                return (
                  <span
                    key={i}
                    className="block bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_100%] bg-clip-text text-transparent pb-2"
                  >
                    <AnimatedText text={part} />
                  </span>
                );
              }

              return (
                <span key={i} className="block">
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
        <div className="grid md:grid-cols-3 gap-8 mb-16 cursor-default">
          {[
            {
              Icon: MdLocationOn,
              title: "Office Address",
              content: (
                <>
                  41 Clearview Avenue <br />
                  Yokine, Western Australia 6060
                </>
              ),
            },
            {
              Icon: MdAccessTime,
              title: "Business Hours",
              content: (
                <>
                  Monday to Friday <br />
                  9:00 AM – 6:00 PM AST
                </>
              ),
            },
            {
              Icon: MdPhone,
              title: "Contact",
              content: (
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex items-center justify-center gap-2"><MdPhone className="text-primary" /> <span className="text-gray-700">Phone: TBC</span></div>
                  <div className="flex items-center justify-center gap-2"><MdPhoneIphone className="text-primary" /> <span className="text-gray-700">Mobile: TBC</span></div>
                  <div className="flex items-center justify-center gap-2"><MdMail className="text-primary" /> <span className="text-gray-700">Email: TBC</span></div>
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
              className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5 transition-all duration-500  group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-md bg-gradient-to-br group-hover:from-secondary group-hover:to-primary">
                <item.Icon size={32} className="text-primary group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="font-semibold text-2xl mb-3 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Main Section - Stacked and Centered */}
        <div className="max-w-4xl mx-auto flex flex-col gap-16 items-center">

          {/* Top - Services (Centered & Horizontal Flow) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="w-full text-center"
          >
            <h3 className="text-3xl font-bold mb-8">
              How Can We Help You?
            </h3>

            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {(services || []).map((item, i) => (
                <motion.div
                  key={i}
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
                  <Link href={item.link || "/"} className="px-6 py-3 rounded-full text-sm md:text-base font-medium bg-white text-primary border border-gray-200 shadow-sm hover:shadow-lg hover:border-secondary/50 transition-colors duration-300 cursor-pointer inline-block">
                    {item.title || item}
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
            <div className="absolute -inset-10 bg-gradient-to-r from-primary/10 to-blue-400/10 rounded-[4rem] blur-2xl opacity-60 -z-10"></div>

            <div className="rounded-[2.5rem] bg-white p-4 md:p-14 shadow-[0_20px_60px_rgb(0,0,0,0.06)] border border-gray-100 relative z-10 w-full animate-fade-in-up text-center">
              <h3 className="text-3xl font-bold mb-2">Drop Your Message</h3>
              <p className="text-gray-500 mb-10">We usually respond within 24 hours.</p>

              <form
                method="POST"
                action={config.params.contact_form_action}
                className="space-y-6"
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
                      required
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2 text-left w-full">
                    <label className="text-sm font-medium text-gray-700 ml-1">
                      Email Address <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
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
                    required
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  />
                </div>

                <div className="space-y-2 text-left w-full">
                  <label className="text-sm font-medium text-gray-700 ml-1">
                    Message <span className="text-red-500 font-bold">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Tell us about your project..."
                    required
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                  />
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

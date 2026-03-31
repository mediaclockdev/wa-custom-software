"use client";

import Social from "@components/Social";
import config from "@config/config.json";
import Logo from "@layouts/components/Logo";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { motion } from "framer-motion";
import menu from "@config/menu.json";
import social from "@config/social.json";

// Import icons
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const Footer = () => {
  const { copyright, footer_content } = config.params;
  const { email, phone, location } = config.contact_info;
  const { quick_links } = menu.footer;

  const servicesData = menu.main.find((item) => item.name === "Services");

  const featuredServices = [
    "/mobile-app-development",
    "/web-development",
    "/web-design",
    "/digital-marketing",
    "/custom-software-development",
  ];

  const services =
    servicesData?.groups
      ?.flatMap((group) => group.items)
      .filter((item) => featuredServices.includes(item.url)) || [];

  return (
    <footer className="relative bg-gradient-to-b bg-white ">
      {/* top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10 py-4 lg:py-10">

          {/* About + Social */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            className=""
          >
            <Logo />

            <div className="mt-5 text-base leading-relaxed  max-w-[90%] md:max-w-full">
              {markdownify(footer_content)}
            </div>

            <div className="mt-6">
              <Social
                source={config.social || []}
                className="flex gap-4 text-xl  hover:[&>*]:text-primary transition-all"
              />
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className=""
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-3 lg:mb-6">
              Quick Links
            </h3>

            <ul className="space-y-2 lg:space-y-4">
              {quick_links.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.url}
                    className="group relative inline-block text-base  hover:text-primary transition duration-300"
                  >
                    {item.name}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
            className=""
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-3 lg:mb-6">
              Services
            </h3>

            <ul className="space-y-2 lg:space-y-4">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.url}
                    className="group relative inline-block text-base hover:text-primary transition duration-300"
                  >
                    {item.name}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Get in Touch (Connect + Contact) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={3}
            className=""
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-3 lg:mb-6">
              Get in Touch
            </h3>

            <ul className="flex flex-col gap-4 text-base ">
              {/* Address */}
              <li className="flex items-start gap-3">
                <div className="mt-1 text-primary">
                  <FaMapMarkerAlt size={16} />
                </div>
                <div className="leading-relaxed">
                  {markdownify(location)}
                </div>
              </li>

              {/* Phone */}
              {phone && (
                <li className="flex items-center gap-3">
                  <div className="text-primary">
                    <FaPhoneAlt size={16} />
                  </div>
                  <Link
                    href={`tel:${phone.replace(/\\s+/g, "")}`}
                    className="hover:text-primary transition duration-300"
                  >
                    {phone}
                  </Link>
                </li>
              )}

              {/* Email */}
              {email && (
                <li className="flex items-center gap-3">
                  <div className="text-primary">
                    <FaEnvelope size={16} />
                  </div>
                  <Link
                    href={`mailto:${email}`}
                    className="hover:text-primary transition duration-300"
                  >
                    {email}
                  </Link>
                </li>
              )}
            </ul>

            <div className="mt-6">
              <Social
                source={social}
                className="flex items-center justify-start gap-4 text-2xl  hover:[&>*]:text-primary transition-all duration-300"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 py-4 text-base ">
          {markdownify(copyright)}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

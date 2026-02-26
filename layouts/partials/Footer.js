"use client";

import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import Logo from "@layouts/components/Logo";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { motion } from "framer-motion";

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

  return (
    <footer className="relative bg-gradient-to-b bg-white text-gray-700">
      {/* subtle top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-10">
          {/* About */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
          >
            <Logo />
            <div className="mt-5 text-sm leading-relaxed text-gray-600 max-w-[90%]">
              {markdownify(footer_content)}
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Connect
            </h3>

            {email && (
              <Link
                href={`mailto:${email}`}
                className="block text-sm text-gray-600 hover:text-primary transition duration-300"
              >
                {email}
              </Link>
            )}

            <div className="mt-6">
              <Social
                source={social}
                className="flex gap-4 text-xl text-gray-500 hover:[&>*]:text-primary transition-all"
              />
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {menu.footer.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.url}
                    className="group relative inline-block text-sm text-gray-600 transition duration-300 hover:text-primary"
                  >
                    {item.name}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={3}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Contact
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>{markdownify(location)}</li>

              {phone && (
                <li>
                  <Link
                    href={`tel:${phone}`}
                    className="hover:text-primary transition duration-300"
                  >
                    {phone}
                  </Link>
                </li>
              )}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
          {markdownify(copyright)}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

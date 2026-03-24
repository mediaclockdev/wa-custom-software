"use client";

import config from "@config/config.json";
import Banner from "./components/Banner";
import { motion } from "framer-motion";
import { AnimatedText } from "./service/AnimatedText";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, banner } = frontmatter;

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

          <p className="text-gray-600 text-lg mt-2 leading-relaxed">
            Get in touch to discuss your IT, software development, web
            development, or digital marketing requirements. We work with
            businesses across Perth and Western Australia.
          </p>
        </motion.div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            {
              title: "Office Address",
              content: (
                <>
                  41 Clearview Avenue <br />
                  Yokine, Western Australia 6060
                </>
              ),
            },
            {
              title: "Business Hours",
              content: (
                <>
                  Monday to Friday <br />
                  9:00 AM – 6:00 PM AST
                </>
              ),
            },
            {
              title: "Contact",
              content: (
                <>
                  Phone: TBC <br />
                  Mobile: TBC <br />
                  Email: TBC
                </>
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
              className="p-6 rounded-2xl bg-white/70 backdrop-blur border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <h3 className="font-semibold text-2xl mb-3 leading-relaxed">
                {item.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Main Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Services */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-semibold mb-5">
              How Can We Help You?
            </h3>

            <ul className="space-y-5">
              {[
                "Website development services",
                "Mobile application development",
                "Business automation solutions",
                "Digital marketing services",
                "Custom IT solutions in Western Australia",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 text-gray-700 text-lg leading-relaxed"
                >
                  {/* Bullet */}
                  <span className="mt-2.5 h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>

                  {/* Text */}
                  <span className="font-medium text-xl">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {" "}
            <div className="rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
              {" "}
              <h3 className="text-3xl font-semibold mb-6">
                {" "}
                Drop Your Message{" "}
              </h3>{" "}
              <form
                method="POST"
                action={config.params.contact_form_action}
                className="space-y-5"
              >
                {" "}
                <div className="grid md:grid-cols-2 gap-5">
                  {" "}
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    required
                    className="input"
                  />{" "}
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    required
                    className="input"
                  />{" "}
                </div>{" "}
                <input
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  required
                  className="input"
                />{" "}
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell us about your project..."
                  required
                  className="input resize-none"
                />{" "}
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium transition hover:opacity-90 active:scale-[0.98]"
                >
                  {" "}
                  Send Message{" "}
                </button>{" "}
              </form>{" "}
            </div>{" "}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

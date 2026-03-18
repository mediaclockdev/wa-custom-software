"use client";

import config from "@config/config.json";
import Banner from "./components/Banner";
import ImageFallback from "./components/ImageFallback";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;

  return (
    <section className="section">
      <Banner title={title} />

      <div className="container ">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Image */}
          <div className="flex justify-center">
            <ImageFallback
              className="max-w-md w-full"
              src="/images/vectors/contact.png"
              width={497}
              height={397}
              alt="Contact illustration"
            />
          </div>

          {/* Contact Form */}
          <div>
            <form
              method="POST"
              action={config.params.contact_form_action}
              className="rounded-2xl bg-white p-8 shadow-lg border border-gray-100"
            >
              <h2 className="text-2xl font-semibold mb-8">
                Let’s Start a Conversation
              </h2>

              {/* Name */}
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                />
              </div>

              {/* Subject */}
              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="Project Inquiry"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                />
              </div>

              {/* Message */}
              <div className="mb-8">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  placeholder="Tell us about your project..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-6 py-3 font-medium text-white transition hover:opacity-90 active:scale-[0.98]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

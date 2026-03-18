import Link from "next/link";
import { markdownify } from "@lib/utils/textConverter";

const NotFound = ({ data }) => {
  const { frontmatter, content } = data;

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-xl">
        {/* Big 404 */}
        <h1 className="text-7xl font-bold text-primary mb-4">404</h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-3">
          {frontmatter.title || "Page Not Found"}
        </h2>

        {/* Description */}
        <div className="text-gray-600 mb-6">
          {markdownify(content, "div", "content")}
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:opacity-90 transition"
          >
            Go Home
          </Link>

          <Link
            href="/contact"
            className="px-6 py-3 rounded-full border border-gray-300 font-medium hover:bg-gray-100 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;

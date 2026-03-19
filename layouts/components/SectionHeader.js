"use client";

import { markdownify } from "@lib/utils/textConverter";

const SectionHeader = ({
  subtitle,
  title,
  description,
  align = "center", // center | left
  className = "",
}) => {
  const alignment = align === "left" ? "text-left" : "text-center mx-auto";

  return (
    <div className={`animate mb-10 max-w-3xl ${alignment} ${className}`}>
      {/* SUBTITLE */}
      {subtitle && (
        <p className="uppercase text-sm tracking-wider text-gray-500">
          {subtitle}
        </p>
      )}

      {/* TITLE */}
      {title &&
        markdownify(
          title,
          "h2",
          `mt-2 text-3xl lg:text-5xl tracking-wide bg-gradient-to-r from-primary via-primary to-secondary/80 bg-clip-text text-transparent pb-2 ${!description && "section-title"}`,
        )}

      {/* DESCRIPTION */}
      {description &&
        markdownify(
          description,
          "p",
          "mt-4 text-base lg:text-lg text-gray-600 section-title",
        )}
    </div>
  );
};

export default SectionHeader;

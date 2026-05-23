"use client";

import { markdownify } from "@lib/utils/textConverter";

const SectionHeader = ({
  title,
  description,
  align = "center", // center | left
  className = "",
  titleClass = "",
}) => {
  const alignment = align === "left" ? "text-left" : "text-center mx-auto";

  return (
    <div className={`animate mb-10 max-w-3xl ${alignment} ${className}`}>

      {/* TITLE */}
      {title &&
        markdownify(
          title,
          "h2",
          `${titleClass} mt-2 text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent pb-2 ${!description && "section-title"}`,
        )}

      {/* DESCRIPTION */}
      {description &&
        markdownify(
          description,
          "p",
          "mt-1 text-base lg:text-lg text-gray-600 section-title",
        )}
    </div>
  );
};

export default SectionHeader;

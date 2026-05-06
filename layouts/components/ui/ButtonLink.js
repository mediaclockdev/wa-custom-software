"use client";

import Link from "next/link";

const ButtonLink = ({ href = "/", onClick, title = "", animate, icon: Icon, size = 25, frontIcon = false }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative overflow-hidden inline-flex items-center justify-center px-6 py-3 rounded-full bg-secondary text-white text-lg font-medium tracking-wide transition-all duration-300 group ${animate ? "animate-cta-attention" : ""}`}
    >
      {!frontIcon ? (
        <>
          <span>{title}</span>
          {Icon && <Icon className="ml-1.5" size={size} />}
        </>
      ) : (
        <>
          {Icon && <Icon className="mr-1.5" size={size} />}
          <span>{title}</span>
        </>
      )}
      {/* Shine layer */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700"></span>
    </Link>
  );
};

export default ButtonLink;

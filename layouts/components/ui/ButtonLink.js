"use client";
import Link from "next/link";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

const ButtonLink = ({ href = "/", onClick, title = "", animate }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative overflow-hidden px-8 py-3 rounded-full bg-secondary text-white text-base font-medium transition-all duration-300 group ${animate ? "animate-cta-attention" : ""}`}
    >
      {title}
      <FiArrowUpRight className="inline-block ml-2" size={20} />
      {/* Shine layer */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700"></span>
    </Link>
  );
};

export default ButtonLink;

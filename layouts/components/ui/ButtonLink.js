"use client";
import Link from "next/link";
import React from "react";
import { IoIosCall } from "react-icons/io";

const ButtonLink = ({ href = "/", onClick, title = "", animate, icon: Icon , size = 25 }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative overflow-hidden px-6 py-3 rounded-full bg-secondary text-white text-lg font-medium transition-all duration-300 group ${animate ? "animate-cta-attention" : ""}`}
    >
      {title}
      {Icon && <Icon className="inline-block ml-2" size={size} />}
      {/* Shine layer */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700"></span>
    </Link>
  );
};

export default ButtonLink;

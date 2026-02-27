"use client";

import Logo from "@components/Logo";
import config from "@config/config.json";
import menu from "@config/menu.json";
import ButtonLink from "@layouts/components/ui/ButtonLink";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaAngleDown } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  // ✅ ALL HOOKS MUST BE CALLED FIRST
  const [mounted, setMounted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [direction, setDirection] = useState(null);
  const headerRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  const pathname = usePathname();
  const asPath = pathname;

  // mount check (hydration fix)
  useEffect(() => {
    setMounted(true);
  }, []);

  // sticky header
  useEffect(() => {
    if (!mounted) return;

    const header = headerRef.current;
    if (!header) return;

    const headerHeight = header.clientHeight + 200;
    let prevScroll = 0;

    const onScroll = () => {
      const scrollY = window.scrollY;

      setSticky(scrollY > 10);

      if (scrollY > headerHeight) {
        setDirection(prevScroll > scrollY ? -1 : 1);
        prevScroll = scrollY;
      } else {
        setDirection(null);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : "auto";
  }, [showMenu]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ❗ AFTER all hooks are declared, it's safe to conditionally render
  if (!mounted) return null;

  const { main } = menu;
  const { logo } = config.site;

  return (
    <>
      <header
        ref={headerRef}
        className={`my-2 mb-auto container sticky top-2 z-50 transition-all duration-300 ${direction === 1 ? "-translate-y-full" : "translate-y-0"}`}
      >
        <nav className="navbar w-full bg-white py-2 px-4 rounded-full border border-slate-300  relative">
          {/* Logo */}
          <div className="order-0">
            <Logo src={logo} />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-6 order-1 text-black ">
            {main.map((item, i) => {
              const isActive = asPath === item.url;
              const isParentActive = item.children?.some(
                (child) => child.url === asPath,
              );

              return (
                <li key={i} className="relative group">
                  {!item.children && (
                    <Link
                      href={item.url}
                      className={`relative text-base p-2 rounded-full px-4 border border-transparent transition-all duration-300 hover:bg-[#FAF5F3] hover:shadow-sm ${
                        isActive
                          ? "text-primary font-medium bg-[#FAF5F3] border-slate-300"
                          : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                  {/* Dropdown for items with children */}
                  {item.children && (
                    <>
                      <span
                        className={`flex items-center gap-1 text-base cursor-pointer ${isParentActive ? "text-primary bg-[#FAF5F3] font-medium rounded-full px-4 py-2 border border-slate-300" : "text-gray-700 hover:bg-gray-50 rounded-full px-4 py-2 transition-all duration-300"}`}
                      >
                        {item.name}
                        <FaAngleDown className="transition-transform duration-200 group-hover:rotate-180" size={16} />
                      </span>

                      {/* Desktop Dropdown */}
                      <ul className="absolute left-0 top-full mt-4 min-w-[320px] p-3 rounded-xl border border-gray-100 bg-white shadow-xl opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-20">
                        {item.children.map((child, j) => (
                          <li key={j}>
                            <Link
                              href={child.url}
                              className={`block px-4 py-3 text-sm rounded-lg hover:bg-gray-50 transition ${
                                asPath === child.url
                                  ? "text-secondary font-medium"
                                  : "text-gray-700"
                              }`}
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 order-2 ml-6">
            <ButtonLink href="/contact" title="Let's Talk" animate={animate} />
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden ml-auto">
            <button
              className="h-6 w-6 text-xl"
              onClick={() => setShowMenu(!showMenu)}
            >
              {showMenu ? <CgClose /> : <RxHamburgerMenu />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Panel */}
      {showMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowMenu(false)}
          />

          {/* Drawer */}
          <div className="absolute top-0 right-0 h-full w-[85%] max-w-md bg-white shadow-xl p-6 overflow-y-auto  overflow-x-hidden">
            <div className="w-full min-w-0">
              {/* Top Section (CTA + Close) */}
              <div className="flex items-center justify-between mb-6 w-full min-w-0">
                <ButtonLink
                  animate={false}
                  onClick={() => setShowMenu(false)}
                  href="/contact"
                  title="Let's Talk"
                />

                <button
                  className="text-2xl text-primary shrink-0"
                  onClick={() => setShowMenu(false)}
                >
                  <CgClose />
                </button>
              </div>

              {/* Menu List */}
              <ul className="flex flex-col gap-5">
                {main.map((item, i) => (
                  <li key={i}>
                    {!item.children && (
                      <Link
                        href={item.url}
                        onClick={() => setShowMenu(false)}
                        className={`block text-base ${
                          asPath === item.url
                            ? "text-secondary font-semibold"
                            : "text-gray-800"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}

                    {item.children && (
                      <div>
                        <p className="text-base font-semibold mb-2">
                          {item.name}
                        </p>

                        <ul className="pl-4 flex flex-col gap-3 border-l border-gray-200">
                          {item.children.map((child, j) => (
                            <li key={j}>
                              <Link
                                href={child.url}
                                onClick={() => setShowMenu(false)}
                                className={`block text-sm ${
                                  asPath === child.url
                                    ? "text-secondary font-medium"
                                    : "text-gray-600"
                                }`}
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

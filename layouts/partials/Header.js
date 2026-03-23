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
import { IoIosCall } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [direction, setDirection] = useState(null);
  const headerRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  const pathname = usePathname();
  const asPath = pathname;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const header = headerRef.current;
    if (!header) return;

    const headerHeight = header.clientHeight + 200;
    let prevScroll = 0;

    const onScroll = () => {
      const scrollY = window.scrollY;

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

  if (!mounted) return null;

  const { main } = menu;
  const { logo } = config.site;

  return (
    <>
      <header
        ref={headerRef}
        className={`my-2 mb-auto container sticky top-2 z-50 transition-all duration-300`}
      >
        <nav className="navbar w-full bg-white py-2 px-4 rounded-full border border-slate-300  relative">
          <div className="order-0">
            <Logo src={logo} />
          </div>

          <ul className="hidden lg:flex items-center gap-4 order-1 text-black ">
            {main.map((item, i) => {
              const isActive = asPath === item.url;
              const isParentActive = item.groups?.some((group) =>
                group.items.some((child) => child.url === asPath),
              );

              return (
                <li key={i} className="relative group">
                  {!item.groups && (
                    <Link
                      href={item.url}
                      className={`relative text-lg p-2 rounded-full px-4 border transition-all duration-300 hover:bg-[#FAF5F3] hover:shadow-sm font-medium text-slate-800 ${
                        isActive
                          ? "border-slate-300 bg-[#FAF5F3] text-primary"
                          : "border-transparent"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {item.groups && (
                    <>
                      <span
                        className={`flex items-center gap-1 text-lg cursor-pointer ${isParentActive ? "text-primary bg-[#FAF5F3] font-medium rounded-full px-4 py-2 border border-slate-300" : "text-gray-800 hover:bg-gray-50 rounded-full px-4 py-2 transition-all duration-300 text-lg font-medium"}`}
                      >
                        {item.name}
                        <FaAngleDown
                          className="transition-transform duration-200 group-hover:rotate-180"
                          size={16}
                        />
                      </span>

                      <ul className="absolute left-0 top-full mt-4 min-w-[650px] p-5 rounded-xl border border-gray-100 bg-white shadow-xl opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-20">
                        <div className="grid grid-cols-2 gap-6">
                          {item.groups.map((group, gi) => (
                            <div
                              key={gi}
                              className={gi === 2 ? "col-span-2" : ""}
                            >
                              <p className="text-xl font-semibold text-gray-600 mb-3">
                                {group.title}
                              </p>

                              <ul className="space-y-2">
                                {group.items.map((child, j) => (
                                  <li key={j}>
                                    <Link
                                      href={child.url}
                                      className={`block px-2 py-1 text-base font-medium rounded-md hover:bg-gray-50 transition ${
                                        asPath === child.url
                                          ? "text-secondary font-medium"
                                          : "text-gray-800"
                                      }`}
                                    >
                                      {child.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </ul>
                    </>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center gap-3 order-2 ml-6">
            <ButtonLink href="/contact" title="Let's Talk" animate={animate} icon={IoIosCall} />
          </div>

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

      {showMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowMenu(false)}
          />

          <div className="absolute top-0 right-0 h-full w-[85%] max-w-md bg-white shadow-xl p-6 overflow-y-auto  overflow-x-hidden">
            <div className="w-full min-w-0">
              <div className="flex items-center justify-between mb-6 w-full min-w-0">
                <ButtonLink
                  animate={false}
                  onClick={() => setShowMenu(false)}
                  href="/contact"
                  title="Let's Talk"
                  icon={IoIosCall}
                />

                <button
                  className="text-2xl text-primary shrink-0"
                  onClick={() => setShowMenu(false)}
                >
                  <CgClose />
                </button>
              </div>

              <ul className="flex flex-col gap-5">
                {main.map((item, i) => (
                  <li key={i}>
                    {!item.groups && (
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

                    {item.groups && (
                      <div>
                        {item.groups.map((group, gi) => (
                          <div key={gi} className="mb-4">
                            <p className="text-base font-semibold mb-2">
                              {group.title}
                            </p>

                            <ul className="pl-4 flex flex-col gap-2 border-l border-gray-200">
                              {group.items.map((child, j) => (
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
                        ))}
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

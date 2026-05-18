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
  const [openGroup, setOpenGroup] = useState(null);

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
        className={`my-1 mb-auto container sticky top-1 z-50 transition-all duration-300`}
      >
        <nav className="navbar w-full bg-white py-2 px-3 md:px-4 rounded-full border border-slate-300 relative flex flex-nowrap items-center justify-between">
          <div className="order-0 flex-shrink-0">
            <Logo src={logo} className="max-w-[130px] sm:max-w-none !h-auto object-contain" />
          </div>

          <ul className="hidden xl:flex items-center gap-4 order-1 text-black">
            {main.map((item, i) => {
              // Updated logic in Header.js
              const isActive = asPath === item.url || (item.url !== "/" && asPath?.startsWith(`${item.url}/`));
              const isParentActive = item.groups?.some((group) =>
                group.items.some((child) => child.url === asPath || (child.url !== "/" && asPath?.startsWith(`${child.url}/`))),
              );

              return (
                <li key={i} className="relative group">
                  {!item.groups && (
                    <Link
                      href={item.url}
                      className={`relative text-lg p-2 rounded-full px-4 border transition-all duration-300 hover:bg-[#FAF5F3] hover:shadow-sm font-medium text-slate-800 ${isActive
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
                        className={`flex items-center gap-1 text-lg cursor-default ${isParentActive ? "text-primary bg-[#FAF5F3] font-medium rounded-full px-4 py-2 border border-slate-300" : "text-gray-800 hover:bg-gray-50 rounded-full px-4 py-2 transition-all duration-300 text-lg font-medium"}`}
                      >
                        {item.name}
                        <FaAngleDown
                          className="transition-transform duration-200 group-hover:rotate-180"
                          size={16}
                        />
                      </span>

                      <ul className="absolute left-1/2 -translate-x-1/2 top-full mt-4 min-w-[650px] p-5 rounded-xl border border-gray-100 bg-white shadow-xl opacity-0 invisible translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-20 cursor-default">
                        <div className="grid grid-cols-2 gap-6">
                          {item.groups.map((group, gi) => (
                            <div
                              key={gi}
                              className={gi === 2 ? "col-span-2" : ""}
                            >
                              <p className="text-xl font-semibold text-gray-600 mb-3 cursor-default">
                                {group.title}
                              </p>

                              <ul className="space-y-2">
                                {group.items.map((child, j) => (
                                  <li key={j}>
                                    <Link
                                      href={child.url}
                                      className={`block px-2 py-1 text-base font-medium rounded-md hover:bg-gray-50 transition ${asPath === child.url || (child.url !== "/" && asPath?.startsWith(`${child.url}/`))
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

          <div className="hidden xl:flex items-center gap-3 order-2 ml-6">
            <ButtonLink href={`tel:${config.contact_info.phone.replace(/\\s+/g, "")}`} title="Let's Talk" animate={animate} icon={IoIosCall} />
          </div>

          <div className="xl:hidden ml-auto flex items-center gap-2 md:gap-3 flex-shrink-0">
            <a
              href={`tel:${config.contact_info.phone.replace(/\s+/g, "")}`}
              className="flex items-center justify-center h-10 w-10 md:h-11 md:w-11 bg-secondary text-white rounded-xl shadow-sm transition-transform active:scale-95"
              aria-label="Call Us"
            >
              <IoIosCall className="text-xl md:text-2xl" />
            </a>
            <button
              className="flex items-center justify-center h-10 w-10 md:h-11 md:w-11 bg-primary text-white rounded-xl shadow-sm transition-transform active:scale-95"
              onClick={() => setShowMenu(!showMenu)}
              aria-label="Toggle Menu"
            >
              {showMenu ? <CgClose className="text-xl md:text-2xl" /> : <RxHamburgerMenu className="text-xl md:text-2xl" />}
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[100] xl:hidden bg-primary transition-all duration-500 ease-in-out ${showMenu ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        <div className="absolute top-6 right-4 z-[110]">
          <button
            className="flex items-center justify-center h-11 w-11 bg-white text-primary rounded-xl shadow-lg transition-transform active:scale-95"
            onClick={() => setShowMenu(false)}
            aria-label="Close Menu"
          >
            <CgClose className="text-2xl" />
          </button>
        </div>

        <Link
          href="/contact"
          onClick={() => setShowMenu(false)}
          className="fixed right-0 top-1/2 -translate-y-1/2 bg-secondary text-white font-bold py-6 px-2 rounded-tr-2xl rounded-br-2xl hover:bg-opacity-90 transition-all text-sm tracking-widest z-[110]"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          GET A QUOTE
        </Link>

        <div className={`h-full w-full overflow-y-auto px-6 py-16 flex flex-col items-center transition-all duration-500 ease-out ${showMenu ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
          <ul className="flex flex-col gap-6 text-center w-full max-w-sm mt-4">
            {main.map((item, i) => (
              <li key={i} className="w-full">
                {!item.groups && (
                  <Link
                    href={item.url}
                    onClick={() => setShowMenu(false)}
                    className={`block w-full text-xl font-medium transition duration-300 ${asPath === item.url || (item.url !== "/" && asPath?.startsWith(`${item.url}/`))
                      ? "text-white underline decoration-white underline-offset-8 decoration-2"
                      : "text-white/80"
                      }`}
                  >
                    {item.name}
                  </Link>
                )}

                {item.groups && (
                  <div className="w-full">
                    <div className="text-xl font-bold text-white mb-4">{item.name}</div>
                    <div className="flex flex-col gap-4">
                      {item.groups.map((group, gi) => (
                        <div key={gi} className="w-full flex flex-col items-center">
                          <button
                            onClick={() => setOpenGroup(openGroup === `${i}-${gi}` ? null : `${i}-${gi}`)}
                            className="flex items-center justify-center gap-2 text-xl font-medium text-white py-1  transition-colors"
                          >
                            {group.title}
                            <FaAngleDown
                              className={`transition-transform duration-300 text-md ${openGroup === `${i}-${gi}` ? 'rotate-180 text-white' : ''}`}
                            />
                          </button>

                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out w-full ${openGroup === `${i}-${gi}` ? "max-h-[500px] opacity-100 mt-1" : "max-h-0 opacity-0"
                              }`}
                          >
                            <ul className="flex flex-col gap-3 py-2 items-center">
                              {group.items.map((child, j) => (
                                <li key={j}>
                                  <Link
                                    href={child.url}
                                    onClick={() => setShowMenu(false)}
                                    className={`block text-lg transition duration-300 font-medium ${asPath === child.url || (child.url !== "/" && asPath?.startsWith(`${child.url}/`))
                                      ? "text-white underline decoration-white underline-offset-8 decoration-2"
                                      : "text-gray-200"
                                      }`}
                                  >
                                    {child.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;

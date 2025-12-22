"use client";

import Logo from "@components/Logo";
import config from "@config/config.json";
import menu from "@config/menu.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";

const Header = () => {
  // ✅ ALL HOOKS MUST BE CALLED FIRST

  const [mounted, setMounted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [direction, setDirection] = useState(null);
  const headerRef = useRef(null);

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
      setSticky(scrollY > 0);

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

  // ❗ AFTER all hooks are declared, it's safe to conditionally render
  if (!mounted) return null;

  const { main } = menu;
  const { logo } = config.site;

  return (
    <>
      <div className="header-height-fix"></div>
      <header
        ref={headerRef}
        className={`header ${sticky ? "header-sticky" : ""} ${
          direction === 1 ? "unpinned" : ""
        }`}
      >
        <nav className="navbar container-xl">
          {/* logo */}
          <div className="order-0">
            <Logo src={logo} />
          </div>

          <ul
            className={`navbar-nav order-2 w-full justify-center lg:order-1 md:w-auto lg:flex ${
              !showMenu ? "hidden" : ""
            }`}
          >
            {main.map((item, i) => (
              <li key={i} className="nav-item">
                <Link
                  href={item.url}
                  className={`nav-link ${
                    asPath === item.url ? "active" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="order-1 ml-auto flex items-center">
            {showMenu ? (
              <button
                className="h-8 w-8 text-3xl lg:hidden"
                onClick={() => setShowMenu(false)}
              >
                <CgClose />
              </button>
            ) : (
              <button
                className="lg:hidden"
                onClick={() => setShowMenu(true)}
              >
                ☰
              </button>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;

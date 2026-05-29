"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdHome, MdChevronRight } from "react-icons/md";

const Breadcrumbs = ({ customTitle }) => {
  const pathname = usePathname();
  if (pathname === "/") return null;

  // Split paths and remove empty strings
  const pathParts = pathname.split("/").filter((part) => part);

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <div className="container">
        <div className="overflow-x-auto no-scrollbar -mb-2">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 text-sm font-medium bg-white/60 backdrop-blur-md px-4 md:px-5 py-2 md:py-2.5 rounded-full border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] min-w-max">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center text-gray-500 hover:text-primary transition-colors duration-300"
              >
                Home
              </Link>
            </li>

            {pathParts.map((part, index) => {
              const isLast = index === pathParts.length - 1;

              // Build absolute path for intermediate links
              const url = `/${pathParts.slice(0, index + 1).join("/")}`;

              // If the URL ends up being /posts/page, we don't want to link to a broken page or show it
              if (
                part === "page" ||
                (!isNaN(part) && pathParts[index - 1] === "page")
              ) {
                return null;
              }

              // Humanize slug
              let displayName = part.replace(/-/g, " ");

              // Special map for folder names like 'posts' to 'Blog'
              if (part.toLowerCase() === "posts") {
                displayName = "Blog";
              }

              // Capitalize
              displayName =
                displayName.charAt(0).toUpperCase() + displayName.slice(1);

              // Use the actual blog title for the last element if provided
              if (isLast && customTitle) {
                displayName = customTitle;
              }

              return (
                <li key={url} className="inline-flex items-center">
                  <MdChevronRight className="text-gray-400 text-lg mx-1 md:mx-1.5 shrink-0" />
                  {isLast ? (
                    <span className="text-gray-800 font-semibold truncate max-w-[150px] md:max-w-xs cursor-default">
                      {displayName}
                    </span>
                  ) : (
                    <Link
                      href={url}
                      className="text-gray-500 hover:text-primary transition-colors duration-300 capitalize"
                    >
                      {displayName}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumbs;

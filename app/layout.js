import config from "@config/config.json";
import theme from "@config/theme.json";
import ClientShell from "@layouts/components/ClientShell";
import ClientOnly from "@layouts/components/ClientOnly";
import "../styles/style.scss";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import PageWrapper from "@layouts/service/PageWrapper";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const satoshi = localFont({
  src: "../fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

export default function RootLayout({ children }) {
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;

  return (
    // <html lang="en">
    <html lang="en" className={manrope.variable}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <link rel="shortcut icon" href={config.site.favicon} />
        <meta name="theme-name" content="andromeda-light-nextjs" />
        <meta name="msapplication-TileColor" content="#000000" />
        {/* <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}${
            sf ? "&family=" + sf : ""
          }&display=swap`}
          rel="stylesheet"
        /> */}
      </head>

      <body>
        <ClientOnly>
          <ClientShell>
            {children}
          </ClientShell>
        </ClientOnly>
      </body>
    </html>
  );
}

import config from "@config/config.json";
import ClientShell from "@layouts/components/ClientShell";
import ClientOnly from "@layouts/components/ClientOnly";
import "../styles/style.scss";
import { Instrument_Sans } from "next/font/google";


const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={instrumentSans.variable}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <link rel="shortcut icon" href={config.site.favicon} />
        <meta name="theme-name" content="andromeda-light-nextjs" />
        <meta name="msapplication-TileColor" content="#000000" />
      </head>

      <body>
        <ClientOnly>
          <ClientShell>{children}</ClientShell>
        </ClientOnly>
      </body>
    </html>
  );
}

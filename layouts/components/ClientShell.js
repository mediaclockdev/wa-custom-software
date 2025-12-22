"use client";

import TwSizeIndicator from "@layouts/components/TwSizeIndicator";
import Header from "@layouts/partials/Header";
import Footer from "@layouts/partials/Footer";

export default function ClientShell({ children }) {
  return (
    <>
      <TwSizeIndicator />
      <Header />
      {children}
      <Footer />
    </>
  );
}

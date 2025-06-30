// app/layout.js or app/layout.jsx
"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}

// app/layout.js or app/layout.jsx
"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./components/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
      <AuthProvider>
        <GoogleOAuthProvider clientId="517719889994-builnvbums1qghfr4t5kqqft9ccrbdga.apps.googleusercontent.com">
          <body className={montserrat.className}>{children}</body>
        </GoogleOAuthProvider>
      </AuthProvider>
    </html>
  );
}

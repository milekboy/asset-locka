"use client";
import { useRef, useEffect } from "react";
import { Suspense } from "react";
import AOSProvider from "./components/AosProvider";
import { useSearchParams } from "next/navigation";
import Header from "./components/Header";
import HeadContact from "./components/HeadContact";
import Hero from "./components/Hero";
import DontSuffer from "./components/DontSuffer";
import Features from "./components/Features";
import Secure from "./components/Secure";
import Plan from "./components/Plans";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FaqSection from "./components/FaqSection";
import Wathsapp from "./components/Whatsapp";

function ScrollHandler({ featuresRef, contactRef, secureRef, companyRef }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const scrollTarget = searchParams.get("scroll");
    if (scrollTarget === "contact") {
      contactRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (scrollTarget === "services") {
      featuresRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (scrollTarget === "secure") {
      secureRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (scrollTarget === "company") {
      companyRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchParams, contactRef, featuresRef, secureRef, companyRef]);

  return null;
}

export default function Home() {
  const contactRef = useRef(null);
  const featuresRef = useRef(null);
  const secureRef = useRef(null);
  const companyRef = useRef(null);

  return (
    <div>
      <AOSProvider />
      <HeadContact />
      <Header
        handleContactClick={() =>
          contactRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        handleServicesClick={() =>
          featuresRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        handleSecureClick={() =>
          secureRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        handleCompanyClick={() =>
          companyRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      />
      <Suspense fallback={null}>
        <ScrollHandler
          contactRef={contactRef}
          featuresRef={featuresRef}
          secureRef={secureRef}
          companyRef={companyRef}
        />
      </Suspense>
      <Hero />
      <DontSuffer ref={secureRef} />
      <Features ref={featuresRef} />
      <Secure />
      <Plan ref={companyRef} />
      <Contact ref={contactRef} />
      <FaqSection />
      <Footer />
      <Wathsapp />
    </div>
  );
}

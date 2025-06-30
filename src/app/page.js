import Header from "./components/Header";
import HeadContact from "./components/HeadContact";
import Hero from "./components/Hero";
import DontSuffer from "./components/DontSuffer";
import Features from "./components/Features";
import Secure from "./components/Secure";
import Plan from "./components/Plans";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <div className="h-screen">
      <HeadContact />
      <Header />
      <Hero />
      <DontSuffer />
      <Features />
      <Secure />
      <Plan />
      <Contact />
      <Footer />
    </div>
  );
}

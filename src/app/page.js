import Image from "next/image";
import Header from "./components/Header";
import HeadContact from "./components/HeadContact";
import Hero from "./components/Hero";
export default function Home() {
  return (
    <div className="h-screen">
      <HeadContact />
      <Header />
      <Hero />
    </div>
  );
}

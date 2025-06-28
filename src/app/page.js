import Image from "next/image";
import Header from "./components/Header";
import HeadContact from "./components/HeadContact";

export default function Home() {
  return (
    <div className="h-screen">
      <HeadContact />
      <Header />
    </div>
  );
}

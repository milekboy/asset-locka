import { IoLogoWhatsapp } from "react-icons/io";
import Link from "next/link";
export default function Wathsapp() {
  return (
    <Link href="https://wa.me/2347035361770?text=AssetLocka%20Support">
      <div className=" flex justify-center items-center rounded-full bg-white p-2 cursor-pointer  fixed bottom-0 right-0 me-10 mb-10">
        <IoLogoWhatsapp className="text-[#25D366] text-4xl animate-pulse" />
      </div>
    </Link>
  );
}

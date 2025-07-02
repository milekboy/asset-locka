import Image from "next/image";

export default function DashboardHeader() {
  return (
    <header
      className="fixed top-0 left-0 md:left-[16rem] right-0 h-16
             bg-white border-b border-slate-200 z-20
             flex items-center justify-end lg:px-12 px-9"
    >
      <Image
        src="/locka_files/logo.svg"
        alt="Logo"
        width={120}
        height={40}
        className="h-10 w-auto"
      />
    </header>
  );
}

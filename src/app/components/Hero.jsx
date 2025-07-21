"use client";
import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
export default function Hero() {
  return (
    <div className="w-[100%] lg:flex h-screen lg:h-[650px] lg:-mt-[83px]">
      <div className="lg:w-[50%] lg:px-[2.5rem] px-[1rem] flex  items-center lg:mt-24">
        <div className="w-full mt-10 lg:mt-0">
          <p className="lg:text-4xl text-2xl font-extrabold tracking-normal lg:leading-12 text-center lg:text-left">
            Search For <span className="text-blue-400">Assets</span>,
            <br /> your Loved Ones Left
            <br /> Behind
          </p>
          <p className="text-gray-400 leading-8  text-center lg:text-left mt-4">
            We are <span className="text-blue-400">AssetLocka</span>, a
            retirement exit{" "}
            <TypeAnimation
              sequence={["Trustee Manager", 2000, "Planning Agency", 2000]}
              wrapper="span"
              speed={5}
              repeat={Infinity}
            />
            <br />
            Helping you and access your loved ones assets
          </p>
          <div className=" lg:flex lg:space-x-4 mt-7 space-y-4">
            <Link
              href="/register"
              className="btn-primary w-full hover-up-2 lg:w-32 text-center h-10 flex justify-center items-center"
            >
              GET STARTED
            </Link>
            <Link
              href="/login"
              className="btn-accent w-full hover-up-2 lg:w-32 text-center h-10 flex justify-center items-center"
            >
              SIGN IN
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:w-[50%] lg:bg-blue-50 flex justify-center items-center mt-5 lg:mt-0">
        <Image
          src="/locka_files/frame.png"
          alt="Logo"
          width={500}
          height={500}
          className="lg:mt-11"
        />
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <section className="relative isolate h-[90vh]  lg:h-[650px] lg:-mt-[83px]">
      <div className="absolute inset-y-0 right-0 hidden lg:block w-1/2 bg-[#E8F1FF] -z-10" />

      <div className="mx-auto flex h-full max-w-7xl flex-col lg:flex-row">
        {/* ───────── Left column ───────── */}
        <div className="flex h-1/2 lg:h-full w-full lg:w-1/2 items-center justify-center lg:justify-start px-4 pt-12 lg:pt-0">
          <div className="max-w-md lg:max-w-none text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight">
              Search&nbsp;For&nbsp;
              <span className="text-[#489AFF]">Assets</span>,<br />
              your&nbsp;Loved&nbsp;Ones&nbsp;Left
              <br />
              Behind
            </h1>

            <p className="mt-6 text-gray-500 leading-7">
              We are&nbsp;
              <span className="text-[#489AFF] font-medium">AssetLocka</span>, a
              retirement exit&nbsp;
              <TypeAnimation
                sequence={["Trustee Manager", 2000, "Planning Agency", 2000]}
                wrapper="span"
                speed={5}
                repeat={Infinity}
                className="inline-block"
              />
              .<br className="hidden sm:block" />
              Helping you locate and access your loved ones’ assets.
            </p>

            <div className=" lg:flex lg:space-x-4 mt-7 space-y-4">
              <Link
                href="/signup"
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

        <div className="flex h-1/2 lg:h-full w-full lg:w-1/2 items-center justify-end mt-5 lg:mt-0">
          <Image
            src="/locka_files/frame.png"
            alt="Collage"
            width={700}
            height={500}
            priority
            className="lg:mt-11 lg:me-4  lg:max-w-[90%] h-auto"
          />
        </div>
      </div>
    </section>
  );
}

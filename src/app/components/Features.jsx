// components/AssetOwnerSection.jsx
import Image from "next/image";
import React, { forwardRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const steps = [
  {
    number: 1,
    title: "Create An Account",
    description: "You create a secure account to manage your assets.",
  },
  {
    number: 2,
    title: "List Your Asset",
    description:
      "Begin to document, catalog and assign all your valuable assets in one place.",
  },
  {
    number: 3,
    title: "Assign Trusted Next of Kin",
    description:
      "We ensure that your assets are protected and accessible to your loved ones in the event of your passing.",
  },
  {
    number: 4,
    title: "Secure Exit",
    description:
      "We ensure that your assets are protected and accessible to your loved ones in the event of your passing.",
  },
];

const Features = (props, ref) => {
  useEffect(() => {
    AOS.init({ duration: 600, easing: "ease-out-quart", once: true });
  }, []);
  return (
    <section
      ref={ref}
      className="flex flex-col max-w-7xl mx-auto lg:flex-row items-center  px-[1rem] py-16 gap-32"
    >
      <div className="flex-1 lg:w-1/2">
        <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
          For <span className="text-[#489AFF]">Asset Owner</span>
        </h2>
        <p className="text-gray-600 mb-8">
          <span className="text-[#489AFF] font-medium">AssetLocka</span> helps
          you to secure your assets, assign your next of kin and rest easy.
        </p>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div
              data-aos="fade-right"
              data-aos-delay={i * 120}
              key={step.number}
              className="border border-pink-200 rounded-xl p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center mb-2">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 text-[#489AFF]  flex items-center justify-center font-bold">
                  {step.number}
                </div>
                <h3 className="ml-4 text-lg font-semibold">{step.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right column */}
      <div className="  lg:w-1/2 lg:flex hidden bg-blue-50  p-8 justify-center items-center h-[900px]">
        <Image
          src="/locka_files/asset-owner.png"
          alt="Person reviewing assets"
          width={500}
          height={500}
          className="rounded-lg object-contain"
        />
      </div>
    </section>
  );
};
export default forwardRef(Features);

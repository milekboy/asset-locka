// components/DontSuffer.jsx

import React, { forwardRef } from "react";
import { TbChartCandle, TbChartBarPopular } from "react-icons/tb";
import { AiOutlinePieChart } from "react-icons/ai";
import { LuBriefcaseBusiness } from "react-icons/lu";
const features = [
  {
    icon: <TbChartCandle />,
    title: "Asset Planning",
    description:
      "Asset planning is one of the best gifts you can give yourself to track all your scattered e-assets.",
  },
  {
    icon: <LuBriefcaseBusiness />,
    title: "Asset Claiming",
    description:
      "Getting to find out your loved ones listed you as beneficiary is one thing. Claiming them can be a challenge.",
  },
  {
    icon: <TbChartBarPopular />,
    title: "e-Will/Trustee",
    description:
      "We believe a well setup trustee is key to ensuring your assets are managed according to your wishes.",
  },
  {
    icon: <AiOutlinePieChart />,
    title: "Last Instruction",
    description:
      "Write that exciting poem and say the beautiful words you had longed to express to your loved ones.",
  },
];
const DontSuffer = (props, ref) => {
  return (
    <section
      ref={ref}
      className="flex flex-col lg:flex-row lg:px-[2.5rem] px-[1rem]  py-16 gap-12"
    >
      {/* Left: Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white rounded-xl text-center   p-6 shadow-lg hover:shadow-xl transition"
          >
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 bg-[#489AFF] rounded mb-4 flex justify-center items-center text-white">
                {f.icon}
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>

      {/* Right: Heading + paragraph */}
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight mb-6">
          <span className="text-[#489AFF]">Don’t</span> Let Your Loved Ones
          <br />
          Suffer When You Are Gone
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Life is a privilege. Don’t leave this world without letting your loved
          ones know where your assets are. Let them know how to claim them, your
          last wishes and how much you love them.
        </p>
      </div>
    </section>
  );
};

export default forwardRef(DontSuffer);

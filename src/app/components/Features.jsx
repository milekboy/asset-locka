import FeaturesCard from "./FeaturesCard";
import { TbChartCandle } from "react-icons/tb";

import { AiOutlinePieChart } from "react-icons/ai";
import { TbChartBarPopular } from "react-icons/tb";

import { LuBriefcaseBusiness } from "react-icons/lu";

const Features = () => {
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

  return (
    <section className="pt-16 px-[1rem] lg:px-0  ">
      <div className="max-w-7xl mx-auto lg:px-[2.5rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <FeaturesCard key={i} {...f} />
        ))}
      </div>
    </section>
  );
};

export default Features;

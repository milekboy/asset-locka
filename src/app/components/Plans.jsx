import { useState, forwardRef } from "react";

const FEATURES = {
  bronze: [
    "Setup Unlimited Assets",
    "Setup two (2)  Beneficiaries",
    "Asset Search Enabled",
    "Regular Checkins & Support",
  ],
  silver: [
    "Setup Trustee",
    "Write Last Wish",
    "Setup Multiple Beneficiaries",
    "List Unlimited Assets",
    "Regular Checkins & Support",
  ],
};

const Plan = forwardRef(function Plan(props, ref) {
  const [plan, setPlan] = useState("bronze");
  const btnClass = (key) =>
    `w-40 lg:w-44 h-10 flex cursor-pointer items-center justify-center rounded-md font-bold px-3 
     transition hover:-translate-y-1 ${
       plan === key
         ? "bg-[#489AFF] text-white shadow-lg"
         : "bg-gray-100 text-gray-600"
     }`;

  return (
    <div ref={ref} className="max-w-7xl mx-auto    py-20  px-[1rem]  lg:mt-10 ">
      <div className="w-full flex justify-center items-center ">
        <div className="space-y-4">
          <p className="text-center lg:text-4xl text-2xl font-extrabold tracking-normal lg:leading-12 ">
            Choose Your
            <span className="text-[#489AFF]"> Best</span> Pricing Plan
          </p>
          <p className="text-gray-400 leading-8 text-xl text-center">
            Great Things Happens When You Plan
          </p>
          <div className="w-full flex items-center justify-center">
            <div className="flex gap-4 ">
              <button
                onClick={() => setPlan("bronze")}
                className={btnClass("bronze")}
              >
                BRONZE PLAN
              </button>
              <button
                onClick={() => setPlan("silver")}
                className={btnClass("silver")}
              >
                SILVER PLAN
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:flex w-[100%]  lg:h-96 h-screen mt-10">
        <div className=" bg-[#489AFF] lg:w-[40%] h-[50%] lg:h-full flex justify-center items-center text-white text-center px-28 py-5 lg:py-0">
          <div>
            <p className="text-xs">Setup A Trustee</p>
            <p className=" text-4xl font-bold leading-12">
              AssetLocka secures your loved ones after demise.
            </p>
          </div>
        </div>
        <div
          // {...(typeof window !== "undefined" && { "data-aos": "fade-up" })}
          className="shadow-md  lg:w-[60%] h-[50%] lg:h-full  py-5 lg:py-0 flex items-center  ps-5"
        >
          <div>
            <p className="text-sm text-blue-200">Plan Features</p>
            <ul className=" text-2xl font-bold space-y-3 text-[#489AFF]">
              {FEATURES[plan].map((feat) => (
                <li key={feat}>{feat}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Plan;

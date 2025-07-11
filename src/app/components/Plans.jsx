import Link from "next/link";
import React, { forwardRef } from "react";

const Plan = forwardRef(function Plan(props, ref) {
  return (
    <div
      ref={ref}
      className="w-[100%] py-20 lg:px-[2.5rem] px-[1rem] mt-56 lg:mt-10 "
    >
      <div className="w-full flex justify-center items-center ">
        <div className="space-y-4">
          <p className="text-center lg:text-4xl text-2xl font-extrabold tracking-normal lg:leading-12 ">
            Choose Your <br />
            <span className="text-blue-600"> Best</span> Pricing Plan
          </p>
          <p className="text-gray-400 leading-8 text-xl">
            Great Things Happens When You Plan
          </p>
          <div className="flex gap-4">
            <Link
              href="/register"
              className="bg-blue-500 font-bold px-3 text-white rounded-md w-full hover-up-2 lg:w-44 text-center h-10 flex justify-center items-center"
            >
              BRONZE PLAN
            </Link>
            <Link
              href="/register"
              className="bg-blue-500 font-bold px-3 text-white rounded-md w-full hover-up-2 lg:w-44 text-center h-10 flex justify-center items-center"
            >
              SILVER PLAN
            </Link>
          </div>
        </div>
      </div>
      <div
        // {...(typeof window !== "undefined" && { "data-aos": "fade-up" })}
        className="lg:flex w-[100%]  lg:h-96 h-screen mt-10"
      >
        <div
          // {...(typeof window !== "undefined" && { "data-aos": "fade-up" })}
          className=" bg-blue-500 lg:w-[40%] h-[50%] lg:h-full flex justify-center items-center text-white text-center px-28 py-5 lg:py-0"
        >
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
            <ul className=" text-2xl font-bold space-y-3 text-blue-500">
              <li>Setup Trustee</li>
              <li>Write Last Wish</li>
              <li>Setup Multiple Beneficiaries</li>
              <li>List Unlimited Assets</li>
              <li>Regular Checkins & Support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Plan;

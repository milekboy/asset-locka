import React, { forwardRef } from "react";
import { FiPhone, FiMail } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import useHasMounted from "./hooks/useHasMounted";

const Contact = (props, ref) => {
  const hasMounted = useHasMounted();

  return (
    <div
      ref={ref}
      // {...(hasMounted ? { "data-aos": "fade-up" } : {})}
      className="w-[100%] py-20 lg:px-[2.5rem] px-[1rem]"
    >
      <div className="w-full flex justify-center items-center">
        <div className="space-y-">
          <p className="text-center lg:text-4xl text-2xl font-extrabold tracking-normal lg:leading-12">
            Get in touch!
          </p>
          <p className="text-gray-400 leading-8 text-center">
            We will be glad to hear from you
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6 lg:flex lg:justify-center lg:gap-10">
            {/* Phone */}
            <div className="flex justify-center items-center w-full">
              <div className="space-y-2">
                <div className="w-full flex justify-center">
                  <FiPhone className="text-blue-500 mb-3 text-3xl" />
                </div>
                <p className="text-gray-400 text-center">Phone</p>
                <p className="text-center">+234 703-536-1770</p>
                <p className="text-center">+234 703-313-4187</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex justify-center items-center w-full">
              <div className="space-y-2">
                <div className="w-full flex justify-center">
                  <FiMail className="text-blue-500 mb-3 text-3xl" />
                </div>
                <p className="text-gray-400 text-center">Email</p>
                <p className="text-center">info@assetlocka.com</p>
                <p className="text-center">support@assetlocka.com</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex justify-center items-center col-span-2 lg:col-span-1 w-full">
              <div className="space-y-2">
                <div className="w-full flex justify-center">
                  <GrLocation className="text-blue-500 mb-3 text-3xl" />
                </div>
                <p className="text-gray-400 text-center">Address</p>
                <p className="text-center">28b Madam Okeshola, Ikeja</p>
                <p className="text-center">Lagos, Nigeria</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section
        // {...(hasMounted ? { "data-aos": "fade-up" } : {})}
        className="px-4 py-10 lg:px-20 bg-white"
      >
        <div className="max-w-6xl mx-auto bg-white rounded-lg p-8">
          <form className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department radio buttons */}
            <div className="col-span-2 flex items-center lg:gap-6 gap-4">
              <label className="font-medium">Department:</label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="department"
                  value="support"
                  className="accent-blue-600"
                  defaultChecked
                />
                Support
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="department"
                  value="sales"
                  className="accent-blue-600"
                />
                Sales
              </label>
            </div>

            {/* Input fields */}
            <input
              type="text"
              placeholder="Subject"
              className="col-span-2 lg:col-span-1 p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Message..."
              className="col-span-2 lg:col-span-1 p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <input
              type="text"
              placeholder="Name"
              className="col-span-2 lg:col-span-1 p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="name@example.com"
              className="col-span-2 lg:col-span-1 p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="col-span-2 flex items-center space-x-2">
              <input type="checkbox" className="accent-blue-600" />
              <label>I agree to terms and conditions.</label>
            </div>

            <div className="col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default forwardRef(Contact);

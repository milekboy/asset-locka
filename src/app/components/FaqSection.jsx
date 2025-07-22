"use client";

import { useState } from "react";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";

const FAQS = [
  {
    question: "What type of asset can I store?",
    answer:
      "You can store a wide range of asset types including bank details, property documents, cryptocurrency, investment records, and even personal wishes.",
  },
  {
    question: "Can I update or remove assets or beneficiaries later?",
    answer:
      "Yes. You have full control over your dashboard and can edit or delete asset entries or assigned kin at any time.",
  },
  {
    question: "I have lost a loved one, how do I know if they used AssetLocka?",
    answer:
      "You can create a Next of Kin account and submit a claim using their BVN, NIN, email, or phone number. If a match exists, we’ll guide you through the next steps.",
  },
  {
    question: "Can someone be both an Asset Owner and a next of kin?",
    answer:
      "Yes. Users can play both roles you can secure your own assets while also being assigned as a next of kin by someone e",
  },
  {
    question: "Is my data safe?",
    answer:
      "Absolutely. AssetLocka uses encrypted storage and secure verification protocols to keep your information private and protected.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const highlightBrand = (txt) =>
    txt.split(/(AssetLocka)/).map((p, k) =>
      p === "AssetLocka" ? (
        <span key={k} className="text-[#489AFF] font-semibold">
          {p}
        </span>
      ) : (
        p
      )
    );
  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-[#EDF5FF] py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Have a Question? We&apos;ve Got the Answer
        </h2>
        <p className="mt-2 text-gray-600">
          Get quick and easy answers to your most common questions.
        </p>

        <div className="mt-8 space-y-4 ">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border h-[78px] rounded-lg overflow-hidden transition-shadow ${
                  isOpen
                    ? "border-blue-500 shadow-lg bg-white h-auto"
                    : "border-transparent bg-white hover:shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full  flex items-center justify-between px-6 py-4 focus:outline-none"
                >
                  <span
                    className={`text-left font-medium ${
                      isOpen ? "text-gray-900" : "text-gray-800"
                    }`}
                  >
                    {highlightBrand(faq.question)}
                  </span>
                  {isOpen ? (
                    <div className="bg-blue-400 p-2 shadow-lg rounded-4xl">
                      <HiChevronDown className="text-white  " size={20} />
                    </div>
                  ) : (
                    <div className=" p-2 shadow-lg rounded-4xl">
                      <HiChevronRight className="text-[#731D24]  " size={20} />
                    </div>
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 text-left text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

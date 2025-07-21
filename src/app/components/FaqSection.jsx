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
      "Yes—once you’ve added an asset or beneficiary, you can always edit or delete it from your dashboard at any time.",
  },
  {
    question: "I have lost a loved one, how do I know if they used AssetLocka?",
    answer:
      "If they designated you as next of kin, you’ll receive an email notification with instructions on how to access their secured information.",
  },
  {
    question: "Can someone be both an Asset Owner and a next of kin?",
    answer:
      "Absolutely. You can create your own asset list and also be assigned as next of kin on someone else’s account.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Your data is encrypted at rest and in transit, and we follow industry-standard security practices to keep it secure.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

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
                    {faq.question}
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
                  <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

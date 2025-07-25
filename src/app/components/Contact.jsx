// components/Contact.jsx
"use client";

import React, { forwardRef, useState } from "react";
import { FiPhone, FiMail } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import useHasMounted from "./hooks/useHasMounted";
import NetworkInstance from "./NetworkInstance";
import Toast from "./Toast";
import Spinner from "./Spinner"; // if you have one

const steps = [
  {
    icon: <FiPhone className="text-white text-3xl" />,
    label: "Phone",
    lines: ["+234 703 536 1770", "+234 703 313 4187"],
  },
  {
    icon: <FiMail className="text-white text-3xl" />,
    label: "Email",
    lines: ["info@assetlocka.com", "support@assetlocka.com"],
  },
  {
    icon: <GrLocation className="text-white text-3xl" />,
    label: "Address",
    lines: ["28b Madam Okeshola, Ikeja", "Lagos, Nigeria"],
  },
];

const Contact = (props, ref) => {
  const hasMounted = useHasMounted();
  const network = NetworkInstance();

  /* ── form state ─────────────────────────────── */
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);

  /* UX helpers */
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setSubject("");
    setMessage("");
    setName("");
    setEmail("");
    setAgree(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await network.post("/api/contact-us", {
        subject,
        message,
        name,
        email,
        department: "support",
      });

      setToast({
        type: "success",
        message: "Thanks! We'll get back to you shortly.",
      });
      resetForm();
    } catch (err) {
      console.error(err);
      setToast({
        type: "error",
        message:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={ref} className="max-w-7xl mx-auto py-20 px-4 lg:px-[2.5rem]">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* ── heading + contact cards ───────────────── */}
      <div className="text-center">
        <h2 className="text-2xl lg:text-4xl font-extrabold">
          Get <span className="text-[#489AFF]">in</span> touch!
        </h2>
        <p className="text-gray-400 mt-1 mb-10">
          We will be glad to hear from you
        </p>

        <div className="grid grid-cols-2 lg:flex lg:justify-center gap-4 lg:gap-10">
          {steps.map(({ icon, label, lines }, i) => (
            <div
              key={i}
              className={`flex flex-col items-center space-y-2 ${
                i === 2 ? "col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#489AFF]">
                {icon}
              </div>
              <p className="text-gray-400">{label}</p>
              {lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── contact form ─────────────────────────── */}
      <section className="mt-14 bg-white">
        <div className="max-w-6xl mx-auto rounded-lg p-8">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="col-span-2 lg:col-span-1 p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200"
              required
            />

            <textarea
              placeholder="Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="col-span-2 lg:col-span-1 p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200"
              required
            />

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-2 lg:col-span-1 p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200"
              required
            />
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-2 lg:col-span-1 p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200"
              required
            />

            <label className="col-span-2 flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="accent-blue-600"
              />
              <span>I agree to terms and conditions.</span>
            </label>

            <div className="col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#489AFF] cursor-pointer text-white px-6 py-2 rounded-lg disabled:opacity-60 flex items-center gap-2"
              >
                {loading && <Spinner size={4} />}
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

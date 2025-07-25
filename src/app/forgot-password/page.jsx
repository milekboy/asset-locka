"use client";
import Footer from "../components/Footer";
import HeadContact from "../components/HeadContact";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import NetworkInstance from "../components/NetworkInstance";
import { useState } from "react";
import { FiMail } from "react-icons/fi";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const api = NetworkInstance();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/api/forgot-password", { email });
      setToast({
        message: data.message || "Reset Link Sent!",
        type: "success",
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setToast({
        message: err.response?.data?.message || "Something went wrong.",
        type: "error",
      });
      setLoading(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {loading && <Spinner />}
      <HeadContact />
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-gray-50 py-14 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white shadow-md rounded-2xl
                   px-8 md:px-16 py-12 space-y-10"
        >
          {/* headline */}
          <header className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold">Forgot Password?</h1>
            <p className="text-gray-500 text-sm">
              Enter your email to receive a password&nbsp;reset&nbsp;link
            </p>
          </header>

          {/* email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4
                         placeholder:text-sm focus:ring-2 focus:ring-[#489AFF] focus:outline-none"
              />
              <FiMail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>

          {/* CTA */}
          <button
            type="submit"
            className="w-full cursor-pointer rounded-full bg-[#489AFF] hover:bg-[#3188e6]
                     py-3 font-semibold text-white transition disabled:opacity-60"
          >
            Send Link
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}

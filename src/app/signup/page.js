"use client";
import { useState } from "react";
import Image from "next/image";
import { useGoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FiMail } from "react-icons/fi";

import { FcGoogle } from "react-icons/fc";

import HeadContact from "../components/HeadContact";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";
import NetworkInstance from "../components/NetworkInstance";

export default function Signup() {
  /* ───── state & utils ───── */
  const router = useRouter();
  const api = NetworkInstance();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ───── submit ───── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/api/register", {
        first_name: firstName,
        last_name: lastName,
        phone,
        email,
        password,
        password_confirmation: confirm,
      });

      setToast({ message: "Signup successful!", type: "success" });
      setTimeout(() => router.push("/login"), 1200);
    } catch (err) {
      console.log(err);
      setToast({
        message: err.response?.data?.message || "Something went wrong.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: async (cred) => {
      console.log(cred);
      try {
        const { data } = await api.post("api/auth/google/token", {
          id_token: cred.access_token,
        });
        login({ user: data.user, token: data.token });
        router.push("/dashboard");
      } catch (e) {
        console.error(e);
        alert("Google verification failed");
      }
    },
    onError: () => alert("Google popup closed"),
    flow: "implicit",
  });

  return (
    <>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      {loading && <Spinner />}

      <HeadContact />
      <Header />

      <main className="flex items-center justify-center py-12 lg:py-20 px-4 bg-gray-50 min-h-[80vh] ">
        <form
          onSubmit={handleSubmit}
          className="lg:w-[897px] w-screen  bg-white shadow-md rounded-2xl
                   lg:px-16 px-8 lg:py-12 py-10 space-y-8"
        >
          {/* ─── heading ───────────────────────────────────── */}
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold">Create an Account</h1>
            <p className="text-gray-500 text-sm">
              Provide correct information to setup your account
            </p>
          </div>

          {/* ─── field grid ────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-7">
            {/* First name */}
            <div className="relative">
              <label className="block text-sm font-medium mb-2">
                First Name
              </label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="Enter First Name"
                required
                className="w-full rounded-lg border border-gray-300 py-3 pl-4 pr-4
                         placeholder:text-sm focus:ring-2 focus:ring-[#489AFF] focus:outline-none"
              />
            </div>

            {/* Last name */}
            <div className="relative">
              <label className="block text-sm font-medium mb-2">
                Last Name
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Enter Last Name"
                required
                className="w-full rounded-lg border border-gray-300 py-3 pl-4 pr-4
                         placeholder:text-sm focus:ring-2 focus:ring-[#489AFF] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Phone&nbsp;Number
              </label>
              <div className="relative">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="Enter Phone Number"
                  required
                  className="
      w-full rounded-lg border border-gray-300
      py-3 pl-20 pr-4                       
      placeholder:text-sm
      focus:ring-2 focus:ring-[#489AFF] focus:outline-none 
    "
                />

                <span
                  className="
     
      flex absolute left-4 top-1/2 -translate-y-1/2  border-r h-full border-gray-300      
    "
                >
                  <Image
                    src="/locka_files/nigeria.png"
                    alt="NG"
                    width={24}
                    height={24}
                    className="shrink-0 h-4 mt-4"
                  />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 text-black mt-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.355a.75.75 0 111.02 1.11l-4.25 3.85a.75.75 0 01-1.02 0l-4.25-3.85a.75.75 0 01.02-1.11z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <div className="relative">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter Email"
                  required
                  className="w-full rounded-lg border border-gray-300 py-3 pl-4 pr-12 focus:ring-2 focus:ring-[#489AFF] focus:outline-none"
                />
                <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-2">
                Create Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPwd ? "text" : "password"}
                placeholder="Enter New Password"
                required
                className="w-full rounded-lg border border-gray-300 py-3 pl-4 pr-12
                         placeholder:text-sm focus:ring-2 focus:ring-[#489AFF] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPwd((p) => !p)}
                className="absolute mt-3 right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPwd ? (
                  <MdVisibilityOff size={20} />
                ) : (
                  <MdVisibility size={20} />
                )}
              </button>
            </div>

            {/* Confirm password */}
            <div className="relative">
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                type={showPwd2 ? "text" : "password"}
                placeholder="Confirm New Password"
                required
                className="w-full rounded-lg border border-gray-300 py-3 pl-4 pr-12
                         placeholder:text-sm focus:ring-2 focus:ring-[#489AFF] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPwd2((p) => !p)}
                className="absolute mt-3 right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPwd2 ? (
                  <MdVisibilityOff size={20} />
                ) : (
                  <MdVisibility size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              required
              className="accent-[#489AFF] mt-[3px]"
            />
            I agree to&nbsp;
            <Link href="#" className="text-[#489AFF] hover:underline">
              policy privacy
            </Link>
            &nbsp;and&nbsp;
            <Link href="#" className="text-[#489AFF] hover:underline">
              terms of use
            </Link>
          </label>
          <div className="w-full flex justify-center">
            <div className="w-[400px] space-y-8 ">
              <button
                type="submit"
                className="w-full rounded-full bg-[#489AFF] hover:bg-[#3188e6]
                     py-3 font-semibold text-white transition cursor-pointer"
              >
                Sign&nbsp;Up
              </button>
              {/* Login link */}
              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#C97613] font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>

              <button
                type="button"
                onClick={() => googleLogin()}
                className="mt-2 border border-gray-300 rounded-full w-full
                     flex items-center justify-center gap-3 py-3 cursor-pointer
                     hover:bg-gray-50 transition"
              >
                <FcGoogle size={20} /> Sign Up with Google
              </button>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </>
  );
}

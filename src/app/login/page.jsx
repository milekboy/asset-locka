"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

import { useAuth } from "../components/AuthContext";
import NetworkInstance from "../components/NetworkInstance";
import Header from "../components/Header";
import HeadContact from "../components/HeadContact";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";

export default function Login() {
  /* ───────── state / helpers ───────── */
  const router = useRouter();
  const { login } = useAuth();
  const api = NetworkInstance();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  /* ───────── handlers ───────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/api/login", { email, password });
      login({ user: data.user, token: data.token });
      setToast({
        message: data.message || "Login successful!",
        type: "success",
      });
      router.push(
        data.user.identity_verified ? "/dashboard" : "/kyc-verification"
      );
    } catch (err) {
      setToast({
        message:
          err.response?.data?.message ||
          "Invalid credentials. Please try again.",
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
  /* ───────── UI ───────── */
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

      {/* ⬇︎ Main container */}
      <main className="flex justify-center items-center py-12 lg:py-24 px-4">
        {/* Card */}
        <div className="w-full max-w-md rounded-2xl shadow-lg bg-white p-8">
          {/* Headline */}
          <h1 className="text-2xl font-semibold text-center mb-1">
            Welcome back to <span className="text-[#489AFF]">AssetLocka</span>
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Provide your credentials to access your account
          </p>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-4 pr-12 focus:ring-2 focus:ring-[#489AFF] focus:outline-none"
                />
                <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full rounded-lg border border-gray-300 py-3 pl-4 pr-12 focus:ring-2 focus:ring-[#489AFF] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 cursor-pointer -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPwd ? (
                    <MdVisibilityOff size={20} />
                  ) : (
                    <MdVisibility size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* remember / forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#489AFF]" />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-red-500 font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Primary button */}
            <button
              type="submit"
              className="w-full cursor-pointer rounded-full bg-[#489AFF] py-3 text-white font-semibold hover:bg-[#3188e6] transition"
            >
              Log In
            </button>

            {/* Google auth button */}
            <button
              onClick={() => googleLogin()}
              type="button"
              className="w-full flex cursor-pointer items-center justify-center gap-2 rounded-full border border-gray-300 py-3 font-medium hover:bg-gray-50 transition"
            >
              <FcGoogle size={20} /> Continue with Google
            </button>
          </form>

          {/* footer small print */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#C97613] cursor-pointer font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

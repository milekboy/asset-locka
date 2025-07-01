"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  MdVisibility,
  MdVisibilityOff,
  MdAlternateEmail,
} from "react-icons/md";
import { FaUser } from "react-icons/fa";

export default function Signup() {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  return (
    <div>
      <Header />

      <div className="w-full min-h-screen flex flex-col items-center justify-start pt-14 lg:pb-14 lg:pt-20 bg-gray-50">
        {/* Card */}
        <form
          className="w-[92%] max-w-md bg-white shadow-sm rounded-lg px-8 py-10 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: handle sign-up
          }}
        >
          <h1 className="text-3xl font-semibold text-center">
            Create an Account
          </h1>

          {/* Username */}
          <label className="relative block">
            <span className="sr-only">Username</span>
            <input
              type="text"
              required
              placeholder="Username"
              className="input-text pl-12"
            />
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </label>

          {/* Email */}
          <label className="relative block">
            <span className="sr-only">Email</span>
            <input
              type="email"
              required
              placeholder="Email"
              className="input-text pl-12"
            />
            <MdAlternateEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </label>

          {/* Password */}
          <label className="relative block">
            <span className="sr-only">Password</span>
            <input
              type={showPwd ? "text" : "password"}
              required
              placeholder="Enter your password"
              className="input-text pl-4 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPwd ? (
                <MdVisibilityOff size={20} />
              ) : (
                <MdVisibility size={20} />
              )}
            </button>
          </label>

          {/* Confirm password */}
          <label className="relative block">
            <span className="sr-only">Confirm password</span>
            <input
              type={showPwd2 ? "text" : "password"}
              required
              placeholder="Confirm password"
              className="input-text pl-4 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPwd2(!showPwd2)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPwd2 ? (
                <MdVisibilityOff size={20} />
              ) : (
                <MdVisibility size={20} />
              )}
            </button>
          </label>

          {/* Terms checkbox */}
          <label className="flex items-start text-sm gap-2">
            <input
              type="checkbox"
              required
              className="mt-[3px] h-4 w-4 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>
              I agree to&nbsp;
              <Link href="#" className="link">
                Policy privacy
              </Link>{" "}
              and&nbsp;
              <Link href="#" className="link">
                Terms of Use
              </Link>
            </span>
          </label>

          {/* Submit */}
          <button type="submit" className="btn-primary w-full py-3 font-medium">
            Sign Up Now
          </button>

          {/* Divider */}
          <div className=" items-center justify-center gap-4 hidden">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-gray-400 text-sm">or continue with</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social buttons (optional) */}
          <div className="space-y-4 hidden">
            <button
              type="button"
              className="btn-outline w-full flex items-center gap-3"
            >
              <Image
                src="/icons/facebook.svg"
                width={20}
                height={20}
                alt="Facebook"
              />
              Sign Up with Facebook
            </button>
            <button
              type="button"
              className="btn-outline w-full flex items-center gap-3"
            >
              <Image
                src="/icons/google.svg"
                width={20}
                height={20}
                alt="Google"
              />
              Sign Up with Google
            </button>
          </div>

          {/* Already have an account */}
          <p className="text-center text-gray-500 text-sm pt-2">
            Already have an account?&nbsp;
            <Link href="/login" className="link">
              Log In
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}

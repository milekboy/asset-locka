"use client";
import { useState } from "react";
import Spinner from "../components/Spinner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Toast from "../components/Toast";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  MdVisibility,
  MdVisibilityOff,
  MdAlternateEmail,
} from "react-icons/md";
import { FaUser } from "react-icons/fa";
import HeadContact from "../components/HeadContact";
import NetworkInstance from "../components/NetworkInstance";
export default function Signup() {
  const router = useRouter();
  const [toast, setToast] = useState(null);
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const networkInstance = NetworkInstance();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await networkInstance.post(`/api/register`, {
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        password_confirmation: confirmPassword,
      });
      if (response.status === 200) {
        setToast({ message: "Signup successful!", type: "success" });

        localStorage.setItem("token", response.token);

        setTimeout(() => {
          setToast(null);
          router.push("/kyc-verification");
        }, 1500);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setToast({
        message: "Invalid credentials. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div>
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

      <div className="w-full min-h-screen flex flex-col items-center justify-start pt-14 lg:pb-14 lg:pt-20 bg-gray-50">
        {/* Card */}
        <form
          className="w-[92%] max-w-md bg-white shadow-sm rounded-lg px-8 py-10 space-y-6"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-semibold text-center">
            Create an Account
          </h1>

          {/* Username */}
          <label className="relative block">
            <span className="sr-only">First Name</span>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              required
              placeholder="First Name"
              className="input-text pl-12"
            />
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </label>
          <label className="relative block">
            <span className="sr-only">Last Name</span>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              required
              placeholder="Last Name"
              className="input-text pl-12"
            />
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </label>

          {/* Email */}
          <label className="relative block">
            <span className="sr-only">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              className="mt-[3px] cursor-pointer h-4 w-4 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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

"use client";
import { useState } from "react";
import Toast from "../components/Toast";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthContext";
import Image from "next/image";
import Link from "next/link";
import NetworkInstance from "../components/NetworkInstance";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import HeadContact from "../components/HeadContact";
import Spinner from "../components/Spinner";
export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const networkInstance = NetworkInstance();
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await networkInstance.post("/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { user, token, message } = response.data;

        login({ user, token });

        setToast({ message: message || "Login successful!", type: "success" });
        if (user.identity_verified === 0) {
          router.push("/kyc-verification");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      setToast({
        message:
          error.response?.data?.message ||
          "Invalid credentials. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
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

      <div className="w-full lg:h-screen lg:flex pb-16 lg:pb-0">
        <div className="w-full hidden lg:w-1/2 lg:flex justify-center items-center mt-5 lg:mt-0">
          <Image
            src="/locka_files/space.svg"
            alt="Rocket illustration"
            width={500}
            height={500}
            priority
          />
        </div>
        <div className="w-full lg:w-1/2 flex justify-center items-center mt-10 lg:mt-0">
          <form className="w-[90%] max-w-md space-y-6" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-semibold mb-2">
              Welcome back to <span className="text-blue-600">AssetLocka</span>{" "}
            </h1>

            {/* E-mail */}
            <label className="block">
              <span className="sr-only">Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="name@email.com"
                className="input-text"
              />
            </label>

            {/* Password + toggle */}
            <label className="relative block">
              <span className="sr-only">Password</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPwd ? "text" : "password"}
                required
                placeholder="Enter your password"
                className="input-text pr-12"
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

            {/* Terms checkbox */}
            <label className="flex items-start text-sm gap-2">
              <input
                type="checkbox"
                required
                className="mt-[3px] cursor-pointer h-4 w-4 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>
                I agree to the&nbsp;
                <Link href="#" className="link">
                  Policy privacy
                </Link>{" "}
                and&nbsp;
                <Link href="#" className="link">
                  Terms of Use
                </Link>
              </span>
            </label>

            {/* Sign-in button */}
            <button
              type="submit"
              className="btn-primary w-full py-3 font-medium cursor-pointer"
            >
              Sign In
            </button>

            {/* Divider */}

            {/* Footer link */}
            <p className="text-center text-gray-500 text-sm">
              Don’t have an account?&nbsp;
              <Link href="/signup" className="link">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* ── Tailwind helpers (globals.css or whatever) ───────────── */

"use client";
import HeadContact from "@/app/components/HeadContact";
import Spinner from "@/app/components/Spinner";
import Toast from "@/app/components/Toast";
import Header from "@/app/components/Header";
import { useRouter } from "next/navigation";
import NetworkInstance from "@/app/components/NetworkInstance";
import Footer from "@/app/components/Footer";
import { useState } from "react";
import { useParams } from "next/navigation";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
export default function ResetPassword() {
  const { reset_code } = useParams();
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirm, setConf] = useState("");
  const [toast, setToast] = useState(null);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const api = NetworkInstance();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pwd !== confirm) {
      setToast({ message: "Passwords do not match", type: "error" });
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.post("/api/confirm-reset-password", {
        reset_code,
        password: pwd,
        password_confirmation: confirm,
      });
      setToast({ message: data.message || "Password reset!", type: "success" });
      setTimeout(() => router.push("/password-change-success"), 1500);
    } catch (err) {
      setToast({
        message: err.response?.data?.message || "Something went wrong.",
        type: "error",
      });
    } finally {
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
          className="w-full max-w-xl bg-white shadow-md rounded-2xl px-8 md:px-16 py-12 space-y-8"
        >
          {/* Heading */}
          <header className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold">Reset Password</h1>
            <p className="text-gray-500 text-sm">
              Set a new password for your account
            </p>
          </header>

          {/* New password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              New password
            </label>
            <div className="relative">
              <input
                type={show1 ? "text" : "password"}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full rounded-lg border border-gray-300 py-3 pl-4 pr-12
                         placeholder:text-sm focus:ring-2 focus:ring-[#489AFF] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShow1(!show1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {show1 ? (
                  <MdVisibilityOff size={20} />
                ) : (
                  <MdVisibility size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={show2 ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConf(e.target.value)}
                placeholder="Enter pass again"
                required
                className="w-full rounded-lg border border-gray-300 py-3 pl-4 pr-12
                         placeholder:text-sm focus:ring-2 focus:ring-[#489AFF] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShow2(!show2)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {show2 ? (
                  <MdVisibilityOff size={20} />
                ) : (
                  <MdVisibility size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer rounded-full bg-[#489AFF] hover:bg-[#3188e6]
                     py-3 font-semibold text-white transition"
          >
            Submit
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}

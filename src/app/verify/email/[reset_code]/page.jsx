"use client";
import HeadContact from "@/app/components/HeadContact";
import Spinner from "@/app/components/Spinner";
import Toast from "@/app/components/Toast";
import Header from "@/app/components/Header";
import { useRouter } from "next/navigation";
import NetworkInstance from "@/app/components/NetworkInstance";
import Footer from "@/app/components/Footer";
import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const { reset_code } = useParams();
  const email = searchParams.get("email");

  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const api = NetworkInstance();
  const router = useRouter();
  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await api.post("/api/email/verification-confirmation", {
        reset_code,
        email,
      });
      setTimeout(() => router.push("/email-verify-success"), 1500);
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
          onSubmit={handleVerify}
          className="w-full max-w-xl bg-white shadow-md rounded-2xl px-8 md:px-16 py-12 space-y-8"
        >
          {/* Heading */}
          <header className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold">Verify Email</h1>
            <p className="text-gray-500 text-sm">
              Click the button to verify your email
            </p>
          </header>

          <div></div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-full bg-[#489AFF] hover:bg-[#3188e6]
                     py-3 font-semibold text-white transition"
          >
            Verify
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}

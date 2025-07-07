"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiShieldCheck } from "react-icons/hi";
import DashboardLayout from "../components/DashboardLayout";
import NetworkInstance from "../components/NetworkInstance";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";

export default function DashboardHome() {
  const router = useRouter();
  const [identityNumber, setIdentityNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const networkInstance = NetworkInstance();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    try {
      const { data } = await networkInstance.post(
        "/api/kyc/validate-bvn",
        {
          identity_number: identityNumber,
          identity_type: "bvn",
          first_name: firstName,
          last_name: lastName,
          dob,
          phone_number: phoneNumber,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setToast({ message: data.message, type: "success" });
    } catch (err) {
      setToast({
        message:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {loading && <Spinner />}

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Banner */}
        <div className="flex items-center justify-center mb-4">
          <HiShieldCheck className="text-2xl text-blue-500 mr-2" />
          <h1 className="text-2xl font-semibold">Verify identity with BVN</h1>
        </div>
        <p className="text-center text-gray-600 mb-6">
          We’ll use your Bank Verification Number to confirm your identity. Your
          information is securely encrypted.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* BVN (fixed) */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Identity Type
            </label>
            <div className="w-full border border-gray-300 bg-gray-100 text-gray-500 rounded px-3 py-2">
              BVN
            </div>
          </div>

          {/* BVN Number */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Identity Number
            </label>
            <input
              type="text"
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Enter your BVN"
              required
            />
          </div>

          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
          </div>

          {/* DOB */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="000-0000-0000"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-semibold px-4 py-2 rounded transition"
          >
            Submit
          </button>
        </form>

        {/* Privacy note */}
        <p className="mt-6 text-xs text-gray-400 text-center">
          By submitting this information, you agree to our&nbsp;
          <a href="#" className="underline">
            Privacy Policy
          </a>
          &nbsp;and&nbsp;
          <a href="#" className="underline">
            Terms of Service
          </a>
          .
        </p>
      </div>
    </DashboardLayout>
  );
}

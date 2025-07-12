// app/dashboard/search/page.jsx
"use client";

import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import dynamic from "next/dynamic";
const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

import { useAuth } from "../components/AuthContext";
import NetworkInstance from "../components/NetworkInstance";
import DashboardLayout from "../components/DashboardLayout";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";

export default function SearchPage() {
  const { user } = useAuth();
  const [accountName, setAccountName] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const networkInstance = NetworkInstance();
  const PAYSTACK_PK = "pk_test_8f50f7ec5175d60bdc0fd2645df800bd3dc37b49";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPaymentData(null);

    const token = localStorage.getItem("token");
    const searchPayload = {
      account_name: accountName,
      identity_number: identityNumber,
      identity_type: "bvn",
      phone_1: phone1,
      phone_2: phone2,
      search_type: "asset_search",
    };

    try {
      // 1) Perform the asset search
      const searchRes = await networkInstance.post(
        "/api/search",
        searchPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setToast({ message: "Search successful!", type: "success" });

      const searchId = searchRes.data.data.id;

      // 2) Initialize payment immediately after
      const initRes = await networkInstance.post(
        "/api/payment/initialize",
        {
          search_id: searchId,
          currency: "NGN",
          provider: "paystack",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // store initialization details for PaystackButton
      setPaymentData(initRes.data.data);
    } catch (err) {
      console.error(err);
      setToast({
        message:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // configure Paystack only if paymentData is available
  const paystackProps = paymentData && {
    email: user.email,
    reference: paymentData.payment.reference,
    amount: paymentData.payment.amount * 100, // adjust if the shape differs
    metadata: { name: accountName, phone: phone1 },
    publicKey: PAYSTACK_PK,
    text: "Pay to View Results",
    onSuccess: () =>
      setToast({ message: "Payment Successful!", type: "success" }),
    onClose: () => alert("Payment process was cancelled."),
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

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-4 text-blue-500">
          <HiOutlineSearch className="text-2xl mr-2" />
          <h2 className="text-2xl font-semibold">Asset Search</h2>
        </div>
        <p className="text-gray-600 text-center mb-6">
          Fill the details below to search for assets.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Account Name */}
          <label className="block">
            <span className="block text-sm font-medium text-gray-700">
              Name Of Owner
            </span>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
              required
            />
          </label>

          {/* Identity Number */}
          <label className="block">
            <span className="block text-sm font-medium text-gray-700">
              Identity Number
            </span>
            <input
              type="text"
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
              required
            />
          </label>

          {/* Identity Type (fixed) */}
          <label className="block">
            <span className="block text-sm font-medium text-gray-700">
              Identity Type
            </span>
            <div className="w-full border border-gray-300 bg-gray-100 text-gray-600 rounded px-3 py-2">
              BVN
            </div>
          </label>

          {/* Phone 1 */}
          <label className="block">
            <span className="block text-sm font-medium text-gray-700">
              Phone Number Of Owner
            </span>
            <input
              type="tel"
              value={phone1}
              onChange={(e) => setPhone1(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
              required
            />
          </label>

          {/* Phone 2 */}
          <label className="block">
            <span className="block text-sm font-medium text-gray-700">
              Secondary Phone Number Of Owner
            </span>
            <input
              type="tel"
              value={phone2}
              onChange={(e) => setPhone2(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
            />
          </label>

          {/* Search Type (fixed) */}
          <label className="block">
            <span className="block text-sm font-medium text-gray-700">
              Search Type
            </span>
            <div className="w-full border border-gray-300 bg-gray-100 text-gray-600 rounded px-3 py-2">
              Asset Search
            </div>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
            disabled={loading}
          >
            Search
          </button>
        </form>

        {/* Paystack button only when paymentData is set */}
        {paymentData && (
          <div className="w-full cursor-pointer mt-3 bg-blue-950 text-center text-white font-semibold py-2 rounded transition">
            <PaystackButton {...paystackProps} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

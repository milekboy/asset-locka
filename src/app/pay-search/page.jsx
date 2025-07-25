// app/dashboard/search/page.jsx
"use client";

import React, { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter } from "next/navigation";
import {
  HiOutlineUser,
  HiIdentification,
  HiPhone,
  HiOutlineCash,
  HiOutlineCreditCard,
  HiOutlineMail,
  HiOutlineSearch,
  HiHashtag,
} from "react-icons/hi";

import { useAuth } from "../components/AuthContext";
import DashboardLayout from "../components/DashboardLayout";
import Spinner from "../components/Spinner";
import Toast from "../components/Toast";
import NetworkInstance from "../components/NetworkInstance";

// client‐only Paystack button
const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

export default function SearchResultPage() {
  return (
    <DashboardLayout>
      <Suspense fallback={<Spinner />}>
        <ResultContent />
      </Suspense>
    </DashboardLayout>
  );
}

function ResultContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const network = NetworkInstance();

  const [toast, setToast] = useState(null);
  const [confirming, setConfirming] = useState(false);

  const firstName = params.get("firstName");
  const middleName = params.get("middleName");
  const maidenName = params.get("maidenName");
  const lastName = params.get("lastName");
  const email = params.get("email");
  const phone1 = params.get("phone1");
  const phone2 = params.get("phone2");
  const bvn = params.get("bvn");
  const nin = params.get("nin");
  const searchType = params.get("searchType");
  const searchId = params.get("searchId");
  const reference = params.get("reference");
  const amount = params.get("amount");

  // const PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  const PUBLIC_KEY = "pk_test_8f50f7ec5175d60bdc0fd2645df800bd3dc37b49";

  const handleConfirm = async ({ reference: ref }) => {
    setConfirming(true);
    try {
      const token = localStorage.getItem("token");
      await network.post(
        "/api/payment/confirm",
        { reference: ref },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setToast({ message: "Payment confirmed!", type: "success" });
      router.push("/my-searches");
    } catch (err) {
      console.error(err);
      setToast({ message: "Confirmation failed.", type: "error" });
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="border-b-2 border-gray-400 px-6 py-4 flex items-center gap-2">
          <HiOutlineCreditCard className="text-2xl " />
          <h1 className=" text-xl font-semibold">Review &amp; Pay</h1>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div className="flex items-center gap-2 text-gray-700">
            <HiOutlineUser className="text-blue-500" />
            <span>
              <strong>Full Name:</strong>{" "}
              {`${firstName} ${middleName || ""} ${
                maidenName || ""
              } ${lastName}`}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <HiOutlineMail className="text-blue-500" />
            <span>
              <strong>Email:</strong> {email}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <HiIdentification className="text-blue-500" />
            <span>
              <strong>BVN:</strong> {bvn ? bvn : "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <HiIdentification className="text-blue-500" />
            <span>
              <strong>NIN:</strong> {nin ? nin : "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <HiPhone className="text-blue-500" />
            <span>
              <strong>Primary Phone:</strong> {phone1}
            </span>
          </div>

          {phone2 && (
            <div className="flex items-center gap-2 text-gray-700">
              <HiPhone className="text-blue-500" />
              <span>
                <strong>Secondary Phone:</strong> {phone2}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-gray-700">
            <HiOutlineSearch className="text-blue-500" />
            <span>
              <strong>Search Type:</strong>{" "}
              {searchType
                .replace("_", " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <HiOutlineCash className="text-blue-500" />
            <span>
              <strong>Amount:</strong> ₦{amount}
            </span>
          </div>

          {/* Paystack Button */}
          <div className="mt-6">
            <PaystackButton
              email={user.email}
              amount={Number(amount) * 100}
              reference={reference}
              publicKey={PUBLIC_KEY}
              metadata={{ name: `${firstName} ${lastName}`, phone: phone1 }}
              text="Pay to View Results"
              className="w-full cursor-pointer bg-blue-950  text-white font-semibold py-2 rounded transition disabled:opacity-50"
              onSuccess={handleConfirm}
              onClose={() => alert("Payment cancelled.")}
              disabled={confirming}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  HiOutlineUser,
  HiIdentification,
  HiPhone,
  HiOutlineCash,
  HiOutlineCreditCard,
} from "react-icons/hi";

const PaystackButton = dynamic(
  () => import("react-paystack").then((m) => m.PaystackButton),
  { ssr: false }
);
import { useAuth } from "../components/AuthContext";
import DashboardLayout from "../components/DashboardLayout";

export default function SearchResultPage() {
  const params = useSearchParams();
  const { user } = useAuth();
  const router = useRouter();
  const accountName = params.get("accountName");
  const identityNumber = params.get("identityNumber");
  const phone1 = params.get("phone1");
  const phone2 = params.get("phone2");
  const reference = params.get("reference");
  const amount = params.get("amount");

  const PUBLIC_KEY = "pk_test_8f50f7ec5175d60bdc0fd2645df800bd3dc37b49";

  return (
    <DashboardLayout>
      <div className="max-w-md mx-auto mt-8">
        {/* Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 border-b-2 border-gray-400 py-4 flex items-center gap-2">
            <HiOutlineCreditCard className="text-2xl text-whit" />
            <h1 className="text-whit text-xl font-semibold">Review & Pay</h1>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-4">
            <div className="flex items-center gap-2 text-gray-700">
              <HiOutlineUser className="text-blue-500" />
              <span>
                <strong>Owner Name:</strong> {accountName}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <HiIdentification className="text-blue-500" />
              <span>
                <strong>Identity Number:</strong> {identityNumber}
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
                metadata={{ name: accountName, phone: phone1 }}
                text="Pay to View Results"
                className="w-full cursor-pointer mt-3 bg-blue-950 text-center text-white font-semibold py-2 rounded transition"
                onSuccess={() => {
                  router.push("/my-searches");
                }}
                onClose={() => alert("Payment cancelled.")}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

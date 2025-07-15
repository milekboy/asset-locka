"use client";
import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Toast from "../components/Toast";
import DashboardLayout from "../components/DashboardLayout";
import NetworkInstance from "../components/NetworkInstance";
import Spinner from "../components/Spinner";

export default function SearchPage() {
  const router = useRouter();
  const [accountName, setAccountName] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const network = NetworkInstance();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    const payload = {
      account_name: accountName,
      identity_number: identityNumber,
      identity_type: "bvn",
      phone_1: phone1,
      phone_2: phone2,
      search_type: "asset_search",
    };

    try {
      // 1) run the search
      const { data: searchRes } = await network.post("/api/search", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToast({ message: "Search successful!", type: "success" });

      // 2) init payment
      const searchId = searchRes.data.id;
      const { data: initRes } = await network.post(
        "/api/payment/initialize",
        { search_id: searchId, currency: "NGN", provider: "paystack" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 3) pack everything into a querystring
      const qs = new URLSearchParams({
        accountName,
        identityNumber,
        phone1,
        phone2,
        searchId: String(searchId),
        reference: initRes.data.payment.reference,
        amount: String(initRes.data.payment.amount),
      }).toString();

      // 4) navigate to the result page
      router.push(`/pay-search?${qs}`);
    } catch (err) {
      console.error(err);
      setToast({
        message: err.response?.data?.message || "Something went wrong.",
        type: "error",
      });
    } finally {
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
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
        <div className="flex items-center justify-center mb-4 text-blue-500">
          <HiOutlineSearch className="text-2xl mr-2" />
          <h2 className="text-2xl font-semibold">Asset Search</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              Name of Owner
            </span>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
              required
            />
          </label>
          {/* Identity Number */}
          <label className="block">
            <span className="block text-sm font-medium text-gray-700">
              Identity Type
            </span>
            <div className="w-full border border-gray-300 bg-gray-100 text-gray-600 rounded px-3 py-2">
              BVN
            </div>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              Identity Number
            </span>
            <input
              type="text"
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
              required
            />
          </label>

          {/* Phone 1 */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              Phone Number
            </span>
            <input
              type="tel"
              value={phone1}
              onChange={(e) => setPhone1(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
              required
            />
          </label>
          {/* Phone 2 */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              Secondary Phone
            </span>
            <input
              type="tel"
              value={phone2}
              onChange={(e) => setPhone2(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            Search
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

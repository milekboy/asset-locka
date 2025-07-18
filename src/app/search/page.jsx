// src/app/dashboard/search/page.jsx
"use client";

import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useRouter } from "next/navigation";
import DashboardLayout from "../components/DashboardLayout";
import NetworkInstance from "../components/NetworkInstance";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";

export default function SearchPage() {
  const router = useRouter();
  const network = NetworkInstance();

  // form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [maidenName, setMaidenName] = useState("");
  const [email, setEmail] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [bvn, setBvn] = useState("");
  const [nin, setNin] = useState("");
  const [searchType, setSearchType] = useState("asset_search");

  // UX state
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    const payload = {
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
      maiden_name: maidenName,
      email,
      phone_1: phone1,
      phone_2: phone2,
      bvn,
      nin,
      search_type: searchType,
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
        firstName,
        lastName,
        middleName,
        maidenName,
        email,
        phone1,
        phone2,
        bvn,
        nin,
        searchType,
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

      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
        <div className="flex items-center justify-center mb-4 text-blue-500">
          <HiOutlineSearch className="text-2xl mr-2" />
          <h2 className="text-2xl font-semibold">Advanced Asset Search</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                First Name
              </span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Last Name
              </span>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
                required
              />
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Middle Name
              </span>
              <input
                type="text"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Maiden Name
              </span>
              <input
                type="text"
                value={maidenName}
                onChange={(e) => setMaidenName(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
              />
            </label>
          </div>

          {/* Contact & IDs */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
              required
            />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Phone 1</span>
              <input
                type="tel"
                value={phone1}
                onChange={(e) => setPhone1(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Phone 2</span>
              <input
                type="tel"
                value={phone2}
                onChange={(e) => setPhone2(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
              />
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">BVN</span>
              <input
                type="text"
                value={bvn}
                onChange={(e) => setBvn(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">NIN</span>
              <input
                type="text"
                value={nin}
                onChange={(e) => setNin(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
                required
              />
            </label>
          </div>

          {/* Search Type */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">
              Search Type
            </span>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full cursor-pointer border rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
            >
              <option value="asset_search">Asset Search</option>
              <option value="advanced_search">Advanced Search</option>
              <option value="premium_search">Premium Search</option>
            </select>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 cursor-pointer hover:bg-blue-600 text-white py-2 rounded transition disabled:opacity-50"
          >
            Search
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

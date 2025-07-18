// src/app/my-beneficiaries/[id]/edit/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaMars, FaVenus } from "react-icons/fa6";
import DashboardLayout from "@/app/components/DashboardLayout";
import NetworkInstance from "@/app/components/NetworkInstance";
import Toast from "@/app/components/Toast";
import Spinner from "@/app/components/Spinner";

export default function EditBeneficiaryPage() {
  const { id } = useParams();
  const router = useRouter();
  const api = NetworkInstance();

  // form state
  const [firstName, setFirstName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [relationship, setRelationship] = useState("");

  // UX
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // 1) Fetch the beneficiary to prefill form
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);
    api
      .get(`/api/beneficiary/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const b = res.data.data ?? res.data;
        setFirstName(b.first_name);
        setOtherName(b.other_name || "");
        setLastName(b.last_name);
        setGender(b.gender);
        setAddress(b.address);
        setCity(b.city);
        setStateName(b.state);
        setCountry(b.country);
        setZipcode(b.zipcode);
        setMobile(b.mobile);
        setMobile2(b.mobile2);
        setRelationship(b.relationship);
      })
      .catch((err) => {
        console.error(err);
        setToast({ message: "Failed to load beneficiary", type: "error" });
      })
      .finally(() => setLoading(false));
  }, []);

  // 2) Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    const payload = {
      first_name: firstName,
      other_name: otherName,
      last_name: lastName,
      gender,
      address,
      city,
      state: stateName,
      country,
      zipcode,
      mobile,
      mobile2,
      relationship,
    };

    try {
      await api.put(`/api/beneficiary/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToast({ message: "Beneficiary updated!", type: "success" });
      router.push("/my-beneficiaries");
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

      <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-500 px-6 py-4 flex items-center">
          <h2 className="text-white text-xl font-semibold flex-1">
            Edit Beneficiary
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "First Name", value: firstName, setter: setFirstName },
              { label: "Other Name", value: otherName, setter: setOtherName },
              { label: "Last Name", value: lastName, setter: setLastName },
            ].map(({ label, value, setter }) => (
              <div key={label}>
                <label className="block mb-1 font-medium text-gray-700">
                  {label}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
            ))}
          </div>

          {/* Gender */}
          <div>
            <span className="block mb-1 font-medium text-gray-700">Gender</span>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setGender("male")}
                className={`flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 rounded border transition ${
                  gender === "male"
                    ? "bg-blue-400 text-white border-blue-500"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-blue-50"
                }`}
              >
                <FaMars /> Male
              </button>
              <button
                type="button"
                onClick={() => setGender("female")}
                className={`flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 rounded border transition ${
                  gender === "female"
                    ? "bg-blue-400 text-white border-blue-500"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-blue-50"
                }`}
              >
                <FaVenus /> Female
              </button>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 h-20 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "City", value: city, setter: setCity },
              { label: "State", value: stateName, setter: setStateName },
              { label: "Country", value: country, setter: setCountry },
            ].map(({ label, value, setter }) => (
              <div key={label}>
                <label className="block mb-1 font-medium text-gray-700">
                  {label}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
            ))}
          </div>

          {/* Zipcode */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Zip Code
            </label>
            <input
              type="text"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Mobile", value: mobile, setter: setMobile },
              {
                label: " Alternate Mobile",
                value: mobile2,
                setter: setMobile2,
              },
            ].map(({ label, value, setter }) => (
              <div key={label}>
                <label className="block mb-1 font-medium text-gray-700">
                  {label}
                </label>
                <input
                  type="tel"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>
            ))}
          </div>

          {/* Alternate Mobile */}

          {/* Relationship */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Relationship
            </label>
            <input
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

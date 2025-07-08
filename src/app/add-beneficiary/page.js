"use client";
import { useState } from "react";
import { FaMars, FaVenus } from "react-icons/fa6";
import DashboardLayout from "../components/DashboardLayout";
import NetworkInstance from "../components/NetworkInstance";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";

export default function AddBeneficiary() {
  const networkInstance = NetworkInstance();

  // form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [telephone, setTelephone] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobile2, setMobile2] = useState("");

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
      gender,
      address,
      city,
      state,
      country,
      telephone,
      mobile,
      mobile2,
      zipcode,
    };

    console.log("Submitting beneficiary payload:", payload);

    try {
      const { data } = await networkInstance.post("/api/beneficiary", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setToast({ message: data.message, type: "success" });

      // ← clear *all* the inputs
      setFirstName("");
      setLastName("");
      setGender("");
      setAddress("");
      setCity("");
      setState("");
      setCountry("");
      setTelephone("");
      setMobile("");
      setMobile2("");
      setZipcode("");
    } catch (err) {
      console.error("Beneficiary submission error:", err);
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

      {/* Card container */}
      <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg px-4 lg:px-0 shadow-lg overflow-hidden">
        {/* Card header */}
        <div className="bg-blue-500 rounded-t-md px-6 py-4 flex items-center">
          <h2 className="text-white text-xl font-semibold flex-1">
            Add Beneficiary
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                className="w-full border border-gray-300 rounded px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-200"
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
                className="w-full border border-gray-300 rounded px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
          </div>

          {/* Gender toggle */}
          <div>
            <span className="block mb-1 font-medium text-gray-700">Gender</span>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setGender("male")}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded border
                  ${
                    gender === "male"
                      ? "bg-blue-400 cursor-pointer text-white border-blue-500"
                      : "bg-white cursor-pointer text-gray-600 border-gray-300 hover:bg-blue-50"
                  } transition`}
              >
                <FaMars /> Male
              </button>
              <button
                type="button"
                onClick={() => setGender("female")}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded border
                  ${
                    gender === "female"
                      ? "bg-blue-400 cursor-pointer text-white border-blue-500"
                      : "bg-white cursor-pointer text-gray-600 border-gray-300 hover:bg-blue-50"
                  } transition`}
              >
                <FaVenus /> Female
              </button>
            </div>
          </div>

          {/* Address block */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 h-20
                         focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Location grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
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
              className="w-full border border-gray-300 rounded px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Contact numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Telephone
              </label>
              <input
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="080-1234-5678"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Mobile
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="080-8765-4321"
                required
              />
            </div>
          </div>

          {/* Alternate Mobile */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Alternate Mobile
            </label>
            <input
              type="tel"
              value={mobile2}
              onChange={(e) => setMobile2(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Optional"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold
                       px-4 py-3 rounded-lg transition"
          >
            Save Beneficiary
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

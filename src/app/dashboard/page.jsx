"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import DashboardLayout from "../components/DashboardLayout";
import { HiOutlineTrash } from "react-icons/hi2";
import NetworkInstance from "../components/NetworkInstance";
import { FcDocument } from "react-icons/fc";
import { FaSearchLocation } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";
import Link from "next/link";
import { IoIosWarning } from "react-icons/io";
export default function DashboardHome() {
  const { user } = useAuth();
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const networkInstance = NetworkInstance();
  useEffect(() => {
    getAssets();
    getBeneficiaries();
  }, []);
  const getAssets = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await networkInstance.get("/api/asset", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAssets(res.data.data.data);
      console.log(res.data.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const getBeneficiaries = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await networkInstance.get("/api/beneficiary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBeneficiaries(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error("Error fetching Beneficiaries:", error);
    }
  };
  const handleinkRequest = async (e) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await networkInstance.post(
        `/api/email/verification-notification`,
        { email: user.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        setToast({
          message: "Verification link has been sent!",
          type: "success",
        });
      }
    } catch (error) {
      setLoading(false);
      setToast({
        message: "Please try again.",
        type: "error",
      });
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10 lg:mt-0">
        <div className="bg-white rounded-lg p-6  items-center  shadow-sm">
          <div className="flex gap-3">
            <FcDocument /> <p className="font-medium">Listed Assets</p>
          </div>

          <div className="flex gap-3">
            <p className="text-lg text-blue-400 font-semibold mt-2">
              {assets.length}
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("here")
                  .scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="btn-primary cursor-pointer  hover-up-2 ml-auto  text-center h-10 flex justify-center items-center"
            >
              View
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6  items-center  shadow-sm">
          <div className="flex gap-3">
            <FaPerson className="text-blue-400" />{" "}
            <p className="font-medium">Beneficiaries</p>
          </div>

          <div className="flex gap-3">
            <p className="text-lg text-blue-400 font-semibold mt-2">
              {beneficiaries.length}
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("beneficiaries")
                  .scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="btn-primary cursor-pointer  hover-up-2 ml-auto  text-center h-10 flex justify-center items-center"
            >
              View
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6  items-center  shadow-sm">
          <div className="flex gap-3">
            <FaSearchLocation className="text-blue-400 " />
            <p className="font-medium">Searched Assets</p>
          </div>

          <div className="flex gap-3">
            <p className="text-lg text-blue-400 font-semibold mt-2">1</p>
            <Link
              href="/login"
              className="btn-primary  hover-up-2 ml-auto  text-center h-10 flex justify-center items-center"
            >
              View
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 flex items-center gap-3 shadow-sm mt-16">
        <div>
          <p>
            <IoIosWarning className="text-red-500" /> Email Verification
            required
          </p>
          <p>
            Please verify your email address to access all features.{" "}
            <span
              onClick={handleinkRequest}
              className="underline cursor-pointer"
            >
              Click here to resend verification email
            </span>
          </p>
        </div>
      </div>
      <div
        id="here"
        className="bg-white rounded-lg p-6 flex flex-col shadow-sm mt-16"
      >
        <p className="text-center text-gray-500 text-xl font-bold">Assets</p>
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
              <tr>
                <th className="py-3 px-4">Property</th>
                <th className="py-3 px-4">Assigned&nbsp;to</th>
                <th className="py-3 px-4 text-center">Category</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4">{asset.title}</td>
                  <td className="py-3 px-4">{asset.description}</td>
                  <td className="py-3 px-4 text-center">
                    {asset.category.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        id="beneficiaries"
        className="bg-white rounded-lg p-6 flex flex-col shadow-sm mt-16"
      >
        <p className="text-center text-gray-500 text-xl font-bold">
          Beneficiaries
        </p>
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
              <tr>
                <th className="py-3 px-4">Full Name</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4 text-center">Contact</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {beneficiaries.map((beneficiary) => (
                <tr key={beneficiary.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4">
                    {beneficiary.last_name + " " + beneficiary.first_name}
                  </td>
                  <td className="py-3 px-4">{beneficiary.city}</td>
                  <td className="py-3 px-4 text-center">
                    {beneficiary.mobile}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

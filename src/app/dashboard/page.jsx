"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import DashboardLayout from "../components/DashboardLayout";
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
  const [searches, setSearches] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const networkInstance = NetworkInstance();
  useEffect(() => {
    getAssets();
    getBeneficiaries();
    getSearches();
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
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const getSearches = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await networkInstance.get("/api/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSearches(res.data.data);
    } catch (error) {
      console.error("Error fetching searches:", error);
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
      <div className="bg-white rounded-lg p-6 flex items-center gap-3 shadow-sm  mt-10 lg:mt-0">
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-16">
        <div className="bg-white rounded-lg p-6  items-center  shadow-sm">
          <div className="flex gap-3">
            <FcDocument /> <p className="font-medium">Listed Assets</p>
          </div>

          <div className="flex gap-3">
            <p className="text-lg text-blue-400 font-semibold mt-2">
              {assets.length}
            </p>
            <Link
              className="btn-primary cursor-pointer  hover-up-2 ml-auto  text-center h-10 flex justify-center items-center"
              href="/my-assets"
            >
              <button>View</button>
            </Link>
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

            <Link
              className="btn-primary   hover-up-2 ml-auto  text-center h-10 flex justify-center items-center"
              href="/my-beneficiaries"
            >
              <button>View</button>
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6  items-center  shadow-sm">
          <div className="flex gap-3">
            <FaSearchLocation className="text-blue-400 " />
            <p className="font-medium">Searched Assets</p>
          </div>

          <div className="flex gap-3">
            <p className="text-lg text-blue-400 font-semibold mt-2">
              {searches.length}
            </p>
            <Link
              href="/my-searches"
              className="btn-primary  hover-up-2 ml-auto  text-center h-10 flex justify-center items-center"
            >
              View
            </Link>
          </div>
        </div>
      </div>
      {assets.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl bg-blue-50 p-8  w-full text-center mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            You haven’t added any assets yet
          </h3>
          <p className="text-gray-500 mb-6">
            Secure your loved ones’ future by listing your first asset now.
          </p>
          <Link
            href="/add-asset"
            className="bg-[#489AFF] hover:bg-[#3188e6] transition text-white font-semibold px-6 py-3 rounded-lg"
          >
            + Add your first asset
          </Link>
        </div>
      ) : (
        <div className="mt-10">
          <Link
            href="/add-asset"
            className="bg-[#489AFF] hover:bg-[#3188e6] transition text-white font-semibold px-5 py-3 rounded-lg ms-4 lg:ms-0"
          >
            + Add Asset
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HiOutlinePlusCircle, HiOutlineTrash } from "react-icons/hi";
import DashboardLayout from "../components/DashboardLayout";
import NetworkInstance from "../components/NetworkInstance";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";

export default function MyBeneficiariesPage() {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const networkInstance = NetworkInstance();

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  const fetchBeneficiaries = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await networkInstance.get("/api/beneficiary", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBeneficiaries(res.data.data);
    } catch (err) {
      console.error(err);
      setToast({ message: "Failed to load beneficiaries.", type: "error" });
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

      <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8 mt-8 space-y-6">
        {/* Header + Add Beneficiary */}
        <div className="lg:flex  space-y-4 items-center justify-between px-5">
          <h1 className="text-2xl font-semibold text-gray-800">
            My Beneficiaries
          </h1>
          <Link
            href="/add-beneficiary"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
          >
            <HiOutlinePlusCircle className="text-xl" />
            Add Beneficiary
          </Link>
        </div>

        {/* Beneficiaries Table */}
        <div className="bg-white shadow rounded-lg lg:overflow-x-auto  overflow-x-scroll w-screen lg:w-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {beneficiaries.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {`${b.last_name} ${b.first_name}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{b.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{b.mobile}</td>
                </tr>
              ))}

              {!loading && beneficiaries.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No beneficiaries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

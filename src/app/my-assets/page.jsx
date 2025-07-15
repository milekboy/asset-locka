// src/app/my-assets/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HiOutlinePlusCircle, HiOutlineTrash } from "react-icons/hi";
import DashboardLayout from "../components/DashboardLayout";
import NetworkInstance from "../components/NetworkInstance";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";

export default function MyAssetsPage() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const networkInstance = NetworkInstance();

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await networkInstance.get("/api/asset", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssets(res.data.data.data);
    } catch (err) {
      console.error(err);
      setToast({ message: "Failed to load assets.", type: "error" });
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
        {/* Header + Add Asset Button */}
        <div className="lg:flex  space-y-4 items-center justify-between px-5">
          <h1 className="text-2xl font-semibold text-gray-800">My Assets</h1>
          <Link
            href="/add-asset"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
          >
            <HiOutlinePlusCircle className="text-xl" />
            Add Asset
          </Link>
        </div>

        {/* Assets Table */}
        <div className="bg-white shadow rounded-lg lg:overflow-x-auto overflow-x-scroll w-screen lg:w-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{asset.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {asset.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {asset.category?.name}
                  </td>
                </tr>
              ))}
              {assets.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    You have no assets yet.
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

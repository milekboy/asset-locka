"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardLayout from "@/app/components/DashboardLayout";
import NetworkInstance from "@/app/components/NetworkInstance";
import Toast from "@/app/components/Toast";
import Spinner from "@/app/components/Spinner";

export default function EditAssetPage() {
  const { id } = useParams(); // Next 13 App Router hook
  const router = useRouter();
  const api = NetworkInstance();

  // form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [accountId, setAccountId] = useState("");
  const [company, setCompany] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [status, setStatus] = useState("active");

  // lookup data
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // UX
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // 1) load asset + categories on mount
  useEffect(() => {
    const token = localStorage.getItem("token");

    // fetch categories once
    api
      .get("/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCategories(res.data.data ?? res.data))
      .catch(console.error);

    // fetch the asset to edit
    setLoading(true);
    api
      .get(`/api/asset/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        const a = data.data ?? data;
        setTitle(a.title);
        setDescription(a.description);
        setAccountId(a.account_id);
        setCompany(a.company);
        setCategoryId(a.category_id);
        setSubcategories(a.category.subcategories || []);
        setSubcategoryId(a.subcategory_id);
        setStatus(a.status);
      })
      .catch((err) => {
        console.error(err);
        setToast({ message: "Failed to load asset", type: "error" });
      })
      .finally(() => setLoading(false));
  }, []);

  // when user picks a new category, update subcategories
  const handleCategoryChange = (e) => {
    const cid = Number(e.target.value);
    setCategoryId(cid);
    setSubcategoryId("");
    const cat = categories.find((c) => c.id === cid);
    setSubcategories(cat?.subcategories || []);
  };

  // submit updated asset
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    const payload = {
      title,
      description,
      account_id: accountId,
      company,
      category_id: categoryId,
      subcategory_id: subcategoryId,
      status,
    };

    try {
      await api.put(`/api/asset/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToast({ message: "Asset updated!", type: "success" });
      router.push("/my-assets");
    } catch (err) {
      console.error(err);
      setToast({
        message: err.response?.data?.message || "Update failed.",
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

      <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="bg-blue-500 px-6 py-4 rounded-t-lg">
          <h2 className="text-white text-xl font-semibold">Edit Asset</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Company & Account ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Account ID</label>
              <input
                type="number"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
          </div>

          {/* Category & Subcategory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select
                value={categoryId}
                onChange={handleCategoryChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Subcategory</label>
              <select
                value={subcategoryId}
                onChange={(e) => setSubcategoryId(Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
                required
              >
                <option value="" disabled>
                  {subcategories.length
                    ? "Select subcategory"
                    : "Choose category first"}
                </option>
                {subcategories.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded transition"
            disabled={loading}
          >
            Save Changes
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

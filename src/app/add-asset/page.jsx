"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import NetworkInstance from "../components/NetworkInstance";
import Toast from "../components/Toast";
import Spinner from "../components/Spinner";

export default function AddAsset() {
  const networkInstance = NetworkInstance();

  // form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [location, setLocation] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [status, setStatus] = useState("active");

  // fetched data
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // UX state
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // 1. load all categories on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    networkInstance
      .get("/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // if your endpoint wraps data under `data.data`
        setCategories(res.data.data ?? res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // 2. when category changes, pick its nested subcategories
  const handleCategoryChange = (e) => {
    const id = Number(e.target.value);
    setCategoryId(id);
    setSubcategoryId("");
    const cat = categories.find((c) => c.id === id);
    setSubcategories(cat?.subcategories || []);
  };

  // 3. submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    const payload = {
      title,
      description,
      value: parseFloat(value),
      location,
      category_id: categoryId,
      subcategory_id: subcategoryId,
      status,
    };

    console.log("Submitting asset payload:", payload);

    try {
      const { data } = await networkInstance.post("/api/assets", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setToast({ message: data.message || "Asset added!", type: "success" });

      setTitle("");
      setDescription("");
      setValue("");
      setLocation("");
      setCategoryId("");
      setSubcategoryId("");
      setStatus("active");
      setSubcategories([]);
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

      <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* header bar */}
        <div className="bg-blue-500 px-6 py-4">
          <h2 className="text-white text-xl font-semibold">Add Asset</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Value & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Value (₦)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
          </div>

          {/* Category & Subcategory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select
                value={categoryId || ""}
                onChange={handleCategoryChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
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
                value={subcategoryId || ""}
                onChange={(e) => setSubcategoryId(Number(e.target.value))}
                disabled={!categoryId}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              >
                <option value="" disabled>
                  {categoryId ? "Select subcategory" : "Choose category first"}
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
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-400 hover:bg-blue-600 text-white font-semibold py-3 rounded transition"
          >
            Save Asset
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

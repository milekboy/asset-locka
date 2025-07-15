"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import Footer from "./Footer";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // <AuthProvider>
    <div className="min-h-screen bg-slate-40 flex flex-col">
      {/* ── TOP BAR (full-width) ─────────────────────────── */}
      <div className="bg-black py-[10px] top-0 right-0 z-50 text-white text-center w-full ">
        Contact us: +2347035361770
      </div>
      {/* ── BODY: sidebar + main pane ────────────────────── */}
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* right-hand column */}
        <div className="flex-1 md:ml-64 flex flex-col">
          <DashboardHeader onBurgerClick={() => setSidebarOpen(true)} />

          <main className="flex-1 pt-16 lg:p-6 md:p-24 mb-40 mt-10">
            {children}
          </main>

          <Footer />
        </div>
      </div>
    </div>
    // </AuthProvider>
  );
}

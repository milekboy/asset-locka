"use client";
import { useState } from "react";
import HeadContact from "./HeadContact";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import Footer from "./Footer";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    /* column layout ── top-bar, then body row, then footer  */
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* ── TOP BAR (full-width) ─────────────────────────── */}
      <HeadContact />

      {/* ── BODY: sidebar + main pane ────────────────────── */}
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        {/* right-hand column */}
        <div className="flex-1 md:ml-64 flex flex-col">
          <DashboardHeader onBurgerClick={() => setSidebarOpen(true)} />

          <main className="flex-1 pt-16 p-6 md:p-24 ">{children}</main>

          <Footer />
        </div>
      </div>
    </div>
  );
}

import DashboardHeader from "./DashboardHeader";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      {/* everything that sits to the right of the sidebar */}
      <div className="flex-1 md:ml-64">
        {" "}
        {/* 16 rem = sidebar width */}
        <DashboardHeader />
        {/* pt-16 keeps content clear of the header */}
        <main className="pt-16 p-6 md:p-24 overflow-y-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

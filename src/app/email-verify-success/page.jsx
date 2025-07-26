"use client";

import HeadContact from "@/app/components/HeadContact";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { AiFillCheckCircle } from "react-icons/ai";
import Link from "next/link";

export default function EmailVerified() {
  return (
    <>
      <HeadContact />
      <Header />

      {/* ── centre the card ─────────────────────────────────────────────── */}
      <main className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-16">
        <section
          className="
            w-full max-w-md
            rounded-2xl bg-white shadow-md
            px-10 lg:px-14 py-14 text-center space-y-8
          "
        >
          {/* green tick */}
          <div className="flex justify-center">
            <span
              className="inline-flex items-center justify-center
                             w-28 h-28 rounded-full bg-[#EDF5FF]"
            >
              <AiFillCheckCircle size={72} className="text-green-600" />
            </span>
          </div>

          {/* copy */}
          <header className="space-y-2">
            <h1 className="text-2xl font-semibold">Email Verified !</h1>
            <p className="text-gray-500 text-sm">
              You have Verified your email
            </p>
          </header>

          {/* CTA */}
          <Link
            href="/login"
            className="
              block w-full rounded-full bg-[#489AFF] hover:bg-[#3188e6]
              py-3 font-medium text-white transition
            "
          >
            Go&nbsp;to&nbsp;Login
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}

// components/AboutWhy.jsx
import { FaUserAlt, FaUsers, FaPeace } from "react-icons/fa";

export default function AboutWhy() {
  return (
    <section className="px-4">
      <section className=" mt-12 flex justify-center bg-[#EDF5FF] py-16 lg:py-16">
        <div className="text-center space-y-14">
          {/* ── Heading ───────────────────────────────────── */}
          <header>
            <h2 className="text-2xl lg:text-3xl font-extrabold">
              Why <span className="text-[#489AFF]">AssetLocka</span> Exist?
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Too many people pass away without clearly defined wills or digital
              footprints
            </p>
          </header>

          {/* ── 3-column benefit grid ────────────────────── */}
          <div className="grid gap-10 lg:gap-8 lg:grid-cols-3">
            {/* Item 1 */}
            <article className="space-y-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#489AFF]/90 text-white text-xl">
                <FaUserAlt />
              </span>

              <h3 className="font-semibold leading-tight">
                For the everyday person who wants to plan wisely
              </h3>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">
                Asset planning is one of the best gifts you can give yourself to
                track all your scattered e-assets.
              </p>
            </article>

            {/* Item 2 */}
            <article className="space-y-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#489AFF]/90 text-white text-xl">
                <FaUsers />
              </span>

              <h3 className="font-semibold leading-tight">
                For the loved one left behind <br /> trying to make sense of
                what’s next
              </h3>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">
                Asset planning is one of the best gifts you can give yourself to
                track all your scattered e-assets.
              </p>
            </article>

            {/* Item 3 */}
            <article className="space-y-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#489AFF]/90 text-white text-xl">
                <FaPeace />
              </span>

              <h3 className="font-semibold leading-tight">
                Ensuring peace of mind for the living <br /> &amp; clarity for
                the next generation.
              </h3>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">
                Asset planning is one of the best gifts you can give yourself to
                track all your scattered e-assets.
              </p>
            </article>
          </div>
        </div>
      </section>
    </section>
  );
}

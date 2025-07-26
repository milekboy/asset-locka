import AboutWhy from "../components/AnotherWhy";
import Footer from "../components/Footer";
import HeadContact from "../components/HeadContact";
import Header from "../components/Header";

// components/AboutUsCard.jsx
export default function AboutUsCard() {
  return (
    <>
      <HeadContact />
      <Header />
      <div className="    py-12 lg:py-20 bg-gray-50">
        <article className="    overflow-hidden">
          <div className="px-4">
            <div className="relative  h-56 sm:h-72 lg:h-[850px]">
              {/* image */}
              <img
                src="/locka_files/about-us.jpg"
                alt="Silhouette of a business team"
                className="absolute inset-0 h-full  w-full object-cover"
              />

              {/* dark overlay */}
              <div className="absolute  inset-0 bg-black/50 mix-blend-multiply" />

              {/* heading */}
              <h2
                className="relative z-10 flex h-full items-center justify-center
                 text-white text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide"
              >
                ABOUT&nbsp;US
              </h2>
            </div>
          </div>

          <section className="px-4">
            <section className="bg-white px-4 py-8 mt-8 rounded-lg space-y-6 leading-relaxed text-[15px] text-gray-700">
              <h3 className="text-center text-lg sm:text-xl font-semibold">
                Preserve your{" "}
                <span className="text-[#489AFF] font-bold">legacy</span>,&nbsp;
                Protect your{" "}
                <span className="text-[#489AFF] font-bold">loved ones</span>.
              </h3>

              <p>
                At <span className="text-[#489AFF] font-bold ">AssetLocka</span>
                , we believe that no legacy should be lost and no loved one
                should be left in the dark.
                <br /> We are a digital legacy platform built to help
                individuals secure their personal assets and ensure that when
                the time
                <br /> comes, their loved ones can access them easily,
                transparently, and safely.
              </p>

              {/* ▸ Asset owners */}
              <div>
                <h4 className="font-bold text-gray-900 text-lg">
                  For <span className="text-[#489AFF]">Asset Owners</span>
                </h4>
                Life is unpredictable — but your legacy doesn’t have to be.
                <br /> With <span className="text-[#489AFF]">AssetLocka</span>,
                you can:
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>Safely store your important asset information.</li>
                  <li>Assign trusted beneficiaries.</li>
                  <li>
                    Set clear rules for access after you’re gone or unavailable.
                  </li>
                </ul>
                <p>
                  We give you peace of mind knowing that the people who matter
                  will always have what they need, when they need it.
                </p>
              </div>

              {/* ▸ Next of kin */}
              <div>
                <h4 className="font-bold text-gray-900 text-lg">
                  For <span className="text-[#489AFF]">Next of Kin</span>
                </h4>
                In difficult times, we help you find what matters.
                <br />
                If a loved one has passed on or become unavailable, AssetLocka
                empowers you to:
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>Submit a secure asset claim</li>
                  <li>Verify your relationship</li>
                  <li>Access listed assets entrusted to you</li>
                </ul>
                <p>We make this process simple, respectful, and transparent.</p>
              </div>

              {/* ▸ Mission */}
              <div>
                <h4 className="font-bold text-gray-900 text-lg">
                  Our <span className="text-[#489AFF]">Mission</span>
                </h4>

                <p>
                  To make legacy planning and asset access simple, secure, and
                  accessible to all families — no matter the complexity of{" "}
                  <br />
                  their lives or assets.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 text-lg">
                  Let's Build <span className="text-[#489AFF]">Trust,</span>{" "}
                  Together!
                </h4>

                <p>
                  AssetLocka is not just a platform — it’s a bridge between now
                  and next.
                  <br /> Join us in creating a future where your assets never go
                  missing and your loved ones never feel lost.
                </p>
              </div>
            </section>
          </section>
          <AboutWhy />
        </article>
      </div>
      <Footer />
    </>
  );
}

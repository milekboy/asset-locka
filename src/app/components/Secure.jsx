import Link from "next/link";
export default function Secure() {
  const steps = [
    {
      number: 1,
      title: "Create An Account",
      desc: "You create a secure account to manage your assets.",
    },
    {
      number: 2,
      title: "List Your Assets",
      desc: "Begin to document, catalog and assign all your valuable \n assets in one place.",
    },
    {
      number: 3,
      title: "Secure Exit",
      desc: "We ensures that your assets are protected and \n accessible to your loved ones in the event of your \n passing.",
    },
  ];
  return (
    <div data-aos="fade-up" className=" w-[100%] lg:flex h-screen ">
      <div className="lg:w-[50%] lg:px-[2.5rem] px-[1rem] flex  items-center">
        <div className="w-full mt-10 lg:mt-0">
          <p className="lg:text-4xl text-2xl font-extrabold tracking-normal lg:leading-12 text-left">
            <span className="text-blue-600">AssetLocka</span> helps you to
            secure your loved ones.
          </p>
          <p className="text-gray-400 leading-8  text-left mt-4">
            Decide Today, Tomorrow is not promised to anyone. Make sure all
            <br className="hidden md:block" /> you have worked for all your
            years is not in vain. If you do not decide
            <br className="hidden md:block" />
            now, your assets may end up in end the wrong hands.
          </p>
          <div className=" lg:flex lg:space-x-4 mt-7 w-40 space-y-4">
            <Link
              href="/register"
              className="btn-primary w-full hover-up-2 lg:w-32 text-center h-10 flex justify-center items-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
      <div
        data-aos="fade-up"
        className="lg:w-[50%] px-[1rem]  flex items-center mt-5 lg:mt-0"
      >
        <div className=" space-y-16 lg:mt-36 mt-10">
          {steps.map((step) => (
            <div key={step.number} className="flex items-start gap-4">
              <div className="lg:w-16 w-10 h-10 font-bold  lg:h-16 flex items-center justify-center rounded-full bg-blue-50 text-blue-600  text-2xl">
                {step.number}
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-800">
                  {step.title}
                </h4>
                <p className="text-gray-400 leading-8 whitespace-pre-line">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

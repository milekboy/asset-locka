import useHasMounted from "./hooks/useHasMounted";

const FeatureCard = ({ icon, title, description }) => {
  const hasMounted = useHasMounted();

  return (
    <div
      // {...(hasMounted && { "data-aos": "fade-up" })}
      className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
    >
      <div className="w-full flex justify-center">
        <div className="text-3xl text-blue-500 mb-4">{icon}</div>
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm font-[500]">{description}</p>
    </div>
  );
};

export default FeatureCard;

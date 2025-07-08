import { useAuth } from "./AuthContext";
import { FaCircleUser } from "react-icons/fa6";
import { HiOutlineMenu } from "react-icons/hi";
export default function DashboardHeader({ onBurgerClick }) {
  const { user } = useAuth();
  return (
    <>
      <header
        className="sticky top-0  left-0 md:left-[16rem] right-0 h-16
             bg-white border-b border-slate-200 z-20
             flex items-center justify-end lg:px-12 px-9"
      >
        <div className="flex gap-3 px-7  ">
          <button
            className="md:hidden  top-4 left-0 z-40 absolute ms-6 text-2xl text-blue-500"
            onClick={onBurgerClick}
          >
            <HiOutlineMenu />
          </button>
          <FaCircleUser className="text-4xl text-blue-400" />
          <p className="font-extrabold text-gray-500 mt-2 ">
            Hi, {user ? <span> {user.first_name}!</span> : <span> User</span>}
          </p>
        </div>
      </header>
    </>
  );
}

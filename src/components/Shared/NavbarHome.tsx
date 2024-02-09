"use client";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import CustomButton from "../CustomButton/CustomButton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userLoggedOut } from "@/redux/features/auth/authSlice";

const NavbarHome = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  // handle toggle
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };
  const pathName = usePathname();
  const items = (
    <>
      <Link
        href="/"
        className={`text-white ${
          pathName === "/" ? "text-yellow-500" : "text-white no-underline	"
        } hover:line-through transition-all duration-700`}
      >
        <li className="cursor-pointer ">Home</li>
      </Link>
      <Link
        href="/about"
        className={`text-white ${
          pathName === "/about" ? "text-yellow-500" : "text-white no-underline	"
        } hover:line-through transition-all duration-700`}
      >
        {" "}
        <li className="cursor-pointer">About</li>
      </Link>
      <Link
        href="/donation"
        className={`text-white ${
          pathName === "/donation"
            ? "text-yellow-500"
            : "text-white no-underline	"
        } hover:line-through transition-all duration-700`}
      >
        {" "}
        <li className="cursor-pointer">Donation</li>
      </Link>
      <Link
        href="/stat"
        className={`text-white ${
          pathName === "/stat" ? "text-yellow-500" : "text-white no-underline	"
        } hover:line-through transition-all duration-700`}
      >
        {" "}
        <li className="cursor-pointer">Statistics</li>
      </Link>
      <Link
        href="/volunteer"
        className={`text-white ${
          pathName === "/volunteer"
            ? "text-yellow-500"
            : "text-white no-underline	"
        } hover:line-through transition-all duration-700`}
      >
        <li className="cursor-pointer">Volunteer</li>
      </Link>
      <Link
        href="/faqs"
        className={`text-white ${
          pathName === "/faqs" ? "text-yellow-500" : "text-white no-underline	"
        } hover:line-through transition-all duration-700`}
      >
        <li className="cursor-pointer">FAQs</li>
      </Link>
      <Link
        href="/contact"
        className={`text-white ${
          pathName === "/contact"
            ? "text-yellow-500"
            : "text-white no-underline	"
        } hover:line-through transition-all duration-700`}
      >
        <li className="cursor-pointer">Contact Us</li>
      </Link>
      {user?.email ? (
        <>
          <Link
            href={`${
              user?.role === "admin" ? "/admin/profile" : "/user/profile"
            }`}
            className={`text-white ${
              pathName === "/user/profile"
                ? "text-yellow-500"
                : "text-white no-underline	"
            } hover:line-through transition-all duration-700`}
          >
            <li className="cursor-pointer">Profile</li>
          </Link>
          <button
            onClick={handleLogout}
            className={`text-white  hover:line-through transition-all duration-700 py-2 px-4 rounded-xl bg-orange-500 border-none cursor-auto`}
          >
            <li className="cursor-pointer">Logout</li>
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className={`text-white ${
              pathName === "/login"
                ? "text-yellow-500"
                : "text-white no-underline	"
            } hover:line-through transition-all duration-700`}
          >
            <li className="cursor-pointer">Login</li>
          </Link>
          <Link
            href="/signup"
            className={`text-white ${
              pathName === "/signup"
                ? "text-yellow-500"
                : "text-white no-underline	"
            } hover:line-through transition-all duration-700`}
          >
            <li className="cursor-pointer">Register</li>
          </Link>
        </>
      )}
      <Link
        href="/user/donate"
        className={`text-white ${
          pathName === "/contact"
            ? "text-yellow-500"
            : "text-white no-underline	"
        } `}
      >
        <CustomButton btnText={"Donate Now"} />
      </Link>
    </>
  );
  return (
    <div className="lg:flex justify-around items-center bg-gray-900 rounded px-10 py-2 cursor-auto fixed top-0 w-full z-50">
      <div className="flex items-center gap-10 ">
        <div
          className="text-white text-2xl font-bold lg:hidden block"
          onClick={handleOpen}
        >
          {open ? <IoMdClose /> : <CiMenuBurger />}
        </div>

        <Link href={"/"} className="cursor-pointer ">
          <Image src={logo} height={50} width={200} alt="logo" />
        </Link>
      </div>
      <div className=" text-white hidden lg:flex items-center overflow-auto xl:overflow-visible">
        <ul className="list-none lg:flex gap-10 items-baseline">{items}</ul>
      </div>

      <div
        className={`${
          open ? "block" : "hidden"
        } bg-black transition-all duration-1000 p-3 mt-3 rounded-xl`}
      >
        <ul className={`list-none lg:hidden no-underline flex flex-col gap-3`}>
          {items}
        </ul>
      </div>
    </div>
  );
};

export default NavbarHome;

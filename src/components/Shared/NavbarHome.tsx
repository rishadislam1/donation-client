"use client";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { IoMdClose } from "react-icons/io";

const NavbarHome = () => {
  const [open, setOpen] = useState(false);

  // handle toggle
  const handleOpen = () => {
    setOpen(!open);
  };
  const pathName = usePathname();
  const items = (
    <>
      <Link
        href="/"
        className={`text-white ${
          pathName === "/" ? "text-yellow-500" : "text-white no-underline	"
        } hover:line-through`}
      >
        <li className="cursor-pointer">Home</li>
      </Link>
      <Link
        href="/about"
        className={`text-white ${
          pathName === "/about" ? "text-yellow-500" : "text-white no-underline	"
        } hover:line-through`}
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
        } hover:line-through`}
      >
        {" "}
        <li className="cursor-pointer">Donation</li>
      </Link>
      <Link
        href="/stat"
        className={`text-white ${
          pathName === "/stat" ? "text-yellow-500" : "text-white no-underline	"
        } hover:line-through`}
      >
        {" "}
        <li className="cursor-pointer">Statistics</li>
      </Link>
      <Link
        href="/blog"
        className={`text-white ${
          pathName === "/blog" ? "text-yellow-500" : "text-white no-underline	"
        } hover:line-through`}
      >
        <li className="cursor-pointer">Blog</li>
      </Link>
      <Link
        href="/volunteer"
        className={`text-white ${
          pathName === "/volunteer"
            ? "text-yellow-500"
            : "text-white no-underline	"
        } hover:line-through`}
      >
        <li className="cursor-pointer">Volunteer</li>
      </Link>
      <Link
        href="/faqs"
        className={`text-white ${
          pathName === "/faqs" ? "text-yellow-500" : "text-white no-underline	"
        } hover:line-through`}
      >
        <li className="cursor-pointer">FAQs</li>
      </Link>
      <Link
        href="/contact"
        className={`text-white ${
          pathName === "/contact"
            ? "text-yellow-500"
            : "text-white no-underline	"
        } hover:line-through`}
      >
        <li className="cursor-pointer">Contact Us</li>
      </Link>
      <Link
        href="/donate"
        className={`text-white ${
          pathName === "/contact"
            ? "text-yellow-500"
            : "text-white no-underline	"
        } hover:line-through`}
      >
        <button className="cursor-pointer py-2 px-5 bg-green-500 outline-lime-400 border-none text-gray-900 font-bold rounded-xl hover:bg-[#EB9309] hover:text-white transition-all duration-700">
          Donate Now
        </button>
      </Link>
    </>
  );
  return (
    <div className="lg:flex justify-between items-center bg-gray-900 rounded px-10 py-2">
      <div className="flex items-center gap-10">
        <div
          className="text-white text-2xl font-bold lg:hidden block"
          onClick={handleOpen}
        >
          {open ? <IoMdClose /> : <CiMenuBurger />}
        </div>
        <Link href={"/"} className="cursor-pointer">
          <Image src={logo} height={50} width={200} alt="logo" />
        </Link>
      </div>
      <div className=" text-white hidden lg:flex overflow-auto">
        <ul className="list-none lg:flex gap-10 no-underline">{items}</ul>
      </div>
      <div>
        <div
          className={`${
            open ? "block" : "hidden"
          } bg-black transition-all duration-1000 p-3 mt-3 rounded-xl`}
        >
          <ul
            className={`list-none lg:hidden no-underline flex flex-col gap-3
          }`}
          >
            {items}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarHome;

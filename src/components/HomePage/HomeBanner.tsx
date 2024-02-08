"use client";
import banner from "@/assets/homeBanner.png";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const HomeBanner = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div
      className="flex flex-col justify-center items-center mt-14"
      data-aos="fade-left"
    >
      <h3>GIVE YOUR HAND</h3>
      <h1 className="text-xl lg:text-4xl">TO THE HOMELESS</h1>
      <div className="xl:hidden">
        <Image src={banner} width={"300"} height={"10px"} alt="banner" />
      </div>
      <div className="hidden xl:block">
        <Image src={banner} width={"100%"} height={"10px"} alt="banner" />
      </div>
    </div>
  );
};

export default HomeBanner;

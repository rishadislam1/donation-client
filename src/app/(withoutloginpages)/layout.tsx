"use client";
import NavbarHome from "@/components/Shared/NavbarHome";
import UseAuthCheck from "@/components/hooks/useAuthCheck";
import GetAllUser from "@/lib/getAllUser";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const authCheck = UseAuthCheck();
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    
    <div>
      <NavbarHome />
      {children}
    </div>
  );
};

export default HomeLayout;

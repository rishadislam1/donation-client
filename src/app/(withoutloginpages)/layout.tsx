"use client";
import NavbarHome from "@/components/Shared/NavbarHome";
import UseAuthCheck from "@/components/hooks/useAuthCheck";
import GetAllUser from "@/lib/getAllUser";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const authCheck = UseAuthCheck();
  
  return (
    
    <div>
      <NavbarHome />
      {children}
    </div>
  );
};

export default HomeLayout;

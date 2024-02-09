"use client";
import { useAppSelector } from "@/redux/hooks";

const AdminProfile = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div  data-aos="fade-right">
      <h1>Welcome Back Admin {user?.name}</h1>
    </div>
  );
};

export default AdminProfile;

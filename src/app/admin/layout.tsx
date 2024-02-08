"use client";

import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";

const AdminLayout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // Access localStorage directly
    const allData = JSON.parse(localStorage?.getItem("auth"));

    // Dispatch userLoggedIn action with data from localStorage
    dispatch(
      userLoggedIn({
        accessToken: allData?.user.accessToken,
        user: allData?.user.newUser,
      })
    );
  }, [dispatch]);
  
  return <div></div>;
};

export default AdminLayout;

"use client";

import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

const UserLayout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // Access localStorage directly
    const allData = JSON.parse(localStorage?.getItem("auth"));

    if (allData?.user.role !== "user") {
      Swal.fire({
        title: "Fail",
        text: "Unauthorized User",
        icon: "error",
        confirmButtonText: "LogIn",
      });
      return redirect("/login");
    }
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

export default UserLayout;

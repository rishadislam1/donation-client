"use client";

import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { SessionProvider, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";

const HandleLogin = () => {
  return (
    <SessionProvider session={null}>
      <HandleLoginContent />
    </SessionProvider>
  );
};

const HandleLoginContent = () => {
  const [register, { data: registerUser, isLoading }] = useRegisterMutation();
  const { data: session } = useSession();
  const user = session?.user;

  const name = session?.user?.name;
  const email = session?.user?.email;
  const img = session?.user?.image;

  useEffect(() => {
    const data = {
      name: name,
      email: email,
      img: img,
    };

    register(data);
  }, [name, email, img, register]);

  const dispatch = useAppDispatch();

  if (isLoading) {
    <BallTriangle
      height={100}
      width={100}
      radius={5}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />;
  } else if (!isLoading && registerUser) {
    localStorage.setItem(
      "auth",
      JSON.stringify({
        accessToken: registerUser?.accessToken,
        user: registerUser?.result,
      })
    );
    dispatch(
      userLoggedIn({
        accessToken: registerUser?.accessToken,
        user: registerUser?.result,
      })
    );
    return redirect("/user/profile");
  }
};

export default HandleLogin;

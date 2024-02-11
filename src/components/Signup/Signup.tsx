"use client";

import signupImg from "@/assets/signup-image.jpg";
import Image from "next/image";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Input } from "antd";
import CustomButton from "../CustomButton/CustomButton";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";

const Signup = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { user } = useAppSelector((state) => state.auth);

  // signup apis

  const [register, { data: signUpData, isLoading }] = useRegisterMutation();

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "your password and confirm password does not match",
        icon: "error",
        confirmButtonText: "Put It Again",
      });
    } else {
      const data = {
        email,
        name,
        password,
      };
      register(data);
    }
  };

  // check
  if (!isLoading && signUpData) {
    Swal.fire({
      title: "Success",
      text: "Registration Successful. Now go to login and login with your credential",
      icon: "success",
      confirmButtonText: "Thanks",
    });
  }
  // google
  const handleGoogle = () => {
    signIn("google", {
      callbackUrl: `${"http://localhost:3000/loginHandle"}`,
    });
  };
  // github
  const handleGithub = () => {
    signIn("github", {
      callbackUrl: `${"http://localhost:3000/loginHandle"}`,
    });
  };

  if (user?.role === "admin") {
    return redirect("/admin/profile");
  }
  if (user?.role === "user") {
    return redirect("/user/profile");
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center cursor-auto">
        <div
          className="flex flex-col justify-center items-center"
          data-aos="fade-right"
        >
          <h1>SignUp Here</h1>
          <form onSubmit={handleSignup}>
            {/* name */}
            <div>
              <label>Your Name*</label>
              <Input
                placeholder="Your Name"
                name="name"
                required
                prefix={<UserOutlined />}
                className="mt-2"
              />
            </div>
            {/* email */}

            <div className="mt-5">
              <label>Your Email*</label>
              <Input
                placeholder="Your Email"
                type="email"
                name="email"
                required
                prefix={<MailOutlined />}
                className="mt-2"
              />
            </div>

            {/* password */}
            <div className="mt-5">
              <label>Your Password*</label>
              <Input
                placeholder="Your password"
                type="password"
                name="password"
                required
                prefix={<LockOutlined />}
                className="mt-2"
              />
            </div>

            {/* confirm */}

            <div className="mt-5">
              <label>Confirm Password*</label>
              <Input
                placeholder="Confirm password"
                type="password"
                name="confirmPassword"
                required
                prefix={<LockOutlined />}
                className="mt-2"
              />
            </div>

            {/* submit */}

            <button
              className="mt-10 border-none bg-transparent cursor-pointer"
              type="submit"
            >
              <CustomButton
                btnText="SignUp"
                customCss="text-blue-700 font-bold"
              />
            </button>
          </form>
          <div className="w-1/2 flex justify-center items-center gap-10">
            <hr className="text-gray-200 w-full" />
            <h4>OR</h4>
            <hr className="text-gray-200 w-full" />
          </div>
          <div className="mt-3">
            <h3>SignUp With</h3>
            <div className="flex justify-center items-center gap-10 text-xl cursor-pointer">
              <button
                onClick={handleGithub}
                className="rounded-full w-10 h-10 bg-transparent border-blue-500 hover:bg-black hover:border-none hover:text-white cursor-pointer"
              >
                <FaGithub />
              </button>
              <button
                onClick={handleGoogle}
                className="rounded-full w-10 h-10 bg-transparent border-blue-500 hover:bg-red-500 hover:border-none hover:text-white cursor-pointer"
              >
                <FaGoogle />
              </button>
            </div>
          </div>
          {/* not account */}
          <div className="mt-3">
            <p>
              Already Have An Account?
              <Link href="/login">
                <strong className="ml-2 text-blue-500 cursor-pointer">
                  login here
                </strong>
              </Link>
            </p>
          </div>
        </div>
        <div data-aos="fade-left">
          <Image
            src={signupImg}
            height={100}
            width={100}
            className="w-1/2 h-96"
            alt="signup Image"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;

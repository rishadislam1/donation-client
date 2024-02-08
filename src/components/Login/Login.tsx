"use client";

import LoginImg from "@/assets/signin-image.jpg";
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
import { useLoginMutation } from "@/redux/features/auth/authApi";

const Login = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // signup apis

  const [login, { data: signUpData, isLoading }] = useLoginMutation();

  const handleSignup = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;

    const email = form.email.value;
    const password = form.password.value;

    const data = {
      email,
      password,
    };
    login(data);
  };
  // check
  if (!isLoading && signUpData) {
    if (signUpData.status === false) {
      Swal.fire({
        title: "Fail",
        text: `${signUpData.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    else{
      
    }
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

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center cursor-auto">
        <div data-aos="fade-right" className="flex justify-center items-center">
          <Image
            src={LoginImg}
            height={"auto"}
            width={"100%"}
            alt="signup Image"
          />
        </div>
        <div
          className="flex flex-col justify-start items-start"
          data-aos="fade-left"
        >
          <h1>Login Here</h1>
          <form onSubmit={handleSignup}>
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

            {/* submit */}

            <button
              className="mt-10 border-none bg-transparent cursor-pointer flex"
              type="submit"
            >
              <CustomButton
                type="submit"
                btnText="LogIn"
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
              {"Don't have An Account?"}
              <Link href="/signup">
                <strong className="ml-2 text-blue-500 cursor-pointer">
                  SignUp here
                </strong>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

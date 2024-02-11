"use client";

import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  NotificationOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Link from "next/link";
import AnimCursor from "@/components/AnimCursor";
import AOS from "aos";
import "aos/dist/aos.css";
import { LiaDonateSolid } from "react-icons/lia";

const { Header, Content, Footer, Sider } = Layout;

interface MenuItem {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

const items: MenuItem[] = [
  {
    label: (
      <Link
        href="/admin/profile"
        rel="noopener noreferrer"
        className="cursor-pointer"
      >
        Admin Home
      </Link>
    ),
    key: "adminHome",
    icon: <HomeOutlined />,
  },
  {
    label: (
      <Link href="#" rel="noopener noreferrer" className="cursor-pointer">
        Volunteer
      </Link>
    ),
    key: "volunteer",
    icon: <UsergroupAddOutlined />,
    children: [
      {
        label: (
          <Link
            href="/admin/volunteer"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            Volunteer List
          </Link>
        ),
        key: "volunteerlist",
        icon: <UsergroupAddOutlined />,
      },
      {
        label: (
          <Link
            href="/admin/volunteerRequest"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            Volunteer Request
          </Link>
        ),
        key: "volunteerRequest",
        icon: <UsergroupAddOutlined />,
      },
    ],
  },
  {
    label: (
      <Link
        href="/admin/donationrequest"
        rel="noopener noreferrer"
        className="cursor-pointer"
      >
        Donation Request
      </Link>
    ),
    key: "donationrequest",
    icon: <LiaDonateSolid />,
  },
  {
    label: (
      <Link
        href="/admin/addcategory"
        rel="noopener noreferrer"
        className="cursor-pointer"
      >
        Add Category
      </Link>
    ),
    key: "addcategory",
    icon: <NotificationOutlined />,
  },
  {
    label: (
      <Link
        href="/admin/listingcategory"
        rel="noopener noreferrer"
        className="cursor-pointer"
      >
        Listing Category
      </Link>
    ),
    key: "listingcategory",
    icon: <OrderedListOutlined />,
  },
];

// item2

const items2: MenuItem[] = [
  {
    label: (
      <Link href="/" rel="noopener noreferrer" className="cursor-pointer">
        Home
      </Link>
    ),
    key: "mainHome",
    icon: <HomeOutlined />,
  },
  {
    label: (
      <Link href="/about" rel="noopener noreferrer" className="cursor-pointer">
        About
      </Link>
    ),
    key: "about",
    icon: <UsergroupAddOutlined />,
  },
  {
    label: (
      <Link
        href="/contact"
        rel="noopener noreferrer"
        className="cursor-pointer"
      >
        Contact Us
      </Link>
    ),
    key: "contact",
    icon: <NotificationOutlined />,
  },
];



const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Access localStorage directly
    const storedData = localStorage?.getItem("auth");

    if (storedData) {
      const allData = JSON.parse(storedData);
      if (allData?.user.role !== "admin") {
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
          accessToken: allData?.accessToken,
          user: allData?.user,
        })
      );
    }
    else {
      Swal.fire({
        title: "Fail",
        text: "You are not logedin",
        icon: "error",
        confirmButtonText: "LogIn",
      });
      return redirect("/login");
    }
  }, [dispatch]);

  const { user } = useAppSelector((state) => state.auth);

  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="cursor-auto"
      >
        <h1 className="text-white text-center mb-10">Admin Home</h1>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
        <div className="w-full flex justify-center items-center text-gray-300 gap-5">
          <hr className="w-full" />
          OR <hr className="w-full" />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items2}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "0 16px" }} className="cursor-auto">
          <AnimCursor />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "white",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;

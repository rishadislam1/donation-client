"use client";

import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { HomeOutlined, UsergroupAddOutlined,NotificationOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Link from "next/link";
import AnimCursor from "@/components/AnimCursor";
import AOS from "aos";
import "aos/dist/aos.css";

const { Header, Content, Footer, Sider } = Layout;

interface MenuItem {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
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
      <Link
        href="/admin/user"
        rel="noopener noreferrer"
        className="cursor-pointer"
      >
        All User
      </Link>
    ),
    key: "allUser",
    icon: <UsergroupAddOutlined />,
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
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {

    useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);


  const dispatch = useAppDispatch();
  
  useEffect(() => {
    // Access localStorage directly
    const allData = JSON.parse(localStorage?.getItem("auth"));

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
  }, [dispatch]);

  const { user } = useAppSelector((state) => state.auth);

  const [collapsed, setCollapsed] = useState(false);

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

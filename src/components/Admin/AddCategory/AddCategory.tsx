"use client";
import { Input } from "antd";

import {
  SafetyCertificateOutlined,
  MailOutlined,
  LockOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import CustomButton from "@/components/CustomButton/CustomButton";
import { useAddCategoryMutation } from "@/redux/features/Admin/category/categoryApi";
import { useAppSelector } from "@/redux/hooks";
import Swal from "sweetalert2";
import type { GetProp, UploadProps } from "antd";
import { useState } from "react";
import { BallTriangle } from "react-loader-spinner";

// image all

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 100;
  if (!isLt2M) {
    message.error("Image must smaller than 100MB!");
  }
  return isJpgOrPng && isLt2M;
};

const AddCategory = () => {
  const { user } = useAppSelector((state) => state.auth);
  const email = user?.email;
  const [addCategory, { isLoading, data: categoryData }] =
    useAddCategoryMutation();

  //   handle category

  const handleAddCategory = async (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value.toLowerCase();
    const title = form.title.value;
    const categoryImage = form.image.files[0];
    const image_hosting =
      "https://api.imgbb.com/1/upload?expiration=600&key=496cd83f6d0a12aa50bec50d47669908";

    if (categoryImage) {
      // Upload the image to imgbb
      const formData = new FormData();
      formData.append("image", categoryImage);

      try {
        const response = await fetch(
          "https://api.imgbb.com/1/upload?expiration=600&key=496cd83f6d0a12aa50bec50d47669908",
          {
            method: "POST",
            body: formData,
          }
        );

        const imageData = await response.json();

        // Use imageData.url in your data object
        const data = {
          name,
          title,
          image: imageData?.data?.url,
        };
        addCategory({ data, email });
        form.reset();
      } catch (error) {
        Swal.fire({
          title: "Fail!",
          text: "Error uploading image",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }
  };
  if (isLoading && categoryData?.status !== true) {
    <BallTriangle
      height={50}
      width={50}
      radius={5}
      color="#4fa94d"
      ariaLabel="ball-triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />;
  }
  if (!isLoading && categoryData?.status === true) {
    Swal.fire({
      title: "Success!",
      text: "Category Added Successfully",
      icon: "success",
      confirmButtonText: "Ok",
    });
  }
  return (
    <div data-aos="fade-right">
      <h1>Add A New Category For Donation</h1>
      <form className="mt-10" onSubmit={handleAddCategory}>
        <div>
          <label>Category Name*</label>
          <Input
            placeholder="Category Name"
            name="name"
            required
            prefix={<SafetyCertificateOutlined />}
            className="mt-2"
          />
        </div>
        <div className="mt-5">
          <label>Category Title*</label>
          <Input
            placeholder="Category Title"
            name="title"
            required
            prefix={<SafetyCertificateOutlined />}
            className="mt-2"
          />
        </div>

        <div className="mt-5">
          <label>Category Image*</label> <br />
          <br />
          <input type="file" name="image" id="" />
        </div>

        <button
          className="mt-10 border-none bg-transparent cursor-pointer"
          type="submit"
        >
          <CustomButton
            type="submit"
            btnText="Add Category"
            customCss="text-blue-700 font-bold"
          />
        </button>
      </form>
    </div>
  );
};

export default AddCategory;

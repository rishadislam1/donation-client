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
import {
  useGetCategoryQuery,
} from "@/redux/features/Admin/category/categoryApi";
import { useAppSelector } from "@/redux/hooks";
import Swal from "sweetalert2";
import type { GetProp, UploadProps } from "antd";
import { useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { MdDeleteForever } from "react-icons/md";
import Image from "next/image";
import TextArea from "antd/es/input/TextArea";
import {
  useAddCategoryDetailsMutation,
  useDeleteCategoryDetailsMutation,
  useGetCategoryDetailsQuery,
} from "@/redux/features/Admin/categoryDetails/categoryDetailsApi";

const ListingCategory = () => {
  const [categorySelect, setCategorySelect] = useState("");

  const { user } = useAppSelector((state) => state.auth);
  const email = user?.email;
  const { data: category, isLoading: categoryLoading } = useGetCategoryQuery();
  const [deleteCategory, { isLoading: deleteLoading, data: deleteData }] =
    useDeleteCategoryDetailsMutation();

  const [addCategoryDetails, { isLoading, data: categoryDetails }] =
    useAddCategoryDetailsMutation();

  const { data: categoryDetailsData, isLoading: categoryDetailsLoading } =
    useGetCategoryDetailsQuery();

  // interface

  interface ICategory {
    name: string;
    title: string;
    image: string;
  }

  //   handle category

  const handleAddCategory = async (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value.toLowerCase();
    const categoryName = form.categoryName.value;
    const description = form.description.value;
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
          categoryName,
          description,
          image: imageData?.data?.url,
        };
        addCategoryDetails({ email, data });
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
  if (isLoading && categoryDetails?.status !== true) {
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
  if (!isLoading && categoryDetails?.status === true) {
    Swal.fire({
      title: "Success!",
      text: "CategoryDetails Added Successfully",
      icon: "success",
      confirmButtonText: "Ok",
    });
  }

  //   handle delete

  const handleDelete = (items: ICategory) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const id = items._id;
        console.log();
        deleteCategory({ email, id });
        Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
      }
    });
  };

  //   hanlde seelct

  const handleSelect = (e: React.FormEvent<HTMLInputElement>) => {
    setCategorySelect(e.currentTarget.value);
  };

  return (
    <div data-aos="fade-right">
      <h1>Add A New Category List For Donation</h1>
      <form className="mt-10" onSubmit={handleAddCategory}>
        <div>
          <label> Title*</label>
          <Input
            placeholder="Title"
            name="name"
            required
            prefix={<SafetyCertificateOutlined />}
            className="mt-2"
          />
        </div>

        <div className="mt-5">
          <label> Description*</label>
          <TextArea
            rows={4}
            placeholder="Description"
            name="description"
            required
          />
        </div>

        <div className="mt-5">
          <label> Select Your Category*</label>
          <br />
          <br />
          <select
            name="categoryName"
            className="border-none bg-gray-300  px-5 py-2 rounded-xl"
          >
            {category?.result?.map((categoryList) => (
              <option value={categoryList.name} key={categoryList._id}>
                {categoryList.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5">
          <label>Category Image*</label> <br />
          <br />
          <input
            type="file"
            name="image"
            id="image"
            accept=".jpg, .jpeg, .png"
          />
        </div>

        <button
          className="mt-10 border-none bg-transparent cursor-pointer"
          type="submit"
        >
          <CustomButton
            type="submit"
            btnText="Add Details"
            customCss="text-blue-700 font-bold"
          />
        </button>
      </form>

      <div className="overflow-auto mt-10 flex flex-col justify-center items-center">
        <h1 className="text-center mb-10">
          Select an option for see category details
        </h1>
        <select
          name="cate"
          className="border-none bg-gray-300  px-5 py-2 rounded-xl mb-20"
          onChange={handleSelect}
        >
          {category?.result?.map((categoryList) => (
            <option value={categoryList.name} key={categoryList._id}>
              {categoryList.name}
            </option>
          ))}
        </select>

        <table className="table w-full ">
          {/* head */}
          <thead>
            <tr className="font-bold text-black text-lg">
              <th>#</th>
              <th>Title</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {categoryDetailsData?.result
              ?.filter((cat) => cat.categoryName === categorySelect)
              .map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <th>
                    <h1 className="font-bold text-xl">{item.name}</h1>
                  </th>
                  <th>{item.categoryName}</th>
                  <th className="w-1/2">
                    <p className="text-wrap">
                      {item.description.slice(0, 100) + "..."}
                    </p>
                  </th>
                  <th>
                    <Image
                      src={item.image}
                      height={100}
                      width={100}
                      alt={item.title}
                    />
                  </th>

                  <th className="">
                    <button
                      onClick={() => handleDelete(item)}
                      className="py-2 border-none btn cursor-pointer rounded-xl bg-red-500 text-white ml-5"
                    >
                      <MdDeleteForever className=" font-bold text-xl" />
                    </button>
                  </th>
                </tr>
              ))}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListingCategory;

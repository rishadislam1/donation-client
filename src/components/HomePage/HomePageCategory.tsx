"use client";

import { useGetCategoryQuery } from "@/redux/features/Admin/category/categoryApi";
import { BallTriangle } from "react-loader-spinner";
import { Card } from "antd";
import Image from "next/image";
import Link from "next/link";

const { Meta } = Card;

const HomePageCategory = () => {

   // interface

   interface ICategory {
    _id?: string;
    name: string;
    title: string;
    image: string;
  }

  interface ICategoryDetails {
    _id?: string;
    name: string;
    categoryName: string;
    description: string;
    image: string;
  }


  const { data: categoryData, isLoading } = useGetCategoryQuery(undefined);
  if (isLoading) {
    return (
      <BallTriangle
        height={150}
        width={150}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    );
  } else {
    return (
      <div
        data-aos="fade-down"
        className="flex flex-col justify-center items-center text-center"
      >
        <h1 className="text-center mt-20 mb-10">OUR ALL CATEGORY FOR DONETS</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-20">
          {categoryData?.result?.map((category:ICategoryDetails) => (
            <Link
              key={category._id}
              href={`/donation/${category.name}`}
              className="no-underline"
            >
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <Image
                    src={category.image}
                    height={100}
                    width={100}
                    alt={category.categoryName}
                  />
                }
              >
                <Meta
                  title={category.name}
                  description={category.categoryName}
                />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    );
  }
};

export default HomePageCategory;

"use client";

import { useGetCategoryQuery } from "@/redux/features/Admin/category/categoryApi";
import { BallTriangle } from "react-loader-spinner";
import { Card } from "antd";
import Image from "next/image";
import Link from "next/link";

const { Meta } = Card;

const HomePageCategory = () => {
  const { data: categoryData, isLoading } = useGetCategoryQuery();
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-10">
          {categoryData?.result?.map((category) => (
            <Link key={category._id} href="/" className="no-underline">
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <Image
                    src={category.image}
                    height={100}
                    width={100}
                    alt={category.title}
                  />
                }
              >
                <Meta title={category.name} description={category.title} />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    );
  }
};

export default HomePageCategory;

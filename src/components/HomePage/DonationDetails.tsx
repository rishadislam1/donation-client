"use client";
import { useGetCategoryQuery } from "@/redux/features/Admin/category/categoryApi";
import { useGetCategoryDetailsQuery } from "@/redux/features/Admin/categoryDetails/categoryDetailsApi";
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Card } from "antd";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../CustomButton/CustomButton";

const { Meta } = Card;

const DonationDetails = ({ id }) => {
  const { data: categoryData } = useGetCategoryQuery();
  const { data: categoryDetailsData } = useGetCategoryDetailsQuery();

  const [loadMore, setLoadMore] = useState(false);
  const categoryNames = ["all", "education", "clothing", "food", "medical", "health"];
  const initialIndex = categoryNames.indexOf(id);

  const [tabIndex, setTabIndex] = useState(initialIndex);
  return (
    <div
      data-aos="fade-right"
      className="flex flex-col justify-center items-center"
    >
      <Tabs
        data-aos="fade-right"
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList>
          <Tab>All</Tab>
          {categoryData?.result?.map((category) => (
            <Tab key={category._id}>{category.name}</Tab>
          ))}
        </TabList>

        <TabPanel>
          <div
            className={`  ${
              loadMore
                ? "hidden"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-10 mt-10"
            }`}
          >
            {categoryDetailsData?.result?.slice(0, 6).map((category) => (
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
                  <Meta
                    title={category.name}
                    description={category.categoryName}
                  />
                </Card>
              </Link>
            ))}
            <button
              className={`border-none bg-transparent`}
              onClick={() => {
                setLoadMore(true);
              }}
            >
              <CustomButton
                btnText="Load More"
                customCss="text-green-500 font-bold"
              />
            </button>
          </div>
          {/* full data */}

          <div
            className={`${
              loadMore
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-10 mt-10 "
                : "hidden"
            } `}
          >
            {categoryDetailsData?.result?.map((category) => (
              <Link key={category._id} href="/" className="no-underline">
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
        </TabPanel>
        {categoryData?.result?.map((category1) => (
          <TabPanel key={category1._id}>
            {
              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-10 mt-10
            } `}
              >
                {categoryDetailsData?.result
                  ?.filter((cat) => cat.categoryName === category1.name)
                  .map((category) => (
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
                        <Meta
                          title={category.name}
                          description={category.categoryName}
                        />
                      </Card>
                    </Link>
                  ))}
              </div>
            }
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default DonationDetails;

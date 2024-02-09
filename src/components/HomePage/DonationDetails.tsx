"use client";
import { useGetCategoryQuery } from "@/redux/features/Admin/category/categoryApi";
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const DonationDetails = ({ id }) => {
  const { data: categoryData } = useGetCategoryQuery();
  return (
    <div
      data-aos="fade-right"
      className="flex flex-col justify-center items-center"
    >
      <Tabs data-aos="fade-right">
        <TabList>
          <Tab>All</Tab>
          {categoryData?.result?.map((category) => (
            <Tab key={category._id}>{category.name}</Tab>
          ))}
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default DonationDetails;

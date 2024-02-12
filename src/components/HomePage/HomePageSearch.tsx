"use client";

import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { useRouter } from "next/navigation";

const { Search } = Input;

const HomePageSearch = () => {
  const router = useRouter();
  const handleSearch = (value: string) => {
    router.push(`/search/${value}`);
  };
  return (
    <div className="flex flex-col justify-center items-center cursor-auto">
      <h1>I Grow By Helping People In Need</h1>
      <Space direction="vertical">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          className="cursor-auto"
          name="search"
          onSearch={handleSearch}
        />
      </Space>
    </div>
  );
};

export default HomePageSearch;

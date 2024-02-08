"use client";

import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import type { SearchProps } from "antd/es/input/Search";

const { Search } = Input;

const HomePageSearch = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>I Grow By Helping People In Need</h1>
      <Space direction="vertical">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          //   onSearch={onSearch}
        />
      </Space>
    </div>
  );
};

export default HomePageSearch;

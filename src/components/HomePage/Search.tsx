"use client";

import { useSearchQuery } from "@/redux/features/search/searchApi";
import HomePageSearch from "./HomePageSearch";
import Link from "next/link";
import { Card } from "antd";
import Image from "next/image";
import { RotatingLines } from "react-loader-spinner";
const { Meta } = Card;
interface ICategoryDetails {
  _id?: string;
  name: string;
  categoryName: string;
  description: string;
  image: string;
}

const Search = ({ searchKey }: { searchKey: string }) => {
  const { data: searchData, isLoading } = useSearchQuery(searchKey);
  return (
    <div>
      <HomePageSearch />
      <div className="mt-10 flex flex-col justify-center items-center">
        {searchData?.length > 0 && !isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-20">
            {searchData?.map((category: ICategoryDetails) => (
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
        ) : (
          <>
            {isLoading ? (
              <>
                <RotatingLines
                  visible={true}
                  //   height={96}
                  width={"96"}
                //   color="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                 
                />
              </>
            ) : (
              <h1>No Data Found</h1>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;

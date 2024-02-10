"use client";
import { useGetOneCategoryQuery } from "@/redux/features/Admin/categoryDetails/categoryDetailsApi";
import Image from "next/image";
import Link from "next/link";

const DonationDetailsDescription = ({ id }: { id: string }) => {
  const { data: categoryData } = useGetOneCategoryQuery(id);
  return (
    <div data-aos="fade-right" className="cursor-auto">
      <div className="w-full">
        <Image
          src={categoryData?.image}
          height={500}
          width={10000}
          alt={categoryData?.categoryName}
          className="w-full"
        />
        <div className="mt-5 flex justify-around items-center">
          <p>category: {categoryData?.categoryName}</p>
          <Link href="/user/donate">
            {" "}
            <button className="py-2 text-2xl bg-orange-700 text-white rounded-xl border-none cursor-pointer">
              Donate Now
            </button>
          </Link>
        </div>
      </div>
      <br />
      <br />
      <h1>{categoryData?.name}</h1>
      <br />
      <br />
      <p>{categoryData?.description}</p>
    </div>
  );
};

export default DonationDetailsDescription;

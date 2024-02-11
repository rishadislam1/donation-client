"use client";
import { useGetVolunteerQuery } from "@/redux/features/Volunteer/volunteerApi";
import { Card } from "antd";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../CustomButton/CustomButton";

const { Meta } = Card;

const VolunteerHome = () => {
  const { data: volunteerData } = useGetVolunteerQuery(undefined);
  return (
    <div
      className="mt-10 flex flex-col justify-center items-center"
      data-aos="fade-right"
    >
      <h1 className="text-center">
        OUR BELOVED PEOPLES ARE WORKING ALL OVER THE WORLD.
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-20 mt-14">
        {volunteerData?.slice(0, 6).map((vol) => (
          <div key={vol._id}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <Image
                  src={vol.image}
                  height={100}
                  width={100}
                  alt={vol.name}
                />
              }
            >
              <Meta title={vol.name} description={vol.profession} />
            </Card>
          </div>
        ))}
      </div>
      <Link href="/volunteer" className="mt-10 no-underline">
        <CustomButton
          btnText="Load More"
          customCss="text-orange-700 font-bold"
        />
      </Link>
    </div>
  );
};

export default VolunteerHome;

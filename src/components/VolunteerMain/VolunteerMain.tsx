"use client";
import { useGetVolunteerQuery } from "@/redux/features/Volunteer/volunteerApi";
import { Card } from "antd";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../CustomButton/CustomButton";
import "./volunteerMain.css";

const { Meta } = Card;

const VolunteerMain = () => {
  const { data: volunteerData } = useGetVolunteerQuery(undefined);

  //   handleFormRequest
  const handleFormRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const profession = formData.get("profession") as string;
    const country = formData.get("country") as string;

    const data = {
        name,
        email,
        profession,
        country
    }
  };

  return (
    <div className="mt-52" data-aos="fade-right">
      <p className="ml-10 text-blue-600 font-bold">- Team Members</p>
      <h1 className="ml-10">Our Expert Volunteer</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 lg:px-20 gap-10">
        <div className="flex justify-center items-center md:col-span-2 lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-20 mt-14">
            {volunteerData?.map((vol) => (
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
        </div>

        <div>
          <div className="volunteerRequest p-10 rounded-xl text-white">
            <form onSubmit={handleFormRequest}>
              <div className="flex flex-col gap-3">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  id=""
                  placeholder="your name"
                  className="rounded-xl border-none py-3 px-3 bg-gray-300 cursor-auto"
                  required
                />
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  id=""
                  placeholder="your Email"
                  className="rounded-xl border-none py-3 px-3 bg-gray-300 cursor-auto"
                  required
                />
              </div>

              <div className="flex flex-col gap-3 mt-5">
                <label>Profession</label>
                <input
                  type="text"
                  name="profession"
                  id=""
                  placeholder="your Profession"
                  className="rounded-xl border-none py-3 px-3 bg-gray-300 cursor-auto"
                  required
                />
              </div>

              <div className="flex flex-col gap-3 mt-5">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  id=""
                  placeholder="your Country"
                  className="rounded-xl border-none py-3 px-3 bg-gray-300 cursor-auto"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-5 px-5 py-2 rounded-xl bg-yellow-600 text-white border-none cursor-pointer text-xl"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerMain;

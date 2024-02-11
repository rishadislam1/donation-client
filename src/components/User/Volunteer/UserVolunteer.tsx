"use client";

import { useGetOneVolunteerRequestQuery } from "@/redux/features/volunteerRequest/volunteerRequestApi";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";

interface IVolunteer {
  _id?: string;
  name: string;
  profession: string;
  country: string;
  email: string;
  image: string;
  status: string;
}

const UserVolunteer = () => {
  const { user } = useAppSelector((state) => state.auth);

  const userEmail = user?.email;

  const { data: volunteerData, isLoading: volunteerIsLoading } =
    useGetOneVolunteerRequestQuery(userEmail);

  //   search
  const [searchKey, setSearchKey] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchKey(e.currentTarget.value);
  };

  //   main
  return (
    <div data-aos="fade-right">
      <div className="flex justify-between items-center px-10">
        <div>
          <input
            type="search"
            name="search"
            id=""
            className="py-3 rounded-xl px-3"
            placeholder="search here"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="overflow-auto mt-10">
        <table className="table w-full ">
          {/* head */}
          <thead>
            <tr className="font-bold text-black text-lg">
              <th>#</th>
              <th>Volunteer Name</th>
              <th>Volunteer Email</th>
              <th>Volunteer Profession</th>
              <th>Volunteer Country</th>
              <th>Image</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {volunteerData
              ?.filter((cat: IVolunteer) => {
                return (
                  cat.country.includes(searchKey) ||
                  cat.email.includes(searchKey) ||
                  cat.name.includes(searchKey) ||
                  cat.profession.includes(searchKey)
                );
              })
              .map((item: IVolunteer, index: number) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <th>
                    <h1 className="font-bold text-xl">{item.name}</h1>
                  </th>
                  <th>{item.email}</th>
                  <th>{item.profession}</th>
                  <th>{item.country}</th>
                  <th>
                    <Image
                      src={item.image}
                      height={100}
                      width={100}
                      alt={item.name}
                    />
                  </th>
                  <th>{item.status}</th>
                </tr>
              ))}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserVolunteer;

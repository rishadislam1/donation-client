"use client";

import {
  useAcceptVolunteerRequestMutation,
  useGetVolunteerRequestQuery,
  useRejectVolunteerRequestMutation,
} from "@/redux/features/volunteerRequest/volunteerRequestApi";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useEffect, useState } from "react";
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

const VollunteerRequest = () => {
  const { user } = useAppSelector((state) => state.auth);

  const userEmail = user?.email;

  const { data: volunteerData, isLoading: volunteerIsLoading } =
    useGetVolunteerRequestQuery(undefined);

  //   accept volunteer

  const [
    acceptVolunteerRequest,
    { data: acceptvolunteerData, isLoading: acceptLoading },
  ] = useAcceptVolunteerRequestMutation();

  //   reject donation
  const [
    rejectVolunteerRequest,
    { data: rejectvolunteerData, isLoading: rejectLoading },
  ] = useRejectVolunteerRequestMutation();

  //   search
  const [searchKey, setSearchKey] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchKey(e.currentTarget.value);
  };

  //   handle accept

  const handleAccept = (item: IVolunteer) => {
    const id = item._id;
    const data = {
      name: item.name,
      profession: item.profession,
      country: item.country,
      email: item.email,
      image: item.image,
    };
    acceptVolunteerRequest({ userEmail, id, data });
  };
  if (acceptLoading) {
    Swal.fire({
      title: "Accepting...",
      text: "Please Wait",
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }
  if (!acceptLoading && acceptvolunteerData) {
    Swal.fire({
      title: "Accepted",
      icon: "success",
      confirmButtonText: "OK",
    });
  }

  // handle Reject

  const handleReject = (id: string | undefined) => {
    rejectVolunteerRequest({ userEmail, id });
  };
  if (rejectLoading) {
    Swal.fire({
      title: "Rejecting...",
      text: "Please Wait",
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }
  if (!rejectLoading && rejectvolunteerData) {
    Swal.fire({
      title: "Rejected",
      icon: "success",
      confirmButtonText: "OK",
    });
  }

  //   main
  return (
    <div>
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
                <tr
                  key={item._id}
                  className={`${item.status !== "pending" && "hidden"} `}
                >
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
                  <th>
                    <div className="flex gap-5 items-center justify-center">
                      <button
                        className="p-2 bg-green-400  font-bold border-none rounded cursor-pointer"
                        onClick={() => handleAccept(item)}
                      >
                        Accept
                      </button>
                      <button
                        className="p-2 bg-red-700 text-white font-bold border-none rounded cursor-pointer"
                        onClick={() => handleReject(item._id)}
                      >
                        Reject
                      </button>
                    </div>
                  </th>
                </tr>
              ))}
            {/* row 1 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VollunteerRequest;

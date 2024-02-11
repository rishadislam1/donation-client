"use client";

import {
  useAcceptDonationMutation,
  useGetAllDonationQuery,
} from "@/redux/features/donation/payDonationApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface IDonation {
  mainAmount: string;
  transactionID: string;
  phoneNumber: string;
  userEmail: string;
  status: string;
  payDate: Date;
}

const DonationRequest = () => {
  const [totalDonation, setTotalDonation] = useState<number>(0);
  const { user } = useAppSelector((state) => state.auth);

  const userEmail = user?.email;

  const { data: donationData, isLoading } = useGetAllDonationQuery(userEmail);

  //   accept donation

  const [
    acceptDonation,
    { data: acceptDonationData, isLoading: acceptLoading },
  ] = useAcceptDonationMutation();

  useEffect(() => {
    if (donationData) {
      const total = donationData.reduce(
        (accumulator: number, item: IDonation) => {
          return accumulator + parseFloat(item.mainAmount);
        },
        0
      );

      setTotalDonation(total);
    }
  }, [donationData]);

  //   search
  const [searchKey, setSearchKey] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchKey(e.currentTarget.value);
  };

  //   handle accept

  const handleAccept = (clientEmail) => {
    acceptDonation({userEmail,clientEmail});
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
  if (!acceptLoading && acceptDonationData) {
    Swal.fire({
      title: "Accepted",
      icon: "success",
      confirmButtonText: "OK",
    });
  }

  // handle Reject

  const handleReject = () => {};

  //   main
  return (
    <div>
      <div className="flex justify-between items-center px-10">
        <h3 className="text-green-700 text-xl">
          Total Donation: {totalDonation}{" "}
        </h3>
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
              <th>Transaction ID</th>
              <th>Mobile Number</th>
              <th>Pay Amount</th>
              <th>Payment Date</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {donationData
              ?.filter((cat: IDonation) => {
                return (
                  cat.mainAmount == searchKey ||
                  cat.payDate === searchKey ||
                  cat.phoneNumber.includes(searchKey) ||
                  cat.status.includes(searchKey) ||
                  cat.transactionID.includes(searchKey) ||
                  cat.userEmail.includes(searchKey)
                );
              })
              .map((item: IDonation, index: number) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <th>
                    <h1 className="font-bold text-xl">{item.transactionID}</h1>
                  </th>
                  <th>{item.phoneNumber}</th>
                  <th>{item.mainAmount}</th>
                  <th>{item.payDate}</th>
                  <th>{item.userEmail}</th>
                  <th>
                    {item.status === "pending" ? (
                      <div className="flex gap-5 items-center justify-center">
                        <button
                          className="p-2 bg-green-400  font-bold border-none rounded cursor-pointer"
                          onClick={()=>handleAccept(item.userEmail)}
                        >
                          Accept
                        </button>
                        <button
                          className="p-2 bg-red-700 text-white font-bold border-none rounded cursor-pointer"
                          onClick={handleReject}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      item.status
                    )}
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

export default DonationRequest;

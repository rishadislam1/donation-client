"use client";

import {
  useAcceptDonationMutation,
  useDeleteDonationMutation,
  useGetAllDonationQuery,
  useRejectDonationMutation,
} from "@/redux/features/donation/payDonationApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface IDonation {
  _id?: string;
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

  const { data: donationData, isLoading } = useGetAllDonationQuery(undefined);

  //   accept donation

  const [
    acceptDonation,
    { data: acceptDonationData, isLoading: acceptLoading },
  ] = useAcceptDonationMutation();

  //   reject donation
  const [
    rejectDonation,
    { data: rejectDonationData, isLoading: rejectLoading },
  ] = useRejectDonationMutation();

  //   delete donation

  const [deleteDonation, { data: deleteData, isLoading: deleteLoading }] =
    useDeleteDonationMutation();

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

  const handleAccept = (id: string | undefined) => {
    acceptDonation({ userEmail, id });
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

  const handleReject = (id: string | undefined) => {
    rejectDonation({ userEmail, id });
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
  if (!rejectLoading && rejectDonationData) {
    Swal.fire({
      title: "Rejected",
      icon: "success",
      confirmButtonText: "OK",
    });
  }

  //   handle handleDelete

  const handleDelete = (id: string | undefined) => {
    deleteDonation({ userEmail, id });
  };

  if (deleteLoading) {
    Swal.fire({
      title: "Deleting...",
      text: "Please Wait",
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }
  if (!deleteLoading && deleteData) {
    Swal.fire({
      title: "Deleted",
      icon: "success",
      confirmButtonText: "OK",
    });
  }

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
                  cat.payDate === new Date(searchKey) ||
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
                  <th>{item.payDate && new Date(item.payDate).toLocaleDateString()}</th>
                  <th>{item.userEmail}</th>
                  <th>
                    {item.status === "pending" ? (
                      <div className="flex gap-5 items-center justify-center">
                        <button
                          className="p-2 bg-green-400  font-bold border-none rounded cursor-pointer"
                          onClick={() => handleAccept(item?._id)}
                        >
                          Accept
                        </button>
                        <button
                          className="p-2 bg-red-700 text-white font-bold border-none rounded cursor-pointer"
                          onClick={() => handleReject(item?._id)}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <>
                        {" "}
                        <b> {item.status}</b>{" "}
                        {item.status === "rejected" && (
                          <button
                            className="p-2 bg-red-700 text-white font-bold border-none rounded cursor-pointer"
                            onClick={() => handleDelete(item?._id)}
                          >
                            Delete
                          </button>
                        )}
                      </>
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

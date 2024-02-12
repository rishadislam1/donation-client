"use client";

import { useGetDonationQuery } from "@/redux/features/donation/payDonationApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";

interface IDonation {
  _id:string;
  mainAmount: string;
  transactionID: string;
  phoneNumber: string;
  userEmail: string;
  status: string;
  payDate: Date;
}

const DonationHistory = () => {
  const [totalDonation, setTotalDonation] = useState<number>(0);
  const { user } = useAppSelector((state) => state.auth);

  const userEmail = user?.email;
  const { data: donationData, isLoading } = useGetDonationQuery(userEmail);

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

  return (
    <div>
      <h3 className="text-green-700 text-xl">
        Total Donation: {totalDonation}{" "}
      </h3>
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {donationData?.map((item: IDonation, index: number) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <th>
                  <h1 className="font-bold text-xl">{item.transactionID}</h1>
                </th>
                <th>{item.phoneNumber}</th>
                <th>{item.mainAmount}</th>
                <th>{item.payDate && new Date(item.payDate).toLocaleDateString()}</th>
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

export default DonationHistory;

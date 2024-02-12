"use client";
import {
  useGetAllDonationQuery,
  useGetDonationQuery,
} from "@/redux/features/donation/payDonationApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const UserStatistics = () => {
  interface IDonation {
    _id: string;
    mainAmount: string;
    transactionID: string;
    phoneNumber: string;
    userEmail: string;
    status: string;
    payDate: Date;
  }

  const [totalDonation, setTotalDonation] = useState<number>(0);
  const [totalAllDonation, setTotalAllDonation] = useState<number>(0);
  const { user } = useAppSelector((state) => state.auth);

  const userEmail = user?.email;
  const { data: donationData, isLoading } = useGetDonationQuery(userEmail);
  const { data: allDonation } = useGetAllDonationQuery(undefined);

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

  useEffect(() => {
    if (allDonation) {
      const total = allDonation.reduce(
        (accumulator: number, item: IDonation) => {
          return accumulator + parseFloat(item.mainAmount);
        },
        0
      );

      setTotalAllDonation(total);
    }
  }, [allDonation]);
  const data = [
    { name: "My Donation", value: totalDonation },
    { name: "All Donation", value: totalAllDonation },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <h1>Donation: my donation / total donation</h1>{" "}
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default UserStatistics;

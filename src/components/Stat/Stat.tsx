"use client";
import { useGetUserQuery } from "@/redux/features/Volunteer/userApi";
import {
  useGetAllDonationQuery,
  useGetDonationQuery,
} from "@/redux/features/donation/payDonationApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface IDonation {
  _id?: string;
  mainAmount: string;
  transactionID: string;
  phoneNumber: string;
  userEmail: string;
  status: string;
  payDate: Date;
}



const Stat = () => {
  interface IDonations {
    mainAmount: string;
    transactionID: string;
    phoneNumber: string;
    userEmail: string;
    status: string;
    category: string;
    payDate: Date;
  }

  const [totalAllDonation, setTotalAllDonation] = useState<number>(0);

  const { data: allDonation } = useGetAllDonationQuery(undefined);

  const { data: userData } = useGetUserQuery(undefined);

  const education = allDonation?.filter((da:IDonations) => da.category === "education");
  const clothing = allDonation?.filter((da:IDonations) => da.category === "clothing");
  const food = allDonation?.filter((da:IDonations) => da.category === "food");
  const medical = allDonation?.filter((da:IDonations) => da.category === "medical");
  const health = allDonation?.filter((da:IDonations) => da.category === "health");

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
    { name: "All User", value: userData?.length },
    { name: "All Donation", value: totalAllDonation },
  ];

  const dataBar = [
    {
      name: "Education",
      uv: education?.length,
    },
    {
      name: "Clothing",
      uv: clothing?.length,
    },
    {
      name: "food",
      uv: food?.length,
    },
    {
      name: "Medical",
      uv: medical?.length,
    },
    {
      name: "Health",
      uv: health?.length,
    },
  ];

  const colorsBar = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  const getPath = (
    x: number,
    y: number,
    width: number,
    height: number
  ): string => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };


  const TriangleBar = (props: any) => {
    const { fill, x, y, width, height } = props;
  
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="lg:mt-52">
        <h1>Donation: Total Users / total donation</h1>{" "}
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
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className="mt-14">
        <h1>Category Wise Donation</h1>
        <BarChart
          width={500}
          height={300}
          data={dataBar}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar
            dataKey="uv"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colorsBar[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default Stat;

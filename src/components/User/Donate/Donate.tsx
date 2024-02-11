"use client";
import { useDonationPayMutation } from "@/redux/features/donation/payDonationApi";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import Swal from "sweetalert2";

const Donate = () => {
  const { user } = useAppSelector((state) => state.auth);
  const userEmail = user?.email;
  const [donationPay, { data: donationData, isLoading }] =
    useDonationPayMutation();

  // handle payment
  const handlePayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(e.target as HTMLFormElement);
    const amount = formData.get("amount") as string;
    const customPay = formData.get("customPay") as string;
    const mainAmount = amount | customPay;
    const transactionID = formData.get("transactionID") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const  today= new Date();
    const payDate = today.toLocaleDateString('en-GB');

    const data = {
      mainAmount,
      transactionID,
      phoneNumber,
      userEmail,
      payDate
    };

    donationPay(data);
    form.reset();
  };

  if (isLoading) {
    Swal.fire({
      title: "Paying........",
      text: "Please Wait",
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }
  if (!isLoading && donationData) {
    Swal.fire({
      title: "Your Payment Successfully Done",
      text: "Please wait for our admin confirmation",
      icon: "success",
      confirmButtonText: "Thank You",
    });
  }
  return (
    <div
      className="mt-10 p-8 rounded-xl bg-gray-100 shadow-xl"
      data-aos="fade-down"
    >
   
      <h1>OUR TRANSACTION NUMBERS:</h1>
      <p className="text-blue-800 text-xl text-center">
        <b>Bkash Number: </b>+8801705978622 <br />
        <b>Nagad Number: </b>+8801705978622
      </p>
      <form className="mt-10" onSubmit={handlePayment}>
        <h2>Select Your Amount</h2>
        <div className="flex justify-center gap-20 text-xl  items-center">
          <div className="flex items-center">
            <input
              type="radio"
              name="amount"
              value={"10"}
              id=""
              className="cursor-pointer"
            />
            <label>$10</label>
          </div>
          {/* 20 */}
          <div className="flex items-center">
            <input
              type="radio"
              name="amount"
              id=""
              value={"20"}
              className="cursor-pointer"
            />
            <label>$20</label>
          </div>
          {/* 30 */}
          <div className="flex items-center">
            <input
              type="radio"
              name="amount"
              id=""
              value={"30"}
              className="cursor-pointer"
            />
            <label>$30</label>
          </div>
          {/* 50 */}
          <div className="flex items-center">
            <input
              type="radio"
              name="amount"
              id=""
              value={"50"}
              className="cursor-pointer"
            />
            <label>$50</label>
          </div>
          {/* 100 */}
          <div className="flex items-center">
            <input
              type="radio"
              name="amount"
              id=""
              value={"100"}
              className="cursor-pointer"
            />
            <label>$100</label>
          </div>
        </div>
        {/* custom */}
        <div>
          <div className="flex gap-5 justify-center items-center">
            <hr className="w-full h-0" />
            <p>OR</p>
            <hr className="w-full h-0" />
          </div>
          <input
            type="text"
            name="customPay"
            id=""
            className="mt-3 w-full py-2 rounded-xl px-3 border-none shadow"
            placeholder="write a custom amount"
          />
        </div>
        {/* information */}
        <div>
          <h2 className="text-center underline">Give Payment Details</h2>
          <div>
            <p className="font-bold">Transaction ID:</p>
            <input
              type="text"
              name="transactionID"
              id=""
              className="mt-3 w-full py-3 rounded-xl px-3 border-0 shadow"
              placeholder="Your Payment Transaction ID"
            />
            <p className="font-bold">Your Payment Phone Number:</p>
            <input
              type="number"
              name="phoneNumber"
              id=""
              className="mt-3 w-full py-3 rounded-xl px-3 border-0 shadow"
              placeholder="Your Payment Phone Number"
            />
          </div>
        </div>
        <p className="mt-5 text-red-700 font-bold text-xl">
          ***Please Pay with Bkash OR Nagad***
        </p>
        <button className="w-full mt-5 py-2 font-bold text-white border-none bg-orange-600 rounded-xl text-lg cursor-pointer">
          PAY
        </button>
      </form>
    </div>
  );
};

export default Donate;

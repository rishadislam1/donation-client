"use client";
import React from "react";
import { BallTriangle } from "react-loader-spinner";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center mt-20">
      <BallTriangle
        height={150}
        width={150}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default LoadingPage;

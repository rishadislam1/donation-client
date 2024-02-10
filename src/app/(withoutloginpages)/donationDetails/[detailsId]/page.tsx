import AnimCursor from "@/components/AnimCursor";
import DonationDetailsDescription from "@/components/DonationDetailsDescription/DonationDetailsDescription";
import React from "react";


interface DonationPageProps {
    params: {
        detailsId: string;
    };
  }

const DonataionDetailsPage = ({ params }: DonationPageProps) => {
  const id = params.detailsId;
  return (
    <div className="mt-52">
      <AnimCursor />
      <DonationDetailsDescription id={id}/>
    </div>
  );
};

export default DonataionDetailsPage;

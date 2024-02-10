import AnimCursor from "@/components/AnimCursor";
import DonationDetails from "@/components/HomePage/DonationDetails";

interface DonationPageProps {
  params: {
    donationId: string;
  };
}

const DonationPage = ({ params }:DonationPageProps) => {
  const id = params.donationId;
  return (
    <div className="cursor-auto mt-52">
      <AnimCursor/>
      <h1 className="text-center">INTRODUSE OUR CAMPAINS</h1>
      <DonationDetails id={id}/>
    </div>
  );
};

export default DonationPage;

import DonationDetails from "@/components/HomePage/DonationDetails";

const DonationPage = ({ params }) => {
  const id = params.donationId;
  return (
    <div className="cursor-auto mt-52">
      <h1 className="text-center">INTRODUSE OUR CAMPAINS</h1>
      <DonationDetails id={id}/>
    </div>
  );
};

export default DonationPage;

import Donate from "@/components/User/Donate/Donate";
import DonateQuestion from "@/components/User/Donate/DonateQuestion";

const DonatePage = () => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:px-10"
      data-aos="fade-right"
    >
      <div className="lg:col-span-2">
        <h4>- Donate</h4>
        <div className="ml-3">
          <h1 className="text-yellow-700">
            {"Don't Let Poverty Destroy Someone's Dreams"}
          </h1>
          <p>
            The secret to happiness lies in helping others. Never underestimate
            the difference YOU can make in the lives of the poor, the abused and
            the helpless. Spread sunshine in their lives no matter what the
            weather may be.
          </p>
          <div>
            <Donate />
          </div>
        </div>
      </div>
      {/* contact */}

      <div>
        <DonateQuestion />
      </div>
    </div>
  );
};

export default DonatePage;

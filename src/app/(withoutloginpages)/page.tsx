import AnimCursor from "@/components/AnimCursor";
import HomeBanner from "@/components/HomePage/HomeBanner";
import HomePageSearch from "@/components/HomePage/HomePageSearch";

const HomePage = () => {
  return (
    <div>
      <AnimCursor />
      <HomePageSearch />
      <HomeBanner />
    </div>
  );
};

export default HomePage;

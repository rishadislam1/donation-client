import AnimCursor from "@/components/AnimCursor";
import HomeBanner from "@/components/HomePage/HomeBanner";
import HomePageSearch from "@/components/HomePage/HomePageSearch";
import AOS from "aos";

export const HomePage = () => {
  AOS.init();
  return (
    <div>
      <AnimCursor data-aos="fade-right" />
      <HomePageSearch />
      <HomeBanner />
    </div>
  );
};

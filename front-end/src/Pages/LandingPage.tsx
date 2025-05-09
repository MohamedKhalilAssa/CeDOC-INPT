import HeroSection from "../Sections/LandingPage/HeroSection";
import StatsSection from "../Sections/LandingPage/StatsSection";
import NewsSection from "../Sections/LandingPage/NewsSection";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <NewsSection />
      {/* Other sections */}
    </div>
  );
};

export default LandingPage;
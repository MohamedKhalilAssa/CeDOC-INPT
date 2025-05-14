import HeroSection from "../Sections/LandingPage/HeroSection";
import StatsSection from "../Sections/LandingPage/StatsSection";
import NewsSection from "../Sections/LandingPage/NewsSection";
import ResearchSection from "../Sections/LandingPage/ResearchSection";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <NewsSection />
      <ResearchSection />
      {/* Other sections */}
    </div>
  );
};

export default LandingPage;
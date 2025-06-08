import AdmissionSection from "../Sections/LandingPage/AdmissionSection";
import HeroSection from "../Sections/LandingPage/HeroSection";
import ProgrammesSection from "../Sections/LandingPage/ProgrammesSection";
import ResearchSection from "../Sections/LandingPage/ResearchSection";
import StatsSection from "../Sections/LandingPage/StatsSection";
import TimelineSection from "../Sections/LandingPage/TimelineSection";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <ProgrammesSection />
      <ResearchSection />
      <TimelineSection />
      <AdmissionSection />
    </div>
  );
};

export default LandingPage;

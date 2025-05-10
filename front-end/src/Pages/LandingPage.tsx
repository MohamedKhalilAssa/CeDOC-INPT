import HeroSection from "../Sections/LandingPage/HeroSection";
import StatsSection from "../Sections/LandingPage/StatsSection";
import ProgrammesSection from "../Sections/LandingPage/ProgrammesSection";
import ResearchSection from "../Sections/LandingPage/ResearchSection";
import TimelineSection from "../Sections/LandingPage/TimelineSection";
import AdmissionSection from "../Sections/LandingPage/AdmissionSection";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <ProgrammesSection />
      <ResearchSection/>
      <TimelineSection/>
      <AdmissionSection/>
    </div>
  );
};

export default LandingPage;
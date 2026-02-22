import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HybridMaglevSection from "@/components/HybridMaglevSection";
import VisionSection from "@/components/VisionSection";
import MissionSection from "@/components/MissionSection";
import TechnologySection from "@/components/TechnologySection";
import TeamSection from "@/components/TeamSection";
import JoinSection from "@/components/JoinSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <HybridMaglevSection />
      <VisionSection />
      <MissionSection />
      <TechnologySection />
      <TeamSection />
      <JoinSection />
      <Footer />
    </main>
  );
};

export default Index;

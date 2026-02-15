import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VisionSection from "@/components/VisionSection";
import MissionSection from "@/components/MissionSection";
import TechnologySection from "@/components/TechnologySection";
import JoinSection from "@/components/JoinSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <VisionSection />
      <MissionSection />
      <TechnologySection />
      <JoinSection />
      <Footer />
    </main>
  );
};

export default Index;

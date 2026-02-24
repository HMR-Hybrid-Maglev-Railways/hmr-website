import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HybridMaglevSection from "@/components/HybridMaglevSection";
import VisionSection from "@/components/VisionSection";
import MissionSection from "@/components/MissionSection";
import TeamSection from "@/components/TeamSection";
import JoinSection from "@/components/JoinSection";
import Footer from "@/components/Footer";
import BackgroundEffects from "@/components/BackgroundEffects";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden relative">
      {/* High-tech electromagnetic field and European network background */}
      <BackgroundEffects />

      {/* Content sections */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <HybridMaglevSection />
        <VisionSection />
        <MissionSection />
        <TeamSection />
        <JoinSection />
        <Footer />
      </div>
    </main>
  );
};

export default Index;

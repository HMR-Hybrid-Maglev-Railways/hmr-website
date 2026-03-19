import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HybridMaglevSection from "@/components/HybridMaglevSection";
import VisionSection from "@/components/VisionSection";
import MissionSection from "@/components/MissionSection";
import TeamSection from "@/components/TeamSection";
import RecruitmentSection from "@/components/RecruitmentSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden relative">
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <HybridMaglevSection />
        <VisionSection />
        <MissionSection />
        <TeamSection />
        <RecruitmentSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
};

export default Index;

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileCard from "@/components/ProfileCard";
import CustomerFeedback from "@/components/CustomerFeedback";
import ServiceProof from "@/components/ServiceProof";
import SessionInformation from "@/components/SessionInformation";
import FloatingHelpButton from "@/components/FloatingHelpButton";
import AgeVerificationModal from "@/components/AgeVerificationModal";
import NotificationPrompt from "@/components/NotificationPrompt";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import { profiles } from "@/data/profiles";

const Index = () => {
  const [ageVerified, setAgeVerified] = useState(() => localStorage.getItem("ageVerified") === "true");

  return (
    <div className="min-h-screen gradient-hero">
      <AgeVerificationModal onConfirm={() => setAgeVerified(true)} />

      <Header />

      <main className="pb-24">
        {/* Hero Section */}
        <HeroSection />

        {/* How It Works */}
        <HowItWorks />

        {/* Host Listings */}
        <section id="host-listings" className="py-6">
          <div className="container">
            <h2 className="text-lg font-bold text-foreground mb-4">Choose Your Host</h2>
            <div className="grid grid-cols-2 gap-3">
              {profiles.map((profile, index) => (
                <div key={profile.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <ProfileCard profile={profile} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Feedback Section */}
        <CustomerFeedback />

        {/* Service Proof Section */}
        <ServiceProof />

        {/* Session Information Section */}
        <SessionInformation />
      </main>

      <NotificationPrompt />
      <FloatingHelpButton />
      <Footer />
    </div>
  );
};

export default Index;

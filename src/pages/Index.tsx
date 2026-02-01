import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfileCard from '@/components/ProfileCard';
import CustomerFeedback from '@/components/CustomerFeedback';
import SessionInformation from '@/components/SessionInformation';
import FloatingHelpButton from '@/components/FloatingHelpButton';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import NotificationPrompt from '@/components/NotificationPrompt';
import { profiles } from '@/data/profiles';
import { ShieldCheck } from 'lucide-react';

const Index = () => {
  const [ageVerified, setAgeVerified] = useState(
    () => localStorage.getItem('ageVerified') === 'true'
  );

  return (
    <div className="min-h-screen gradient-hero">
      <AgeVerificationModal onConfirm={() => setAgeVerified(true)} />
      
      <Header />
      
      <main className="pb-24">
        {/* Hero Section */}
        <section className="py-6">
          <div className="container">
            <div className="mb-4 flex items-center justify-center gap-2 rounded-full bg-card/80 p-2 backdrop-blur-sm card-shadow max-w-xs mx-auto">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-foreground">
                No Scam – 100% Real Service
              </span>
            </div>
            
            <h1 className="text-center text-2xl font-bold text-foreground mb-1">
              Book Your <span className="gradient-text">Session</span> Now
            </h1>
            <p className="text-center text-sm text-muted-foreground">
              Online sessions starting ₹79 only
            </p>
          </div>
        </section>

        {/* Profile Grid */}
        <section className="py-4">
          <div className="container">
            <div className="grid grid-cols-2 gap-3">
              {profiles.map((profile, index) => (
                <div 
                  key={profile.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProfileCard profile={profile} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Feedback Section */}
        <CustomerFeedback />

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

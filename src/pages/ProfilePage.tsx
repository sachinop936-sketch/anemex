import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { profiles, services } from '@/data/profiles';
import { ArrowLeft, Star, CheckCircle, AlertCircle } from 'lucide-react';

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string>('video');

  const profile = profiles.find((p) => p.id === id);
  const service = services.find((s) => s.id === selectedService);

  if (!profile) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground mb-2">Profile not found</h1>
          <Button onClick={() => navigate('/')}>Go Back</Button>
        </div>
      </div>
    );
  }

  const handleProceedToPay = () => {
    if (service) {
      navigate(`/payment?profile=${profile.name}&service=${service.name}&amount=${service.price}`);
    }
  };

  return (
    <div className="min-h-screen gradient-hero">
      <Header />
      
      <main className="pb-36">
        {/* Back Button */}
        <div className="container py-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to hosts
          </button>
        </div>

        {/* Profile Header - Photo, Name, Rating */}
        <section className="container">
          <div className="overflow-hidden rounded-2xl bg-card card-shadow animate-scale-in">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={profile.image}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
                  <span className="text-sm text-muted-foreground">Session Host</span>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span className="text-xs font-medium text-green-600">Verified</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < profile.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
                <span className="ml-1 text-sm text-muted-foreground">
                  ({profile.rating}.0)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Important Info Box */}
        <section className="container mt-4">
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-amber-800">Important Information</p>
                <ul className="text-xs text-amber-700 space-y-1">
                  <li>• Payment screenshot is mandatory</li>
                  <li>• Service starts after verification on Telegram</li>
                  <li>• No refund after service starts</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Service Selection */}
        <section className="container mt-6">
          <h2 className="mb-4 text-lg font-bold text-foreground">Select Service</h2>
          
          <div className="space-y-4">
            {services.map((svc) => (
              <ServiceCard
                key={svc.id}
                service={svc}
                selected={selectedService === svc.id}
                onSelect={() => setSelectedService(svc.id)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Fixed Bottom CTA - Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border/50 bg-card/95 backdrop-blur-lg p-4 shadow-lg">
        <div className="container">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs text-muted-foreground">Selected Service</span>
              <p className="text-sm font-medium text-foreground">{service?.name}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground">Price</span>
              <p className="text-2xl font-bold gradient-text">₹{service?.price}</p>
            </div>
          </div>
          <Button 
            variant="gradient" 
            size="xl" 
            className="w-full"
            onClick={handleProceedToPay}
          >
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

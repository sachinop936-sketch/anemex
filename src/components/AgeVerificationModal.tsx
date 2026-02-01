import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';

interface AgeVerificationModalProps {
  onConfirm: () => void;
}

const AgeVerificationModal = ({ onConfirm }: AgeVerificationModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified');
    if (!verified) {
      setIsVisible(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('ageVerified', 'true');
    setIsVisible(false);
    onConfirm();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl bg-card p-6 card-shadow animate-scale-in">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full gradient-primary">
            <ShieldCheck className="h-8 w-8 text-primary-foreground" />
          </div>
          
          <h2 className="mb-2 text-xl font-bold text-foreground">Age Verification</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            This website is for adults only. You must be 18 years or older to access this content.
          </p>
          
          <div className="mb-4 rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground">
              🔒 No Scam – 100% Real Service
            </p>
          </div>
          
          <Button 
            variant="gradient" 
            size="xl" 
            className="w-full"
            onClick={handleConfirm}
          >
            Yes, I am 18+
          </Button>
          
          <p className="mt-4 text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgeVerificationModal;

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ExternalLink, MessageCircle } from 'lucide-react';

const SuccessPage = () => {
  const [countdown, setCountdown] = useState(5);
  const TELEGRAM_URL = 'https://t.me/SUNITA_OKK';

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = TELEGRAM_URL;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOpenTelegram = () => {
    window.location.href = TELEGRAM_URL;
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl bg-card card-shadow p-6 animate-scale-in text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full gradient-primary animate-pulse-soft">
              <span className="text-xs font-bold text-primary-foreground">✓</span>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Payment Successful! ✅
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Please continue your service on Telegram.
        </p>

        {/* Redirect Notice */}
        <div className="rounded-xl bg-muted p-4 mb-6">
          <div className="flex items-center justify-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Redirecting in {countdown} seconds...
            </span>
          </div>
        </div>

        {/* Manual Button */}
        <Button 
          variant="gradient" 
          size="xl" 
          className="w-full"
          onClick={handleOpenTelegram}
        >
          <ExternalLink className="h-5 w-5" />
          Open Telegram Now
        </Button>

        <p className="mt-4 text-xs text-muted-foreground">
          If redirect doesn't work, tap the button above.
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;

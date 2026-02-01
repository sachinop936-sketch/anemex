import { Button } from '@/components/ui/button';
import { Clock, ExternalLink, MessageCircle } from 'lucide-react';

const SuccessPage = () => {
  const TELEGRAM_URL = 'https://t.me/SUNITA_OKK';

  const handleOpenTelegram = () => {
    window.open(TELEGRAM_URL, '_blank');
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl bg-card card-shadow p-6 animate-scale-in text-center">
        {/* Pending Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
              <Clock className="h-12 w-12 text-amber-500" />
            </div>
            <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 animate-pulse-soft">
              <span className="text-xs font-bold text-white">!</span>
            </div>
          </div>
        </div>

        {/* Pending Message */}
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Payment Under Verification
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Thank you. Your payment is under verification. Our team will connect shortly.
        </p>

        {/* Info Box */}
        <div className="rounded-xl bg-muted p-4 mb-6">
          <div className="flex items-center justify-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Send screenshot to verify faster
            </span>
          </div>
        </div>

        {/* Telegram Button */}
        <Button 
          variant="gradient" 
          size="xl" 
          className="w-full"
          onClick={handleOpenTelegram}
        >
          <ExternalLink className="h-5 w-5" />
          Contact on Telegram
        </Button>

        <p className="mt-4 text-xs text-muted-foreground">
          Service access will be provided after payment verification.
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;

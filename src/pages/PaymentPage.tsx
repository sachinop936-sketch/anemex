import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowLeft, ShieldCheck, MessageCircle, ExternalLink, AlertTriangle, Info } from "lucide-react";

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const [showVerification, setShowVerification] = useState(false);

  const profileName = searchParams.get("profile") || "Service";
  const serviceName = searchParams.get("service") || "Call";
  const amount = searchParams.get("amount") || "99";

  const RAZORPAY_UPI_BASE = "upi://pay?ver=01&mode=19&pa=buzzcart989562.rzp@icici&pn=BUZZCART&cu=INR&mc=5732&qrMedium=04&tr=RZPRCT7AZij7GITsaqrv2";
  const TELEGRAM_URL = "https://t.me/SUNITA_OKK";

  // Build UPI link with dynamic amount and service name as transaction note
  const getUPILink = () => `${RAZORPAY_UPI_BASE}&am=${amount}&tn=${encodeURIComponent(serviceName)}`;

  const handlePayNow = () => {
    // Open UPI app with Razorpay link including service amount
    window.location.href = getUPILink();
    
    // Show verification screen
    setShowVerification(true);
  };

  const handleOpenUPI = () => {
    window.location.href = getUPILink();
  };

  const handleOpenTelegram = () => {
    window.open(TELEGRAM_URL, "_blank");
  };

  const handleGoBack = () => {
    if (showVerification) {
      setShowVerification(false);
    } else {
      window.history.back();
    }
  };

  // Verification Screen
  if (showVerification) {
    return (
      <div className="min-h-screen gradient-hero">
        <Header />

        <main className="container py-6">
          {/* Back Button */}
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {/* Important Notice Box at Top */}
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 mb-6 animate-fade-in">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800">Payment is completed only after UPI confirmation.</p>
                <p className="text-xs text-amber-700 mt-1">Please verify your payment on Telegram.</p>
              </div>
            </div>
          </div>

          {/* Verification Card */}
          <div className="rounded-2xl bg-card card-shadow p-6 animate-scale-in">
            <div className="flex items-center justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <MessageCircle className="h-8 w-8 text-amber-600" />
              </div>
            </div>

            <h1 className="text-center text-xl font-bold text-foreground mb-2">Complete Your Payment</h1>
            
            <p className="text-center text-sm text-muted-foreground mb-4">
              Pay the exact service amount using your UPI app.
              <br />
              After payment, send screenshot on Telegram to activate service.
            </p>

            {/* Order Summary */}
            <div className="rounded-xl bg-muted p-4 mb-6">
              <h2 className="text-sm font-semibold text-foreground mb-3">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Profile</span>
                  <span className="font-medium text-foreground">{profileName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-medium text-foreground">{serviceName}</span>
                </div>
                <div className="border-t border-border my-2" />
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold gradient-text">₹{amount}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={handleOpenUPI}
              >
                <CreditCard className="h-5 w-5" />
                Open UPI App
              </Button>
              
              <Button 
                variant="gradient" 
                size="xl" 
                className="w-full"
                onClick={handleOpenTelegram}
              >
                <ExternalLink className="h-5 w-5" />
                Verify Payment on Telegram
              </Button>
            </div>

            {/* Warning Text */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <AlertTriangle className="h-3 w-3 text-destructive" />
              <p className="text-xs text-destructive font-medium">
                Unverified payments will not receive service.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Initial Payment Screen
  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      <main className="container py-6">
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* Important Notice Box at Top */}
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Payment is completed only after UPI confirmation.</p>
              <p className="text-xs text-amber-700 mt-1">Please verify your payment on Telegram.</p>
            </div>
          </div>
        </div>

        {/* Payment Card */}
        <div className="rounded-2xl bg-card card-shadow p-6 animate-scale-in">
          <div className="flex items-center justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-primary">
              <CreditCard className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>

          <h1 className="text-center text-xl font-bold text-foreground mb-6">Complete Payment</h1>

          {/* Order Summary */}
          <div className="rounded-xl bg-muted p-4 mb-6">
            <h2 className="text-sm font-semibold text-foreground mb-3">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Profile</span>
                <span className="font-medium text-foreground">{profileName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium text-foreground">{serviceName}</span>
              </div>
              <div className="border-t border-border my-2" />
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-xl font-bold gradient-text">₹{amount}</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-xl border-2 border-primary bg-card p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-lg font-bold text-primary">₹</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">UPI Payment</p>
                <p className="text-xs text-muted-foreground">Razorpay Secure UPI</p>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            <span className="text-xs text-muted-foreground">Secure & Encrypted Payment</span>
          </div>

          {/* Pay Button */}
          <Button variant="gradient" size="xl" className="w-full" onClick={handlePayNow}>
            Open UPI App
          </Button>

          {/* Payment Instructions */}
          <div className="mt-4 text-center text-xs text-muted-foreground space-y-1">
            <p className="font-medium">Selected Profile: {profileName}</p>
            <p className="font-medium">Selected Service: {serviceName}</p>
            <p className="font-medium">Service Price: ₹{amount}</p>
            <p className="pt-2">
              Pay the exact service amount using your UPI app.
              <br />
              After payment, send screenshot on Telegram to activate service.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;

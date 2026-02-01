import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const profileName = searchParams.get("profile") || "Service";
  const serviceName = searchParams.get("service") || "Call";
  const amount = searchParams.get("amount") || "99";

  const UPI_ID = "sunitaupadhayay@naviaxis";
  const PAYMENT_NOTE = "Service Booking – QuickCall";

  const handlePayNow = () => {
    setIsRedirecting(true);

    // Create UPI payment intent URL
    const upiUrl = `upi://pay?pa=${UPI_ID}&pn=QuickCall&am=${amount}&cu=INR&tn=${encodeURIComponent(PAYMENT_NOTE)}`;

    // Try to open UPI app
    window.location.href = upiUrl;

    // Redirect to success page after a delay (simulating payment completion)
    setTimeout(() => {
      navigate("/success");
    }, 3000);
  };

  return (
    <div className="min-h-screen gradient-hero">
      <Header />

      <main className="container py-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

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
                <p className="text-xs text-muted-foreground">{UPI_ID}</p>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            <span className="text-xs text-muted-foreground">Secure & Encrypted Payment</span>
          </div>

          {/* Pay Button */}
          <Button variant="gradient" size="xl" className="w-full" onClick={handlePayNow} disabled={isRedirecting}>
            {isRedirecting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Redirecting to UPI...
              </>
            ) : (
              `Pay ₹${amount} via UPI`
            )}
          </Button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            After successful payment, you will be redirected automatically.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;

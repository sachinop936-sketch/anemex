import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { QrCode, Percent } from 'lucide-react';
import { toast } from 'sonner';

const ONLINE_DISCOUNT_PERCENT = 3;

const upiMethods = [
  { id: 'gpay', name: 'Google Pay', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png' },
  { id: 'phonepe', name: 'PhonePe', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/512px-PhonePe_Logo.svg.png' },
  { id: 'paytm', name: 'Paytm', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/512px-Paytm_Logo_%28standalone%29.svg.png' },
  { id: 'upi', name: 'Other UPI APP', icon: QrCode },
];

const CheckoutPaymentPage = () => {
  const navigate = useNavigate();
  const { items } = useCart();

  const [selectedUpi, setSelectedUpi] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(6 * 60 + 20);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalOriginalPrice = items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const discount = totalOriginalPrice - totalPrice;

  const onlineDiscount = Math.round(totalPrice * ONLINE_DISCOUNT_PERCENT / 100);
  const finalPrice = totalPrice - onlineDiscount;
  const payableNow = finalPrice;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}min ${secs.toString().padStart(2, '0')}sec`;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h1>
          <Button onClick={() => navigate('/')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  const canProceed = !!selectedUpi;

  const handlePay = () => {
    const UPI_ID = 'buzzcart989562.rzp@icici';
    const UPI_TR = 'RZPRCT7AZij7GITsaqrv2';
    const itemNames = items.map(item => item.name).join(', ');
    const upiLink = `upi://pay?ver=01&mode=19&pa=${encodeURIComponent(UPI_ID)}&pn=BUZZCART&cu=INR&mc=5732&qrMedium=04&tr=${encodeURIComponent(UPI_TR)}&am=${payableNow}&tn=${encodeURIComponent(itemNames)}`;
    toast.success('Payment initiated! Redirecting...');
    window.location.href = upiLink;
  };

  return (
    <div className="min-h-screen bg-background">
      <CheckoutHeader title="Payment" />
      <CheckoutSteps currentStep={3} />

      <main className="pb-28">
        <div className="container">
          <div className="text-center py-4">
            <p className="text-xl font-semibold text-orange-500">{formatTime(timeLeft)}</p>
          </div>
        </div>

        <div className="container space-y-4">
          <div className="rounded-xl bg-green-50 border border-green-200 p-3 flex items-start gap-3 animate-fade-in">
            <Percent className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-green-800">Extra {ONLINE_DISCOUNT_PERCENT}% Online Discount Applied!</p>
              <p className="text-[11px] text-green-700 mt-0.5">You save ₹{onlineDiscount.toLocaleString()} extra with online payment.</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 animate-fade-in">
            <h3 className="text-sm font-bold text-foreground mb-3">Select UPI App</h3>
            <div className="space-y-3">
              {upiMethods.map((method) => (
                <button key={method.id} onClick={() => setSelectedUpi(method.id)}
                  className={`w-full flex items-center gap-4 p-3 rounded-lg border transition-all ${selectedUpi === method.id ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/50'}`}>
                  <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${selectedUpi === method.id ? 'border-primary' : 'border-muted-foreground/40'}`}>
                    {selectedUpi === method.id && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                  </div>
                  <span className="text-sm font-medium text-foreground flex-1 text-left">{method.name}</span>
                  {method.logo ? (
                    <div className="h-8 w-8 rounded flex items-center justify-center bg-white p-0.5">
                      <img src={method.logo} alt={method.name} className="h-6 w-auto object-contain" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded flex items-center justify-center bg-muted">
                      {method.icon && <method.icon className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="text-base font-bold text-foreground mb-3">Price Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                <span className="text-foreground">₹{totalOriginalPrice.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount</span>
                <span className="text-green-600 font-medium">-₹{discount.toLocaleString()}.00</span>
              </div>
              {onlineDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-medium">Online Payment Discount</span>
                  <span className="text-green-600 font-medium">-₹{onlineDiscount.toLocaleString()}.00</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Charges</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <div className="border-t border-dashed border-border my-2" />
              <div className="flex justify-between text-sm font-bold">
                <span className="text-foreground">Total Amount</span>
                <span className="text-foreground">₹{finalPrice.toLocaleString()}.00</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="container flex items-center gap-4">
          <div className="flex flex-col">
            {onlineDiscount > 0 && <span className="text-xs text-muted-foreground line-through">₹{totalPrice.toLocaleString()}.00</span>}
            <span className="text-base font-bold text-foreground">₹{payableNow.toLocaleString()}.00</span>
          </div>
          <button
            className={`flex-1 h-14 rounded-2xl bg-[hsl(40,100%,55%)] hover:bg-[hsl(40,100%,50%)] text-[hsl(0,0%,10%)] font-bold text-base transition-colors active:scale-[0.98] ${!canProceed ? 'opacity-50 pointer-events-none' : ''}`}
            disabled={!canProceed}
            onClick={handlePay}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPaymentPage;

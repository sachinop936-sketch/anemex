import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopHeader from '@/components/shop/ShopHeader';
import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft, QrCode, Truck, Percent, Info } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ONLINE_DISCOUNT_PERCENT = 3;

const upiMethods = [
  {
    id: 'gpay',
    name: 'Google Pay',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png',
  },
  {
    id: 'phonepe',
    name: 'PhonePe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/512px-PhonePe_Logo.svg.png',
  },
  {
    id: 'paytm',
    name: 'Paytm',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/512px-Paytm_Logo_%28standalone%29.svg.png',
  },
  {
    id: 'upi',
    name: 'Other UPI APP',
    icon: QrCode,
  },
];

const CheckoutPaymentPage = () => {
  const navigate = useNavigate();
  const { items } = useCart();

  const [paymentType, setPaymentType] = useState<'online' | 'cod' | null>(null);
  const [selectedUpi, setSelectedUpi] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(6 * 60 + 20);
  const [payLoading, setPayLoading] = useState(false);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalOriginalPrice = items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const discount = totalOriginalPrice - totalPrice;

  const isOnline = paymentType === 'online';
  const isCod = paymentType === 'cod';

  const onlineDiscount = isOnline ? Math.round(totalPrice * ONLINE_DISCOUNT_PERCENT / 100) : 0;
  const finalPrice = isOnline ? totalPrice - onlineDiscount : totalPrice;
  const payableNow = isOnline ? finalPrice : totalPrice;

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

  const canProceed = isOnline ? !!selectedUpi : isCod;

  const handlePay = async () => {
    setPayLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment-link', {
        body: {
          items: items.map(item => ({ name: item.name })),
          totalAmount: payableNow,
        },
      });

      if (error || !data?.paymentUrl) {
        toast.error('Payment failed. Please try again.');
        console.error('Payment error:', error);
        return;
      }

      window.location.href = data.paymentUrl;
    } catch (err) {
      toast.error('Payment failed. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setPayLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ShopHeader />
      <CheckoutSteps currentStep={3} />

      <main className="pb-28">
        {/* Header */}
        <div className="container py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Payments
          </button>
        </div>

        {/* Timer */}
        <div className="container">
          <div className="text-center py-4">
            <p className="text-xl font-semibold text-orange-500">{formatTime(timeLeft)}</p>
          </div>
        </div>

        <div className="container space-y-4">
          {/* Payment Type Selection */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="text-sm font-bold text-foreground mb-3">Choose Payment Type</h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Online Payment */}
              <button
                onClick={() => { setPaymentType('online'); setSelectedUpi(null); }}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  isOnline ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                {/* Discount badge */}
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                  <Percent className="h-2.5 w-2.5" />{ONLINE_DISCOUNT_PERCENT}% OFF
                </span>
                <QrCode className={`h-6 w-6 ${isOnline ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-xs font-semibold text-foreground">Online Payment</span>
                <span className="text-[10px] text-green-600 font-medium">Extra {ONLINE_DISCOUNT_PERCENT}% discount</span>
              </button>

              {/* Cash on Delivery */}
              <button
                onClick={() => { setPaymentType('cod'); setSelectedUpi(null); }}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  isCod ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <Truck className={`h-6 w-6 ${isCod ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-xs font-semibold text-foreground">Cash on Delivery</span>
                <span className="text-[10px] text-muted-foreground font-medium">Pay at delivery</span>
              </button>
            </div>
          </div>


          {/* Online Discount Banner */}
          {isOnline && (
            <div className="rounded-xl bg-green-50 border border-green-200 p-3 flex items-start gap-3 animate-fade-in">
              <Percent className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-green-800">Extra {ONLINE_DISCOUNT_PERCENT}% Online Discount Applied!</p>
                <p className="text-[11px] text-green-700 mt-0.5">
                  You save ₹{onlineDiscount.toLocaleString()} extra with online payment.
                </p>
              </div>
            </div>
          )}

          {/* UPI Method Selection (only for online) */}
          {isOnline && (
            <div className="bg-card border border-border rounded-xl p-4 animate-fade-in">
              <h3 className="text-sm font-bold text-foreground mb-3">Select UPI App</h3>
              <div className="space-y-3">
                {upiMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedUpi(method.id)}
                    className={`w-full flex items-center gap-4 p-3 rounded-lg border transition-all ${
                      selectedUpi === method.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      selectedUpi === method.id ? 'border-primary' : 'border-muted-foreground/40'
                    }`}>
                      {selectedUpi === method.id && (
                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                      )}
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
          )}

          {/* Price Details */}
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
              {isOnline && onlineDiscount > 0 && (
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

      {/* Sticky Pay Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="container flex items-center gap-4">
          <div className="flex flex-col">
            {(isOnline && onlineDiscount > 0) && (
              <span className="text-xs text-muted-foreground line-through">₹{totalPrice.toLocaleString()}.00</span>
            )}
            <span className="text-base font-bold text-foreground">₹{payableNow.toLocaleString()}.00</span>
          </div>
          <Button
            variant="gradient"
            size="xl"
            className="flex-1"
            disabled={!canProceed || payLoading}
            onClick={handlePay}
          >
            {isCod ? 'Pay Advance & Place Order' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPaymentPage;

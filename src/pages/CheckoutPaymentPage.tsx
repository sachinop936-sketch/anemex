import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ONLINE_DISCOUNT_PERCENT = 3;

const upiMethods = [
  {
    id: 'phonepe',
    name: 'PhonePe',
    logo: 'https://cdn.worldvectorlogo.com/logos/phonepe-1.svg',
  },
  {
    id: 'paytm',
    name: 'Paytm',
    logo: 'https://cdn.worldvectorlogo.com/logos/paytm-1.svg',
  },
  {
    id: 'bhimupi',
    name: 'Bhim UPI',
    logo: 'https://cdn.worldvectorlogo.com/logos/bhim-1.svg',
  },
  {
    id: 'upi',
    name: 'Other UPI APP',
    logo: 'https://cdn.worldvectorlogo.com/logos/upi-1.svg',
  },
];

const CheckoutPaymentPage = () => {
  const navigate = useNavigate();
  const { items } = useCart();

  const [selectedUpi, setSelectedUpi] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(6 * 60 + 20);
  const [payLoading, setPayLoading] = useState(false);

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
      <CheckoutHeader title="Payments" />
      <CheckoutSteps currentStep={3} />

      <main className="pb-28">
        {/* Timer */}
        <div className="text-center py-4">
          <p className="text-xl font-semibold text-orange-500">{formatTime(timeLeft)}</p>
        </div>

        {/* PAY ONLINE section header */}
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-foreground uppercase tracking-wide">PAY ONLINE (PhonePe/Paytm/Scan)</span>
            <div className="flex-1 h-px bg-border" />
          </div>
        </div>

        {/* UPI Methods - Card style */}
        <div className="px-4 space-y-3">
          {upiMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedUpi(method.id)}
              className={`w-full flex items-center gap-4 p-5 border-2 transition-all bg-card ${
                selectedUpi === method.id
                  ? 'border-primary'
                  : 'border-border hover:border-primary/30'
              }`}
            >
              <div className="h-10 w-10 rounded-full flex items-center justify-center bg-white p-1 border border-border">
                <img src={method.logo} alt={method.name} className="h-7 w-7 object-contain" />
              </div>
              <span className="text-base font-medium text-foreground">{method.name}</span>
            </button>
          ))}
        </div>
      </main>

      {/* Sticky Pay Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="container">
          <Button
            variant="gradient"
            size="xl"
            className="w-full"
            disabled={!canProceed || payLoading}
            onClick={handlePay}
          >
            PAY
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPaymentPage;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopHeader from '@/components/shop/ShopHeader';
import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft, QrCode } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const paymentMethods = [
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

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(6 * 60 + 20);
  const [payLoading, setPayLoading] = useState(false);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

  const handlePay = async () => {
    setPayLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment-link', {
        body: {
          items: items.map(item => ({ name: item.name })),
          totalAmount: totalPrice,
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

        {/* Payment Methods */}
        <div className="container">
          <p className="text-xs text-muted-foreground mb-4">
            PAY ONLINE (PhonePe/Paytm/Scan)
          </p>

          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  selectedMethod === method.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                {method.logo ? (
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-white p-1">
                    <img src={method.logo} alt={method.name} className="h-8 w-auto object-contain" />
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-muted">
                    {method.icon && <method.icon className="h-6 w-6 text-muted-foreground" />}
                  </div>
                )}
                <span className="text-base font-medium text-foreground">{method.name}</span>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Pay Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="container">
          <Button
            variant="gradient"
            size="xl"
            className="w-full"
            disabled={!selectedMethod || payLoading}
            onClick={handlePay}
          >
            PAY ₹{totalPrice.toLocaleString()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPaymentPage;

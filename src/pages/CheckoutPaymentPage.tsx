import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ShopHeader from '@/components/shop/ShopHeader';
import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { ArrowLeft, Smartphone, CreditCard, Wallet, QrCode } from 'lucide-react';

const paymentMethods = [
  {
    id: 'phonepe',
    name: 'PhonePe',
    icon: Smartphone,
    color: 'bg-purple-100 text-purple-600 border-purple-300',
  },
  {
    id: 'paytm',
    name: 'Paytm',
    icon: Wallet,
    color: 'bg-blue-100 text-blue-600 border-blue-300',
  },
  {
    id: 'gpay',
    name: 'Google Pay',
    icon: CreditCard,
    color: 'bg-green-100 text-green-600 border-green-300',
  },
  {
    id: 'upi',
    name: 'Other UPI APP',
    icon: QrCode,
    color: 'bg-gray-100 text-gray-600 border-gray-300',
  },
];

const CheckoutPaymentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(6 * 60 + 20); // 6min 20sec

  const product = products.find((p) => p.id === productId);

  // Countdown timer
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

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground mb-2">Product not found</h1>
          <Button onClick={() => navigate('/')}>Go Back</Button>
        </div>
      </div>
    );
  }

  const handlePay = () => {
    // In a real app, this would integrate with payment gateway
    alert('Payment integration would go here. Redirecting to success page...');
    navigate('/');
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
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${method.color}`}>
                  <method.icon className="h-6 w-6" />
                </div>
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
            disabled={!selectedMethod}
            onClick={handlePay}
          >
            PAY ₹{product.discountPrice.toLocaleString()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPaymentPage;

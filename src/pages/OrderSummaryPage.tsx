import { useNavigate, useSearchParams } from 'react-router-dom';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { ShieldCheck, X } from 'lucide-react';
import { z } from 'zod';
import { useMemo } from 'react';

const AddressSchema = z.object({
  fullName: z.string().min(1).max(100),
  mobile: z.string().regex(/^\d{10}$/),
  pincode: z.string().regex(/^\d{6}$/),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  houseNo: z.string().min(1).max(200),
  roadArea: z.string().max(200).optional().default(''),
});

type Address = z.infer<typeof AddressSchema>;

const OrderSummaryPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const addressParam = searchParams.get('address');
  const { items, removeFromCart, updateQuantity } = useCart();

  const address: Address | null = useMemo(() => {
    if (!addressParam) return null;
    try {
      const parsed = JSON.parse(decodeURIComponent(addressParam));
      return AddressSchema.parse(parsed);
    } catch {
      navigate('/address', { replace: true });
      return null;
    }
  }, [addressParam, navigate]);

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

  const totalOriginalPrice = items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const totalDiscountPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = totalOriginalPrice - totalDiscountPrice;

  const handleContinue = () => {
    navigate(`/payment?address=${encodeURIComponent(addressParam || '')}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <CheckoutHeader title="Order Summary" />
      <CheckoutSteps currentStep={2} />

      <main className="pb-32">
        {/* Delivered To Section */}
        <div className="container py-4">
          <div className="rounded-xl bg-card p-4 border border-border">
            <h2 className="text-base font-semibold text-primary mb-2">Delivered to:</h2>
            {address && (
              <div className="text-sm text-muted-foreground">
                <p>Address: {address.houseNo}, {address.roadArea}</p>
                <p>{address.city}, {address.state} - {address.pincode}</p>
                <p>Contact Number: {address.mobile}</p>
              </div>
            )}
          </div>
        </div>

        {/* Cart Items */}
        <div className="container space-y-3">
          <h2 className="text-base font-semibold text-foreground">Cart Items ({items.length})</h2>
          {items.map((item, idx) => (
            <div key={`${item.id}-${item.size || ''}-${idx}`} className="rounded-xl bg-card p-4 border border-border">
              <div className="flex gap-4">
                <div className="h-20 w-20 rounded-lg overflow-hidden bg-white border border-border flex-shrink-0 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain p-1"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium text-foreground line-clamp-2">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="h-6 w-6 rounded-full bg-muted flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors flex-shrink-0"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  {item.size && (
                    <span className="inline-block mt-1 text-[10px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded">
                      Size: {item.size}
                    </span>
                  )}
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex items-center gap-1 rounded-sm bg-blue-600 px-1.5 py-0.5">
                      <ShieldCheck className="h-3 w-3 text-white" />
                      <span className="text-[10px] font-semibold text-white">Assured</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                        className="h-7 w-7 flex items-center justify-center rounded-l-md border border-border bg-muted text-sm font-bold hover:bg-muted/80 transition-colors"
                      >
                        −
                      </button>
                      <span className="h-7 w-8 flex items-center justify-center border-t border-b border-border text-xs font-semibold bg-card">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                        className="h-7 w-7 flex items-center justify-center rounded-r-md border border-border bg-muted text-sm font-bold hover:bg-muted/80 transition-colors"
                        disabled={item.quantity >= 10}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-muted-foreground line-through">
                      ₹{(item.originalPrice * item.quantity).toLocaleString()}
                    </span>
                    <span className="text-sm font-bold text-foreground">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price Details */}
        <div className="container mt-4">
          <div className="rounded-xl bg-card p-4 border border-border">
            <h2 className="text-base font-semibold text-foreground mb-4">Price Details</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price ({items.length} items)</span>
                <span className="text-foreground">₹{Math.round(totalOriginalPrice).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount</span>
                <span className="text-green-600">-₹{Math.round(savings).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Charges</span>
                <span className="text-green-600">FREE Delivery</span>
              </div>
              
              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total Amount</span>
                  <span className="font-bold text-foreground">₹{totalDiscountPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm font-medium text-green-700">
                You will save ₹{Math.round(savings).toLocaleString()} on this order
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="container mt-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Safe and secure payments. Easy returns.</p>
              <p className="text-xs text-muted-foreground">100% Authentic products.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="container flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground line-through">₹{Math.round(totalOriginalPrice).toLocaleString()}</p>
            <p className="text-xl font-bold text-foreground">₹{totalDiscountPrice.toLocaleString()}</p>
          </div>
          <button
            onClick={handleContinue}
            className="flex-1 max-w-[200px] h-14 rounded-2xl bg-[hsl(40,100%,55%)] hover:bg-[hsl(40,100%,50%)] text-[hsl(0,0%,10%)] font-bold text-base transition-colors active:scale-[0.98]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPage;

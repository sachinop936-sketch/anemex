import { useNavigate, useSearchParams } from 'react-router-dom';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { z } from 'zod';
import { useMemo } from 'react';
import assuredBadge from '@/assets/assured-badge.png';

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
  const { items } = useCart();

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
        <div className="px-4 py-4">
          <h2 className="text-base font-bold text-foreground mb-2">Delivered to:</h2>
          {address && (
            <div className="text-sm text-muted-foreground space-y-0.5">
              <p>Address: {address.houseNo}, {address.roadArea}, {address.city}, {address.state.substring(0, 2).toUpperCase()},</p>
              <p>Contact Number: {address.mobile}</p>
            </div>
          )}
        </div>

        <div className="border-t border-border" />

        {/* Cart Items */}
        <div className="px-4 py-4 space-y-4">
          {items.map((item) => {
            const discountPercent = item.originalPrice > 0
              ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
              : 0;

            return (
              <div key={item.id} className="bg-card border border-border p-4">
                <div className="flex gap-3">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="h-20 w-16 overflow-hidden bg-white border border-border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground line-clamp-2">
                      {item.name}
                    </h3>

                    {/* Assured badge */}
                    <div className="mt-1">
                      <img src={assuredBadge} alt="Assured" className="h-4 object-contain" />
                    </div>

                    {/* Qty and Price row */}
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-sm text-foreground font-medium">Qty: {item.quantity}</span>

                      {discountPercent > 0 && (
                        <span className="text-xs font-semibold text-green-600">{discountPercent}%</span>
                      )}
                      <span className="text-xs text-muted-foreground line-through">
                        ₹{(item.originalPrice * item.quantity).toLocaleString()}
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        {(item.price * item.quantity).toLocaleString()}.00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-border" />

        {/* Price Details */}
        <div className="px-4 py-4">
          <h2 className="text-base font-bold text-foreground mb-4">Price Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
              <span className="text-foreground">₹{Math.round(totalOriginalPrice).toLocaleString()}.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discount</span>
              <span className="text-green-600 font-medium">₹{Math.round(savings).toLocaleString()}.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery Charges</span>
              <span className="text-green-600 font-semibold">FREE Delivery</span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-foreground">Total Amount</span>
                <span className="text-foreground">₹{totalDiscountPrice.toLocaleString()}.00</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="container flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground line-through">₹{Math.round(totalOriginalPrice).toLocaleString()}</p>
            <p className="text-xl font-bold text-foreground">₹{totalDiscountPrice.toLocaleString()}.00</p>
          </div>
          <Button
            variant="gradient"
            size="xl"
            className="flex-1 max-w-[200px]"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryPage;

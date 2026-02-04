import { useNavigate, useSearchParams } from 'react-router-dom';
import ShopHeader from '@/components/shop/ShopHeader';
import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

const OrderSummaryPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('productId');
  const addressParam = searchParams.get('address');

  const product = products.find((p) => p.id === productId);
  const address = addressParam ? JSON.parse(decodeURIComponent(addressParam)) : null;

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

  const savings = product.originalPrice - product.discountPrice;
  const discountPercent = product.discountPercent;

  const handleContinue = () => {
    navigate(`/payment?productId=${productId}&address=${encodeURIComponent(addressParam || '')}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <ShopHeader />
      <CheckoutSteps currentStep={2} />

      <main className="pb-32">
        {/* Delivered To Section */}
        <div className="container py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

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

        {/* Product Card */}
        <div className="container">
          <div className="rounded-xl bg-card p-4 border border-border">
            <div className="flex gap-4">
              <div className="h-20 w-20 rounded-lg overflow-hidden bg-white border border-border flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain p-1"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-foreground line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex items-center gap-1 rounded-sm bg-blue-600 px-1.5 py-0.5">
                    <ShieldCheck className="h-3 w-3 text-white" />
                    <span className="text-[10px] font-semibold text-white">Assured</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-foreground">Qty: 1</span>
                  <span className="text-xs font-semibold text-green-600">{discountPercent}%</span>
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    ₹{product.discountPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Details */}
        <div className="container mt-4">
          <div className="rounded-xl bg-card p-4 border border-border">
            <h2 className="text-base font-semibold text-foreground mb-4">Price Details</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price (1 item)</span>
                <span className="text-foreground">₹{product.originalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount</span>
                <span className="text-green-600">-₹{savings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Charges</span>
                <span className="text-green-600">FREE Delivery</span>
              </div>
              
              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total Amount</span>
                  <span className="font-bold text-foreground">₹{product.discountPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm font-medium text-green-700">
                You will save ₹{savings.toLocaleString()} on this order
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
            <p className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</p>
            <p className="text-xl font-bold text-foreground">₹{product.discountPrice.toLocaleString()}</p>
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

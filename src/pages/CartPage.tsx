import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { ShieldCheck, X, ShoppingCart, ArrowLeft } from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalOriginalPrice = items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const totalDiscountPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = totalOriginalPrice - totalDiscountPrice;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 bg-gradient-to-r from-[hsl(217,89%,50%)] to-[hsl(217,89%,60%)] shadow-sm">
          <div className="flex items-center gap-3 px-4 py-3">
            <button onClick={() => navigate('/')} className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <h1 className="text-lg font-bold text-white">My Cart</h1>
          </div>
        </header>
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <ShoppingCart className="h-20 w-20 text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-sm text-muted-foreground mb-6">Add items to get started</p>
          <button
            onClick={() => navigate('/')}
            className="h-12 px-8 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-gradient-to-r from-[hsl(217,89%,50%)] to-[hsl(217,89%,60%)] shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <h1 className="text-lg font-bold text-white">My Cart ({items.length})</h1>
          </div>
        </div>
      </header>

      <main className="pb-32">
        {/* Cart Items */}
        <div className="container py-4 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-xl bg-card p-4 border border-border">
              <div className="flex gap-4">
                <div className="h-24 w-24 rounded-lg overflow-hidden bg-white border border-border flex-shrink-0">
                  <img src={item.image} alt={item.name} className="h-full w-full object-contain p-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-medium text-foreground line-clamp-2">{item.name}</h3>
                    <button
                      onClick={() => updateQuantity(item.id, 0)}
                      className="h-6 w-6 rounded-full bg-muted flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors flex-shrink-0"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex items-center gap-1 rounded-sm bg-blue-600 px-1.5 py-0.5">
                      <ShieldCheck className="h-3 w-3 text-white" />
                      <span className="text-[10px] font-semibold text-white">Assured</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-7 w-7 flex items-center justify-center rounded-l-md border border-border bg-muted text-sm font-bold hover:bg-muted/80 transition-colors"
                      >
                        −
                      </button>
                      <span className="h-7 w-8 flex items-center justify-center border-t border-b border-border text-xs font-semibold bg-card">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
        <div className="container">
          <div className="rounded-xl bg-card p-4 border border-border">
            <h2 className="text-base font-semibold text-foreground mb-4">Price Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price ({items.length} items)</span>
                <span className="text-foreground">₹{Math.round(totalOriginalPrice).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount</span>
                <span className="text-green-600">−₹{Math.round(savings).toLocaleString()}</span>
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
      </main>

      {/* Sticky Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="container flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground line-through">₹{Math.round(totalOriginalPrice).toLocaleString()}</p>
            <p className="text-xl font-bold text-foreground">₹{totalDiscountPrice.toLocaleString()}</p>
          </div>
          <button
            onClick={() => navigate('/address')}
            className="flex-1 max-w-[200px] h-14 rounded-2xl bg-[hsl(40,100%,55%)] hover:bg-[hsl(40,100%,50%)] text-[hsl(0,0%,10%)] font-bold text-base transition-colors active:scale-[0.98]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

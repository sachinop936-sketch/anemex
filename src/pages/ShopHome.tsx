import { useState, useEffect } from 'react';
import ShopHeader from '@/components/shop/ShopHeader';
import ShopFooter from '@/components/shop/ShopFooter';
import ShopProductCard from '@/components/shop/ShopProductCard';
import { products } from '@/data/products';
import { Clock } from 'lucide-react';

const categories = ['Categories', 'Fashion', 'Electronics', 'Home', 'Beauty'];

const ShopHome = () => {
  const [timeLeft, setTimeLeft] = useState(8 * 60 + 13); // 8:13 like in the reference

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 8 * 60)); // Reset when reaches 0
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <ShopHeader />

      <main>
        {/* Category Tabs */}
        <div className="overflow-x-auto border-b border-border/50 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500">
          <div className="flex">
            {categories.map((category, index) => (
              <button
                key={index}
                className="flex-shrink-0 px-4 py-2.5 text-xs font-medium text-white/90 hover:text-white transition-colors whitespace-nowrap"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Sale Banner */}
        <section className="relative overflow-hidden">
          <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 p-6 text-center relative">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-2 left-4 w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
              <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <div className="absolute bottom-4 left-12 w-1 h-1 bg-yellow-200 rounded-full animate-pulse" />
              <div className="absolute bottom-8 right-4 w-2 h-2 bg-white/50 rounded-full animate-pulse" />
            </div>
            
            {/* Sale Badge */}
            <div className="inline-block mb-3">
              <div className="bg-yellow-400 text-purple-900 px-3 py-1 rounded text-xs font-bold">
                THE BIG BILLION DAYS
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-1">
              Biggest Sale
            </h1>
            <p className="text-3xl font-extrabold text-yellow-300 mb-3">
              of 2024
            </p>
            <div className="inline-block bg-yellow-400 text-purple-900 px-4 py-1.5 rounded-full text-sm font-semibold">
              Take a Sneak Peek
            </div>
          </div>
        </section>

        {/* Deals of the Day Header */}
        <section className="flex items-center justify-between px-4 py-3 bg-white border-b border-border/50">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-blue-600">Deals of the Day</span>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">{formatTime(timeLeft)}</span>
            </div>
          </div>
          <div className="border border-red-500 rounded px-2 py-0.5">
            <span className="text-[10px] font-semibold text-red-500">SALE IS LIVE</span>
          </div>
        </section>

        {/* Products Grid - Flipkart Style */}
        <section className="border-t border-l border-border/40">
          <div className="grid grid-cols-2">
            {products.map((product, index) => (
              <ShopProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>
      </main>

      <ShopFooter />
    </div>
  );
};

export default ShopHome;

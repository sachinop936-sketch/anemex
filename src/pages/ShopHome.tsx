import { useState, useEffect, useMemo, useCallback } from 'react';
import ShopHeader from '@/components/shop/ShopHeader';
import ShopProductCard from '@/components/shop/ShopProductCard';
import { products } from '@/data/products';
import { ChevronRight, Sparkles, Gift, Percent, Tag } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.webp';
import heroBanner2 from '@/assets/feedback-6.jpg';

const TIMER_KEY = 'flipkart_sale_timer_end';
const TIMER_DURATION = 7 * 60 * 1000; // 7 minutes in milliseconds

const ShopHome = () => {
  // Shuffle product positions on each page load (prices stay fixed per product)
  const shuffledProducts = useMemo(() => {
    const arr = [...products];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  const [timeLeft, setTimeLeft] = useState(0);
  const banners = [heroBanner2, heroBanner];
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  useEffect(() => {
    const getEndTime = (): number => {
      const stored = localStorage.getItem(TIMER_KEY);
      if (stored && parseInt(stored) > Date.now()) {
        return parseInt(stored);
      }
      const newEnd = Date.now() + TIMER_DURATION;
      localStorage.setItem(TIMER_KEY, newEnd.toString());
      return newEnd;
    };

    let endTime = getEndTime();

    const updateTimer = () => {
      const remaining = Math.max(0, endTime - Date.now());
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        endTime = Date.now() + TIMER_DURATION;
        localStorage.setItem(TIMER_KEY, endTime.toString());
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}min ${secs.toString().padStart(2, '0')}sec`;
  };
  return (
    <div className="min-h-screen bg-muted">
      <ShopHeader />

      <main className="pb-20">
        {/* Hero Banner Slider */}
        <section className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentBanner * 100}%)` }}
          >
            {banners.map((banner, i) => (
              <img
                key={i}
                src={banner}
                alt={`Sale Banner ${i + 1}`}
                className="w-full h-auto flex-shrink-0"
              />
            ))}
          </div>
          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentBanner(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentBanner ? 'w-4 bg-primary' : 'w-1.5 bg-white/60'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Trust Badges */}
        <section className="bg-white py-3 px-4 border-b border-border/50">
          <div className="flex items-center justify-around text-center">
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                <Gift className="h-4 w-4 text-primary" />
              </div>
              <span className="text-[10px] text-muted-foreground">Free Delivery</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                <Percent className="h-4 w-4 text-primary" />
              </div>
              <span className="text-[10px] text-muted-foreground">Lowest Price</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span className="text-[10px] text-muted-foreground">Top Quality</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                <Tag className="h-4 w-4 text-primary" />
              </div>
              <span className="text-[10px] text-muted-foreground">Best Deals</span>
            </div>
          </div>
        </section>

        {/* Live Sale Timer */}
        <section className="bg-background py-4 text-center">
          <p className="text-lg font-semibold text-foreground">
            Sale Ends In : <span className="text-orange-500">{formatTime(timeLeft)}</span>
          </p>
        </section>


        {/* Products Grid - Meesho 2-column Style */}
        <section className="bg-background">
          <div className="grid grid-cols-2">
            {shuffledProducts.map((product, index) => (
              <ShopProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ShopHome;

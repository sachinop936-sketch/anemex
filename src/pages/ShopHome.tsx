import { useState, useEffect } from 'react';
import ShopHeader from '@/components/shop/ShopHeader';
import ShopProductCard from '@/components/shop/ShopProductCard';
import { useProducts } from '@/hooks/useProducts';
import { ChevronRight, Sparkles, Gift, Percent, Tag } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.webp';

const TIMER_KEY = 'flipkart_sale_timer_end';
const TIMER_DURATION = 7 * 60 * 1000;

const BANNER_URL = '/images/banner.png';

const ShopHome = () => {
  const { products: dbProducts, loading } = useProducts();

  const sourceProducts = dbProducts;

  const shuffledProducts = sourceProducts;

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const getEndTime = (): number => {
      const stored = localStorage.getItem(TIMER_KEY);
      if (stored && parseInt(stored) > Date.now()) return parseInt(stored);
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

  const normalizeProduct = (p: any) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    shortDescription: p.shortDescription || p.short_description || '',
    originalPrice: p.originalPrice || p.original_price || 0,
    discountPrice: p.discountPrice || p.price || 0,
    discountPercent: p.discountPercent || p.discount_percent || 0,
    image: p.image,
    images: p.images,
    category: p.category,
    tag: p.tag,
    stockTag: p.stockTag || p.stock_tag,
    rating: p.rating,
    reviewCount: p.reviewCount || p.review_count || 0,
    features: p.features || [],
    seller: p.seller || '',
    freeDelivery: p.freeDelivery ?? p.free_delivery ?? true,
  });

  return (
    <div className="min-h-screen bg-muted">
      <ShopHeader />

      <main className="pb-20">
        {/* Hero Banner */}
        <section>
          <img 
            src={BANNER_URL} 
            alt="Big End of Season Sale - Live Now" 
            className="w-full h-auto"
            onError={(e) => { (e.target as HTMLImageElement).src = heroBanner; }}
          />
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

        {/* Products Grid */}
        <section className="bg-background">
          <div className="grid grid-cols-2">
            {shuffledProducts.map((product, index) => (
              <ShopProductCard key={product.id} product={normalizeProduct(product)} index={index} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ShopHome;

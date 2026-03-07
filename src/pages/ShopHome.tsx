import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ShopHeader from '@/components/shop/ShopHeader';
import ShopProductCard from '@/components/shop/ShopProductCard';
import { useProducts } from '@/hooks/useProducts';
import { products as staticProducts } from '@/data/products';
import { ChevronRight, Sparkles, Gift, Percent, Tag } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.webp';
import { supabase } from '@/integrations/supabase/client';

const TIMER_KEY = 'flipkart_sale_timer_end';
const TIMER_DURATION = 7 * 60 * 1000;

// Fuzzy match: checks if all characters of the query appear in order in the target
const fuzzyMatch = (target: string, query: string): boolean => {
  const t = target.toLowerCase();
  const q = query.toLowerCase();
  let ti = 0;
  for (let qi = 0; qi < q.length; qi++) {
    const idx = t.indexOf(q[qi], ti);
    if (idx === -1) return false;
    ti = idx + 1;
  }
  return true;
};

// Score a product against a search query (higher = better match)
const searchScore = (product: any, query: string): number => {
  const q = query.toLowerCase().trim();
  if (!q) return 1;
  
  const name = (product.name || '').toLowerCase();
  const category = (product.category || '').toLowerCase();
  const description = (product.description || product.short_description || product.shortDescription || '').toLowerCase();
  const seller = (product.seller || '').toLowerCase();

  // Exact substring match in name (best)
  if (name.includes(q)) return 100;
  // Word starts with query in name
  if (name.split(/\s+/).some((w: string) => w.startsWith(q))) return 90;
  // Category match
  if (category.includes(q)) return 80;
  // Seller match
  if (seller.includes(q)) return 70;
  // Description match
  if (description.includes(q)) return 60;
  
  // Split query into words — all words must match somewhere
  const words = q.split(/\s+/).filter(Boolean);
  const allText = `${name} ${category} ${description} ${seller}`;
  if (words.length > 1 && words.every(w => allText.includes(w))) return 50;
  // At least some words match
  const matchCount = words.filter(w => allText.includes(w)).length;
  if (matchCount > 0) return 20 + (matchCount / words.length) * 20;

  // Fuzzy match on name
  if (fuzzyMatch(name, q)) return 15;
  // Fuzzy match on category
  if (fuzzyMatch(category, q)) return 10;
  // Fuzzy on description
  if (fuzzyMatch(allText, q)) return 5;

  return 0;
};

const ShopHome = () => {
  const { products: dbProducts, loading } = useProducts();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const sourceProducts = loading ? [] : (dbProducts.length > 0 ? dbProducts : staticProducts);

  const displayProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      // No search — shuffle
      const arr = [...sourceProducts];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
    // Search — score and filter
    const scored = sourceProducts
      .map(p => ({ product: p, score: searchScore(p, searchQuery) }))
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score);
    return scored.map(s => s.product);
  }, [sourceProducts, searchQuery]);

  const [timeLeft, setTimeLeft] = useState(0);
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);

  useEffect(() => {
    supabase.from('banners').select('image_url').eq('is_active', true).order('sort_order').limit(1).then(({ data }) => {
      if (data && data.length > 0) setBannerUrl(data[0].image_url);
    });
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <ShopHeader />

      <main className="pb-20">
        {/* Show banner/trust badges/timer only when not searching */}
        {!searchQuery && (
          <>
            <section>
              <img 
                src={bannerUrl || heroBanner} 
                alt="Big End of Season Sale - Live Now" 
                className="w-full h-auto"
              />
            </section>

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

            <section className="bg-background py-4 text-center">
              <p className="text-lg font-semibold text-foreground">
                Sale Ends In : <span className="text-orange-500">{formatTime(timeLeft)}</span>
              </p>
            </section>
          </>
        )}

        {/* Search results header */}
        {searchQuery && (
          <div className="bg-background px-4 py-3 border-b border-border/50">
            <p className="text-sm text-muted-foreground">
              {displayProducts.length > 0 
                ? `Showing ${displayProducts.length} result${displayProducts.length !== 1 ? 's' : ''} for "${searchQuery}"`
                : `No results found for "${searchQuery}"`
              }
            </p>
          </div>
        )}

        {/* Products Grid */}
        <section className="bg-background">
          <div className="grid grid-cols-2">
            {displayProducts.map((product, index) => (
              <ShopProductCard key={product.id} product={normalizeProduct(product)} index={index} />
            ))}
          </div>
        </section>

        {/* No results message */}
        {searchQuery && displayProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <p className="text-lg font-medium text-foreground mb-2">No products found</p>
            <p className="text-sm text-muted-foreground">Try a different search term or browse all products</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ShopHome;

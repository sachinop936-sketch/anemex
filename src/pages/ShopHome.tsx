import ShopHeader from '@/components/shop/ShopHeader';
import ShopFooter from '@/components/shop/ShopFooter';
import ShopProductCard from '@/components/shop/ShopProductCard';
import { products } from '@/data/products';
import { ChevronRight, Sparkles, Gift, Percent, Tag } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.webp';

const ShopHome = () => {
  return (
    <div className="min-h-screen bg-muted">
      <ShopHeader />

      <main className="pb-20">
        {/* Hero Banner */}
        <section>
          <img 
            src={heroBanner} 
            alt="Big End of Season Sale - Live Now" 
            className="w-full h-auto"
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

        {/* Products Header */}
        <section className="bg-background px-4 py-3 flex items-center justify-between border-b border-border/50">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Products For You</h2>
            <p className="text-xs text-muted-foreground">{products.length} items</p>
          </div>
          <button className="text-xs font-medium text-primary flex items-center gap-0.5">
            View All
            <ChevronRight className="h-3 w-3" />
          </button>
        </section>

        {/* Products Grid - Meesho 2-column Style */}
        <section className="bg-background">
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

import { useState } from 'react';
import ShopHeader from '@/components/shop/ShopHeader';
import ShopFooter from '@/components/shop/ShopFooter';
import ShopProductCard from '@/components/shop/ShopProductCard';
import { products } from '@/data/products';
import { ChevronRight, Sparkles, Gift, Percent, Tag } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.webp';

const categories = [
  { name: 'All', icon: Sparkles },
  { name: 'Women', icon: Tag },
  { name: 'Men', icon: Tag },
  { name: 'Kids', icon: Gift },
  { name: 'Home', icon: Sparkles },
  { name: 'Beauty', icon: Sparkles },
];

const ShopHome = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50">
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

        {/* Category Pills */}
        <section className="bg-white border-b border-border/50 sticky top-14 z-30">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 p-3">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category.name
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-foreground hover:bg-gray-200'
                    }`}
                  >
                    <IconComponent className="h-3.5 w-3.5" />
                    {category.name}
                  </button>
                );
              })}
            </div>
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

        {/* Products Header */}
        <section className="bg-white px-4 py-3 flex items-center justify-between border-b border-border/50">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Products For You</h2>
            <p className="text-xs text-muted-foreground">{filteredProducts.length} items</p>
          </div>
          <button className="text-xs font-medium text-primary flex items-center gap-0.5">
            View All
            <ChevronRight className="h-3 w-3" />
          </button>
        </section>

        {/* Products Grid - Meesho 2-column Style */}
        <section className="bg-white">
          <div className="grid grid-cols-2">
            {filteredProducts.map((product, index) => (
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

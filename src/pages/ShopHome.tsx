import { useState } from 'react';
import ShopHeader from '@/components/shop/ShopHeader';
import ShopFooter from '@/components/shop/ShopFooter';
import ShopProductCard from '@/components/shop/ShopProductCard';
import { products } from '@/data/products';
import { ChevronRight, Sparkles, Gift, Percent, Tag } from 'lucide-react';

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
        {/* Hero Banner - Meesho Style */}
        <section className="relative overflow-hidden">
          <div className="gradient-hero p-6 text-center relative">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-6 w-3 h-3 bg-yellow-300 rounded-full animate-pulse" />
              <div className="absolute top-10 right-10 w-2 h-2 bg-white rounded-full animate-pulse" />
              <div className="absolute bottom-6 left-16 w-2 h-2 bg-yellow-200 rounded-full animate-pulse" />
              <div className="absolute bottom-10 right-6 w-3 h-3 bg-white/50 rounded-full animate-pulse" />
            </div>
            
            {/* Sale Content */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium mb-3">
                <Percent className="h-3 w-3" />
                MEGA SALE LIVE
              </div>
              
              <h1 className="text-2xl font-bold text-white mb-1">
                Lowest Prices
              </h1>
              <p className="text-3xl font-extrabold text-yellow-300 mb-3">
                Up to 80% OFF
              </p>
              <p className="text-white/90 text-sm mb-4">
                On Lakhs of Products
              </p>
              <button className="inline-flex items-center gap-1 bg-white text-primary px-5 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow">
                Shop Now
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
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

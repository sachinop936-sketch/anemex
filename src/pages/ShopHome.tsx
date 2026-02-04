import ShopHeader from '@/components/shop/ShopHeader';
import ShopFooter from '@/components/shop/ShopFooter';
import ShopProductCard from '@/components/shop/ShopProductCard';
import { products } from '@/data/products';
import { Sparkles, Truck, Shield, RotateCcw } from 'lucide-react';

const features = [
  { icon: Truck, label: 'Free Delivery' },
  { icon: Shield, label: 'Secure Pay' },
  { icon: RotateCcw, label: 'Easy Returns' },
  { icon: Sparkles, label: 'Best Deals' },
];

const ShopHome = () => {
  return (
    <div className="min-h-screen bg-background">
      <ShopHeader />

      <main className="pb-8">
        {/* Hero Banner */}
        <section className="py-6">
          <div className="container">
            <div className="rounded-2xl gradient-primary p-6 text-center">
              <h1 className="text-2xl font-bold text-primary-foreground mb-2">
                Fashion Sale Up to 70% Off
              </h1>
              <p className="text-sm text-primary-foreground/90 mb-4">
                Shop the latest trends at unbeatable prices
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                  Use Code: STYLE50
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Badges */}
        <section className="py-4">
          <div className="container">
            <div className="grid grid-cols-4 gap-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-2 rounded-xl bg-card card-shadow"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                    <feature.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-[10px] font-medium text-foreground">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Pills */}
        <section className="py-4 overflow-x-auto">
          <div className="container">
            <div className="flex gap-2 pb-2">
              {['All', 'Ethnic Wear', 'Western', 'Footwear', 'Bags', 'Electronics', 'Beauty'].map(
                (category, index) => (
                  <button
                    key={index}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      index === 0
                        ? 'gradient-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {category}
                  </button>
                )
              )}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-4">
          <div className="container">
            <h2 className="text-lg font-bold text-foreground mb-4">
              Trending Products
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {products.map((product, index) => (
                <ShopProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <ShopFooter />
    </div>
  );
};

export default ShopHome;

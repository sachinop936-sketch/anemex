import { Search, ShoppingCart, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import catCategories from '@/assets/cat-categories.png';
import catOfferZone from '@/assets/cat-offerzone.png';
import catMobiles from '@/assets/cat-mobiles.png';
import catFashion from '@/assets/cat-fashion.png';
import catElectronics from '@/assets/cat-electronics.png';

const categories = [
  { name: 'Categories', image: catCategories },
  { name: 'Offer Zone', image: catOfferZone, badge: 'NEW' },
  { name: 'Mobiles', image: catMobiles },
  { name: 'Fashion', image: catFashion },
  { name: 'Electronics', image: catElectronics },
];

const ShopHeader = () => {
  const navigate = useNavigate();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#2874f0] shadow-sm">
        {/* Main Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-blue-500 transition-colors">
              <Menu className="h-5 w-5 text-white" />
            </button>
            <div className="cursor-pointer flex flex-col items-start" onClick={() => navigate('/')}>
              <span className="text-2xl font-bold text-white italic tracking-tight">Flipkart</span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-white/90 italic">Explore</span>
                <span className="text-[10px] text-yellow-400 font-semibold">Plus</span>
                <span className="text-yellow-400 text-[8px]">+</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-blue-500 transition-colors">
              <Search className="h-5 w-5 text-white" />
            </button>
            <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-blue-500 transition-colors relative">
              <ShoppingCart className="h-5 w-5 text-white" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-orange-500 text-[10px] font-bold text-white flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Category Bar - scrolls with page */}
      <div className="bg-white px-2 py-2 overflow-x-auto border-b border-border/30">
        <div className="flex items-start justify-around gap-2">
          {categories.map((cat) => (
            <div key={cat.name} className="flex flex-col items-center gap-1 min-w-[60px]">
              <div className="relative">
                <img src={cat.image} alt={cat.name} className="h-12 w-12 object-contain" />
                {cat.badge && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] font-bold px-1 rounded">
                    {cat.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-foreground font-medium text-center leading-tight">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopHeader;

import { Search, ShoppingCart, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

const ShopHeader = () => {
  const navigate = useNavigate();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <header className="sticky top-0 z-50 bg-blue-600 shadow-sm">
      {/* Main Header */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-blue-500 transition-colors">
            <Menu className="h-5 w-5 text-white" />
          </button>
          <h1 
            className="text-xl font-bold text-white cursor-pointer"
            onClick={() => navigate('/')}
          >
            Flipkart
          </h1>
        </div>

        {/* Action Icons */}
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
  );
};

export default ShopHeader;

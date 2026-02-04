import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ShopHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border/50 shadow-sm">
      {/* Main Header */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
            <Menu className="h-5 w-5 text-foreground" />
          </button>
          <h1 
            className="text-xl font-bold gradient-text cursor-pointer"
            onClick={() => navigate('/')}
          >
            QuickShop
          </h1>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1">
          <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
            <Search className="h-5 w-5 text-foreground" />
          </button>
          <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors relative">
            <ShoppingCart className="h-5 w-5 text-foreground" />
            <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
              0
            </span>
          </button>
          <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
            <User className="h-5 w-5 text-foreground" />
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
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;

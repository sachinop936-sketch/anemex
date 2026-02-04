import { useState } from 'react';
import { Search, Menu, X, ShoppingBag, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';

const ShopHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/95 backdrop-blur-lg">
      <div className="container flex h-14 items-center justify-between gap-2">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
            <ShoppingBag className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold gradient-text">StyleBazaar</span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden sm:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-primary/50"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="sm:hidden p-2 rounded-full hover:bg-muted transition-colors"
          >
            {isSearchOpen ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Search className="h-5 w-5 text-foreground" />
            )}
          </button>

          {/* Wishlist */}
          <button className="p-2 rounded-full hover:bg-muted transition-colors relative">
            <Heart className="h-5 w-5 text-foreground" />
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground flex items-center justify-center">
              3
            </span>
          </button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-full hover:bg-muted transition-colors">
                <Menu className="h-5 w-5 text-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                  Home
                </Link>
                <Link to="/" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                  Categories
                </Link>
                <Link to="/" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                  Offers
                </Link>
                <Link to="/" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                  My Orders
                </Link>
                <Link to="/" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                  My Account
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="sm:hidden px-4 pb-3 animate-slide-up">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-primary/50"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default ShopHeader;

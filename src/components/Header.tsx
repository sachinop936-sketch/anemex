import { Phone } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-card/80 backdrop-blur-lg">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <Phone className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold gradient-text">QuickCall</span>
        </div>
        
        <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse-soft"></span>
          <span className="text-xs font-medium text-muted-foreground">Live</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

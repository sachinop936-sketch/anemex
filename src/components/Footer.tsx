import { ShieldCheck, CreditCard, User } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card py-6">
      <div className="container">
        <div className="flex flex-wrap justify-center gap-4 text-center">
          <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-foreground">100% Real Service</span>
          </div>
          
          <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2">
            <CreditCard className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-foreground">Secure UPI Payment</span>
          </div>
          
          <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2">
            <User className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-foreground">18+ Only</span>
          </div>
        </div>
        
        <p className="mt-4 text-center text-xs text-muted-foreground">
          © 2025 QuickCall Services. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

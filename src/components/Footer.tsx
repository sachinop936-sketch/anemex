import { ShieldCheck, CreditCard, User, AlertTriangle, Ban, Video, Wallet, Users } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card py-6">
      <div className="container">
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-3 text-center mb-6">
          <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-foreground">100% Verified Services</span>
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

        {/* Disclaimer Section */}
        <div className="rounded-xl bg-muted/50 border border-border/50 p-4 mb-4">
          <h3 className="text-xs font-semibold text-foreground mb-3 text-center">Important Disclaimer</h3>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-2">
              <User className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
              <span className="text-xs text-muted-foreground">18+ Only – Adult users only</span>
            </div>
            <div className="flex items-center gap-2">
              <Ban className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
              <span className="text-xs text-muted-foreground">No illegal services provided</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
              <span className="text-xs text-muted-foreground">No recording allowed during sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <Wallet className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
              <span className="text-xs text-muted-foreground">Payments are final once service starts</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
              <span className="text-xs text-muted-foreground">Platform acts only as a facilitator</span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          © 2025 QuickCall Services. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

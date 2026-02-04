import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShopFooter = () => {
  return (
    <footer className="bg-card border-t border-border/50 py-8 mt-8">
      <div className="container">
        {/* Logo & Description */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
              <ShoppingBag className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold gradient-text">StyleBazaar</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Your favorite destination for trendy fashion and lifestyle products at unbeatable prices.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                FAQs
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Policies</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Return Policy
              </Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>

        {/* Contact Info */}
        <div className="rounded-xl bg-muted/50 p-4 mb-6">
          <h4 className="font-semibold text-foreground mb-3 text-center">Get In Touch</h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 justify-center">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">support@stylebazaar.com</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Mumbai, India</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-border/50 pt-4">
          <p className="text-xs text-muted-foreground">
            © 2025 StyleBazaar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ShopFooter;

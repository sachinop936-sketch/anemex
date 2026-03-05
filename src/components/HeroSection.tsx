import { Button } from "@/components/ui/button";
import { ShieldCheck, BadgeCheck } from "lucide-react";

const HeroSection = () => {
  const scrollToListings = () => {
    document.getElementById("host-listings")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-8">
      <div className="container">
        {/* Badge */}
        <div className="mb-4 flex items-center justify-center gap-2 rounded-full bg-card/80 p-2 backdrop-blur-sm card-shadow max-w-fit mx-auto">
          <BadgeCheck className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium text-foreground">Verified & Real Services</span>
        </div>

        {/* Heading */}
        <h1 className="text-center text-2xl font-bold text-foreground mb-2">
          Book Online Sessions <span className="gradient-text">Instantly</span>
        </h1>

        {/* Subtext */}
        <p className="text-center text-sm text-muted-foreground mb-6">
          Choose a host • Pay exact amount • Start on Telegram
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button variant="gradient" size="lg" onClick={scrollToListings}>
            Browse Hosts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

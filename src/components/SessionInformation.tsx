import { Clock, MessageCircle, Shield, Zap } from 'lucide-react';

const infoItems = [
  {
    icon: Zap,
    title: 'Quick Start',
    description: 'Session starts shortly after payment confirmation'
  },
  {
    icon: Clock,
    title: 'Flexible Duration',
    description: 'Duration as per your selected service plan'
  },
  {
    icon: MessageCircle,
    title: 'Telegram Support',
    description: 'Post-payment assistance available via Telegram'
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: 'Safe and secure UPI payment gateway'
  }
];

const SessionInformation = () => {
  return (
    <section className="py-8">
      <div className="container">
        <h2 className="mb-4 text-center text-xl font-bold text-foreground">
          Session Information
        </h2>
        
        <div className="grid grid-cols-2 gap-3">
          {infoItems.map((item, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-4 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50"
            >
              <div className="mb-2 rounded-full bg-primary/10 p-2">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SessionInformation;

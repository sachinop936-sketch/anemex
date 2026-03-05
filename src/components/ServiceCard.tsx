import { Video, Phone, Clock } from 'lucide-react';
import type { Service } from '@/data/profiles';

interface ServiceCardProps {
  service: Service;
  selected: boolean;
  onSelect: () => void;
}

const ServiceCard = ({ service, selected, onSelect }: ServiceCardProps) => {
  const getIcon = () => {
    switch (service.id) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'voice':
        return <Phone className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <button
      onClick={onSelect}
      className={`w-full rounded-xl p-4 text-left transition-all duration-300 ${
        selected
          ? 'gradient-primary text-primary-foreground card-shadow-hover scale-[1.02]'
          : 'bg-card border-2 border-border hover:border-primary card-shadow'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            selected ? 'bg-primary-foreground/20' : 'bg-muted'
          }`}>
            {getIcon()}
          </div>
          <div>
            <h3 className="font-semibold">{service.name}</h3>
            <p className={`text-xs ${selected ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
              {service.duration}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xl font-bold">₹{service.price}</span>
        </div>
      </div>
    </button>
  );
};

export default ServiceCard;

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import type { Profile } from '@/data/profiles';

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/profile/${profile.id}`);
  };

  return (
    <div className="group overflow-hidden rounded-2xl bg-card card-shadow transition-all duration-300 hover:card-shadow-hover">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={profile.image}
          alt={profile.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        
        <Badge className="absolute left-2 top-2 gradient-primary border-0 text-primary-foreground">
          {profile.tagline}
        </Badge>
        
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-lg font-bold text-primary-foreground">{profile.name}</h3>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < profile.rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-muted text-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-3">
        <Button 
          variant="book" 
          size="sm" 
          className="w-full"
          onClick={handleBookNow}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;

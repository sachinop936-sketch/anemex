import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle, MessageCircle } from "lucide-react";
import type { Profile } from "@/data/profiles";

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

        {/* Verified Badge */}
        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-green-500/90 px-2 py-1">
          <CheckCircle className="h-3 w-3 text-white" />
          <span className="text-[10px] font-medium text-white">Verified</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-lg font-bold text-primary-foreground">{profile.name}</h3>
          <div className="flex items-center gap-1 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < profile.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          {/* Telegram response text */}
          <div className="flex items-center gap-1">
            <MessageCircle className="h-2.5 w-2.5 text-primary-foreground/80" />
            <span className="text-[10px] text-primary-foreground/80">Fast response on Telegram</span>
          </div>
        </div>
      </div>

      <div className="p-3 space-y-2">
        {/* Age and Description */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-foreground">Age: {profile.age}</p>
          <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3">
            {profile.description}
          </p>
        </div>
        
        <Button variant="book" size="sm" className="w-full" onClick={handleBookNow}>
          View Services & Pay
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;

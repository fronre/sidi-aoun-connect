import { Service } from '@/types/service';
import { Star, MapPin, Phone, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className="group gradient-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-elevated cursor-pointer animate-fade-in"
      onClick={() => navigate(`/service/${service.id}`)}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={service.images[0]}
          alt={service.businessName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full glass-effect text-xs font-medium">
          {service.category}
        </div>

        {/* Verified Badge */}
        {service.isVerified && (
          <div className="absolute top-3 left-3 p-1.5 rounded-full gradient-primary shadow-glow">
            <BadgeCheck className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-foreground text-lg line-clamp-1">
            {service.businessName}
          </h3>
          <p className="text-sm text-muted-foreground">{service.name}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-star-filled/20">
            <Star className="w-4 h-4 fill-star-filled text-star-filled" />
            <span className="text-sm font-bold text-star-filled">{service.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({service.reviewCount} تقييم)
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="text-xs line-clamp-1">{service.address}</span>
        </div>

        {/* Action */}
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `tel:${service.phone}`;
          }}
        >
          <Phone className="w-4 h-4 ml-2" />
          اتصل الآن
        </Button>
      </div>
    </div>
  );
};

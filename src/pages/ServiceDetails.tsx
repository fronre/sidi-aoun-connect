import { useParams, useNavigate } from 'react-router-dom';
import { services, reviews as allReviews } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/services/StarRating';
import { ReviewCard } from '@/components/services/ReviewCard';
import { 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Share2, 
  Heart,
  BadgeCheck,
  Clock,
  MessageCircle,
  Navigation
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const service = services.find(s => s.id === id);
  const serviceReviews = allReviews.filter(r => r.serviceId === id);

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">الخدمة غير موجودة</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            العودة للرئيسية
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Image */}
      <div className="relative h-72">
        <img
          src={service.images[activeImageIndex]}
          alt={service.businessName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Navigation */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Button 
            variant="glass" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="glass" 
              size="icon"
              className="rounded-full"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={cn(
                'h-5 w-5 transition-colors',
                isFavorite && 'fill-destructive text-destructive'
              )} />
            </Button>
            <Button variant="glass" size="icon" className="rounded-full">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Verified Badge */}
        {service.isVerified && (
          <div className="absolute bottom-20 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full gradient-primary shadow-glow">
            <BadgeCheck className="w-4 h-4 text-primary-foreground" />
            <span className="text-xs font-medium text-primary-foreground">موثق</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 -mt-16 relative z-10 space-y-6">
        {/* Main Info Card */}
        <div className="gradient-card rounded-3xl p-6 border border-border/50 space-y-4 shadow-elevated">
          <div>
            <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary font-medium">
              {service.category}
            </span>
            <h1 className="text-2xl font-bold text-foreground mt-3">
              {service.businessName}
            </h1>
            <p className="text-muted-foreground">{service.name}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-star-filled/20">
              <StarRating rating={service.rating} size="md" />
              <span className="text-lg font-bold text-star-filled">{service.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({service.reviewCount} تقييم)
            </span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed">
            {service.description}
          </p>

          {/* Contact Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button 
              variant="default" 
              className="h-14"
              onClick={() => window.location.href = `tel:${service.phone}`}
            >
              <Phone className="w-5 h-5 ml-2" />
              اتصل الآن
            </Button>
            <Button variant="outline" className="h-14">
              <MessageCircle className="w-5 h-5 ml-2" />
              راسلنا
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="gradient-card rounded-2xl p-5 border border-border/50 space-y-4">
          <h3 className="font-bold text-foreground">معلومات التواصل</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">رقم الهاتف</p>
                <p className="font-medium text-foreground" dir="ltr">{service.phone}</p>
              </div>
            </div>

            {service.email && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">البريد الإلكتروني</p>
                  <p className="font-medium text-foreground">{service.email}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">العنوان</p>
                <p className="font-medium text-foreground">{service.address}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-primary">
                <Navigation className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-foreground">التقييمات والمراجعات</h3>
            <Button variant="ghost" size="sm" className="text-primary">
              أضف تقييم
            </Button>
          </div>

          {serviceReviews.length > 0 ? (
            <div className="space-y-3">
              {serviceReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 rounded-2xl bg-card border border-border/50">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">لا توجد تقييمات بعد</p>
              <p className="text-sm text-muted-foreground mt-1">كن أول من يقيم هذه الخدمة</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;

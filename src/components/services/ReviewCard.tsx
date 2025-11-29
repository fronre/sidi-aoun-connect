import { Review } from '@/types/service';
import { StarRating } from './StarRating';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2);
  };

  return (
    <div className="p-4 rounded-xl bg-card border border-border/50 space-y-3 animate-fade-in">
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10 border-2 border-primary/30">
          <AvatarImage src={review.userAvatar} />
          <AvatarFallback className="bg-secondary text-secondary-foreground text-sm font-bold">
            {getInitials(review.userName)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">{review.userName}</h4>
            <span className="text-xs text-muted-foreground">{review.createdAt}</span>
          </div>
          <StarRating rating={review.rating} size="sm" />
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground leading-relaxed">
        {review.comment}
      </p>
    </div>
  );
};

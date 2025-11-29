import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export const StarRating = ({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
}: StarRatingProps) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };

  return (
    <div className="flex items-center gap-0.5" dir="ltr">
      {Array.from({ length: maxRating }).map((_, index) => {
        const isFilled = index < Math.floor(rating);
        const isHalf = index === Math.floor(rating) && rating % 1 !== 0;
        
        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRatingChange?.(index + 1)}
            className={cn(
              'transition-transform',
              interactive && 'hover:scale-125 cursor-pointer'
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                'transition-colors',
                isFilled || isHalf
                  ? 'fill-star-filled text-star-filled'
                  : 'fill-star-empty text-star-empty'
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

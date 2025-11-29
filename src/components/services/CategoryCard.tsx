import { Category } from '@/types/service';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: Category;
  isSelected?: boolean;
  onClick?: () => void;
}

export const CategoryCard = ({ category, isSelected, onClick }: CategoryCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 min-w-[80px]',
        isSelected
          ? 'gradient-primary shadow-glow scale-105'
          : 'bg-card hover:bg-secondary border border-border/50 hover:border-primary/50'
      )}
    >
      <span className="text-3xl">{category.icon}</span>
      <span className={cn(
        'text-xs font-medium',
        isSelected ? 'text-primary-foreground' : 'text-foreground'
      )}>
        {category.name}
      </span>
      <span className={cn(
        'text-[10px] px-2 py-0.5 rounded-full',
        isSelected 
          ? 'bg-primary-foreground/20 text-primary-foreground' 
          : 'bg-muted text-muted-foreground'
      )}>
        {category.count}
      </span>
    </button>
  );
};

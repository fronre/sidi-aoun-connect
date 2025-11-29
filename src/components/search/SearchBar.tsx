import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFilterClick?: () => void;
}

export const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = 'ابحث عن حرفي أو خدمة...',
  onFilterClick 
}: SearchBarProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pr-12 bg-card border-border/50 focus:border-primary"
        />
      </div>
      
      {onFilterClick && (
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onFilterClick}
          className="h-12 w-12 shrink-0"
        >
          <SlidersHorizontal className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

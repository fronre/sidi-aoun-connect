import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

export const Header = ({ title = 'سيدي عون', showBack = false }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 glass-effect border-b border-border/50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <span className="text-xl">🏛️</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">{title}</h1>
            <p className="text-xs text-muted-foreground">دليل الحرفيين والخدمات</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent animate-pulse" />
          </Button>
        </div>
      </div>
    </header>
  );
};

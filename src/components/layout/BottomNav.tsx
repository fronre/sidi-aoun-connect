import { Home, Search, MapPin, User, MessageCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const navItems = [
    { icon: Home, label: 'الرئيسية', path: '/' },
    { icon: Search, label: 'البحث', path: '/search' },
    { icon: MessageCircle, label: 'الرسائل', path: '/messages' },
    { icon: MapPin, label: 'الخريطة', path: '/map' },
    { icon: User, label: 'حسابي', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-border/50 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Button
              key={item.path}
              variant={isActive ? 'navActive' : 'nav'}
              size="sm"
              onClick={() => navigate(item.path)}
              className={cn(
                'flex flex-col items-center gap-1 h-auto py-2 px-4 min-w-[60px]',
                isActive && 'shadow-glow'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive && 'text-primary-foreground')} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export { BottomNav };

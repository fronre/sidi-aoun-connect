import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Settings, 
  Heart, 
  Star, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronLeft,
  Store,
  MessageCircle,
  Shield,
  LayoutDashboard
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile, isAdmin, signOut, loading } = useAuth();

  const menuItems = [
    { icon: User, label: 'معلوماتي الشخصية', path: '/profile/edit' },
    { icon: Heart, label: 'المفضلة', path: '/favorites' },
    { icon: Star, label: 'تقييماتي', path: '/my-reviews' },
    { icon: MessageCircle, label: 'الرسائل', path: '/messages' },
    { icon: Bell, label: 'الإشعارات', path: '/notifications' },
    ...(profile?.account_type === 'provider' ? [
      { icon: LayoutDashboard, label: 'لوحة التحكم', path: '/dashboard', highlight: true },
      { icon: Store, label: 'إضافة خدمة', path: '/add-service' },
    ] : []),
    ...(isAdmin ? [
      { icon: Shield, label: 'لوحة الإدارة', path: '/admin', highlight: true },
    ] : []),
    { icon: Settings, label: 'الإعدادات', path: '/settings' },
    { icon: HelpCircle, label: 'المساعدة والدعم', path: '/help' },
  ];

  if (loading) {
    return (
      <AppLayout title="حسابي">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="حسابي">
      <div className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="gradient-card rounded-3xl p-6 border border-border/50 space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 border-4 border-primary/30 shadow-glow">
              <AvatarImage src={profile?.avatar_url || ''} />
              <AvatarFallback className="bg-secondary text-2xl font-bold text-secondary-foreground">
                {profile?.full_name?.[0] || user?.email?.[0] || 'م'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">
                {profile?.full_name || 'مستخدم جديد'}
              </h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {profile?.account_type === 'provider' && (
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                    حرفي
                  </span>
                )}
                {profile?.account_type === 'user' && (
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                    مستخدم
                  </span>
                )}
                {isAdmin && (
                  <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">
                    مسؤول
                  </span>
                )}
              </div>
            </div>
          </div>

          {!user && (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/auth')}
            >
              تسجيل الدخول / إنشاء حساب
            </Button>
          )}
        </div>

        {/* Quick Stats */}
        {user && (
          <div className="grid grid-cols-3 gap-3">
            <div className="gradient-card rounded-2xl p-4 text-center border border-border/50">
              <p className="text-2xl font-bold text-primary">0</p>
              <p className="text-xs text-muted-foreground mt-1">تقييماتي</p>
            </div>
            <div className="gradient-card rounded-2xl p-4 text-center border border-border/50">
              <p className="text-2xl font-bold text-accent">0</p>
              <p className="text-xs text-muted-foreground mt-1">المفضلة</p>
            </div>
            <div className="gradient-card rounded-2xl p-4 text-center border border-border/50">
              <p className="text-2xl font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground mt-1">
                {profile?.account_type === 'provider' ? 'خدماتي' : 'محادثات'}
              </p>
            </div>
          </div>
        )}

        {/* Menu Items */}
        {user && (
          <div className="gradient-card rounded-2xl border border-border/50 overflow-hidden">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors ${
                    index !== menuItems.length - 1 ? 'border-b border-border/30' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.highlight 
                      ? 'gradient-primary shadow-glow' 
                      : 'bg-secondary'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      item.highlight ? 'text-primary-foreground' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <span className={`flex-1 text-right font-medium ${
                    item.highlight ? 'text-primary' : 'text-foreground'
                  }`}>
                    {item.label}
                  </span>
                  <ChevronLeft className="w-5 h-5 text-muted-foreground" />
                </button>
              );
            })}
          </div>
        )}

        {/* Logout */}
        {user && (
          <Button 
            variant="outline" 
            className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
            onClick={signOut}
          >
            <LogOut className="w-5 h-5 ml-2" />
            تسجيل الخروج
          </Button>
        )}

        {/* App Info */}
        <div className="text-center text-xs text-muted-foreground space-y-1">
          <p>دليل الحرفيين والخدمات - بلدية سيدي عون</p>
          <p>الإصدار 1.0.0</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;

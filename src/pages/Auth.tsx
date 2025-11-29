import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

type AuthMode = 'login' | 'register';

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative h-48 gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full gradient-primary blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-accent blur-3xl" />
        </div>
        
        <div className="relative z-10 p-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="text-foreground"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="absolute bottom-6 right-6 left-6 text-right">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-glow mb-4">
            <span className="text-3xl">🏛️</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {mode === 'login' ? 'مرحباً بعودتك' : 'إنشاء حساب جديد'}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {mode === 'login' 
              ? 'سجل دخولك للوصول لحسابك' 
              : 'انضم إلينا واستفد من جميع الخدمات'}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 py-6 -mt-4">
        <div className="gradient-card rounded-3xl p-6 border border-border/50 shadow-elevated">
          {/* Toggle */}
          <div className="flex gap-2 p-1 rounded-xl bg-secondary mb-6">
            <button
              onClick={() => setMode('login')}
              className={cn(
                'flex-1 py-2.5 rounded-lg text-sm font-medium transition-all',
                mode === 'login' 
                  ? 'gradient-primary text-primary-foreground shadow-glow' 
                  : 'text-muted-foreground'
              )}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => setMode('register')}
              className={cn(
                'flex-1 py-2.5 rounded-lg text-sm font-medium transition-all',
                mode === 'register' 
                  ? 'gradient-primary text-primary-foreground shadow-glow' 
                  : 'text-muted-foreground'
              )}
            >
              حساب جديد
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="name" className="text-foreground">الاسم الكامل</Label>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="أدخل اسمك الكامل"
                    className="pr-12"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className="pr-12"
                  dir="ltr"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {mode === 'register' && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="phone" className="text-foreground">رقم الهاتف</Label>
                <div className="relative">
                  <Phone className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="05XXXXXXXX"
                    className="pr-12"
                    dir="ltr"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pr-12 pl-12"
                  dir="ltr"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="confirmPassword" className="text-foreground">تأكيد كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pr-12"
                    dir="ltr"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="text-left">
                <button type="button" className="text-sm text-primary hover:underline">
                  نسيت كلمة المرور؟
                </button>
              </div>
            )}

            <Button type="submit" variant="hero" className="w-full mt-6">
              {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب'}
            </Button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-4 text-muted-foreground">أو تابع بواسطة</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <Button variant="outline" className="h-12">
                <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button variant="outline" className="h-12">
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-muted-foreground mt-6 px-4">
          بتسجيلك، أنت توافق على{' '}
          <button className="text-primary hover:underline">شروط الاستخدام</button>
          {' '}و{' '}
          <button className="text-primary hover:underline">سياسة الخصوصية</button>
        </p>
      </div>
    </div>
  );
};

export default Auth;

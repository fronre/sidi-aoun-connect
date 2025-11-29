import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Mail, Lock, User, Phone, Eye, EyeOff, Wrench, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

type AuthMode = 'login' | 'register';
type AccountType = 'user' | 'provider';

const Auth = () => {
  const navigate = useNavigate();
  const { user, signUp, signIn, loading } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [accountType, setAccountType] = useState<AccountType>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        setIsSubmitting(false);
        return;
      }
      const { error } = await signUp(formData.email, formData.password, formData.fullName, accountType);
      if (!error) {
        navigate('/');
      }
    } else {
      const { error } = await signIn(formData.email, formData.password);
      if (!error) {
        navigate('/');
      }
    }

    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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

          {/* Account Type Selection (for registration) */}
          {mode === 'register' && (
            <div className="mb-6 animate-fade-in">
              <Label className="text-foreground mb-3 block">نوع الحساب</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAccountType('user')}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2',
                    accountType === 'user'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <div className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center',
                    accountType === 'user' ? 'gradient-primary shadow-glow' : 'bg-secondary'
                  )}>
                    <UserCircle className={cn(
                      'w-6 h-6',
                      accountType === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
                    )} />
                  </div>
                  <span className="font-medium text-sm">مستخدم عادي</span>
                  <span className="text-xs text-muted-foreground">أبحث عن خدمات</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setAccountType('provider')}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2',
                    accountType === 'provider'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <div className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center',
                    accountType === 'provider' ? 'gradient-primary shadow-glow' : 'bg-secondary'
                  )}>
                    <Wrench className={cn(
                      'w-6 h-6',
                      accountType === 'provider' ? 'text-primary-foreground' : 'text-muted-foreground'
                    )} />
                  </div>
                  <span className="font-medium text-sm">حرفي / مقدم خدمة</span>
                  <span className="text-xs text-muted-foreground">أقدم خدماتي</span>
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="fullName" className="text-foreground">الاسم الكامل</Label>
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="أدخل اسمك الكامل"
                    className="pr-12"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

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
                  required
                  minLength={6}
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
                    required
                    minLength={6}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              variant="hero" 
              className="w-full mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                mode === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب'
              )}
            </Button>
          </form>
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

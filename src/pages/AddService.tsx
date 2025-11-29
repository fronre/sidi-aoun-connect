import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Store, Phone, Mail, MapPin, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCategories } from '@/hooks/useCategories';
import { useCreateService } from '@/hooks/useServices';
import { useToast } from '@/hooks/use-toast';

const AddService = () => {
  const navigate = useNavigate();
  const { profile, user } = useAuth();
  const { data: categories } = useCategories();
  const createService = useCreateService();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    business_name: '',
    category_id: '',
    description: '',
    phone: '',
    email: '',
    address: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">سجل دخولك</h3>
          <p className="text-muted-foreground text-sm mb-4">
            يجب عليك تسجيل الدخول لإضافة خدمة
          </p>
          <Button onClick={() => navigate('/auth')}>
            تسجيل الدخول
          </Button>
        </div>
      </div>
    );
  }

  if (profile?.account_type !== 'provider') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">غير مصرح</h3>
          <p className="text-muted-foreground text-sm mb-4">
            إضافة الخدمات متاحة للحرفيين فقط
          </p>
          <Button onClick={() => navigate('/')}>
            العودة للرئيسية
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createService.mutateAsync({
        ...formData,
        provider_id: profile.id,
        category_id: formData.category_id || null,
        images: [],
        latitude: null,
        longitude: null,
      });

      toast({
        title: 'تمت الإضافة بنجاح',
        description: 'خدمتك قيد المراجعة وستظهر بعد الموافقة عليها',
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء إضافة الخدمة',
        variant: 'destructive',
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-effect border-b border-border/50">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowRight className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold text-foreground">إضافة خدمة جديدة</h1>
        </div>
      </header>

      {/* Form */}
      <div className="px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Name */}
          <div className="space-y-2">
            <Label htmlFor="business_name" className="text-foreground">اسم النشاط / المحل</Label>
            <div className="relative">
              <Store className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="business_name"
                placeholder="مثال: ورشة الأمانة للكهرباء"
                className="pr-12"
                required
                value={formData.business_name}
                onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-foreground">التصنيف</Label>
            <Select
              value={formData.category_id}
              onValueChange={(value) => setFormData({ ...formData, category_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر التصنيف" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">وصف الخدمة</Label>
            <div className="relative">
              <FileText className="absolute right-4 top-3 h-5 w-5 text-muted-foreground" />
              <Textarea
                id="description"
                placeholder="اكتب وصفاً مفصلاً لخدماتك..."
                className="pr-12 min-h-[100px]"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground">رقم الهاتف</Label>
            <div className="relative">
              <Phone className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="05XXXXXXXX"
                className="pr-12"
                dir="ltr"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">البريد الإلكتروني (اختياري)</Label>
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

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-foreground">العنوان</Label>
            <div className="relative">
              <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="address"
                placeholder="مثال: شارع الاستقلال، سيدي عون"
                className="pr-12"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>

          {/* Info Note */}
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-sm text-foreground">
              ⓘ سيتم مراجعة خدمتك من قبل الإدارة قبل ظهورها للمستخدمين
            </p>
          </div>

          {/* Submit */}
          <Button 
            type="submit" 
            variant="hero" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              'إضافة الخدمة'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddService;

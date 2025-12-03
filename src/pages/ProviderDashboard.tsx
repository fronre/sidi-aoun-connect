import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useMyServices, useDeleteService } from '@/hooks/useServices';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Star, 
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  MessageCircle,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const { profile, user } = useAuth();
  const { data: services, isLoading } = useMyServices(profile?.id);
  const deleteService = useDeleteService();
  const { toast } = useToast();

  if (!user || profile?.account_type !== 'provider') {
    return (
      <AppLayout title="لوحة التحكم">
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">غير مصرح</h3>
          <p className="text-muted-foreground text-sm text-center mb-4">
            هذه الصفحة متاحة للحرفيين فقط
          </p>
          <Button onClick={() => navigate('/auth')}>
            تسجيل الدخول كحرفي
          </Button>
        </div>
      </AppLayout>
    );
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteService.mutateAsync(id);
      toast({
        title: 'تم الحذف',
        description: 'تم حذف الخدمة بنجاح',
      });
    } catch (error) {
      toast({
        title: 'خطأ',
        description: 'حدث خطأ أثناء حذف الخدمة',
        variant: 'destructive',
      });
    }
  };

  const totalServices = services?.length || 0;
  const approvedServices = services?.filter(s => s.is_approved).length || 0;
  const pendingServices = services?.filter(s => !s.is_approved).length || 0;

  // احسب متوسط التقييم وعدد المراجعات لجميع الخدمات (إن وُجدت بيانات مراجعات)
  const allReviews = (services || [])
    .flatMap((s: any) => s.reviews || []);

  const totalReviews = allReviews.length;
  const averageRating = totalReviews
    ? allReviews.reduce((sum: number, r: any) => sum + (r.rating || 0), 0) / totalReviews
    : 0;

  const stats = [
    { label: 'إجمالي الخدمات', value: totalServices, icon: BarChart3, color: 'text-primary' },
    { label: 'الخدمات المعتمدة', value: approvedServices, icon: CheckCircle, color: 'text-emerald-500' },
    { label: 'قيد المراجعة', value: pendingServices, icon: Clock, color: 'text-amber-500' },
  ];

  return (
    <AppLayout title="لوحة التحكم">
      <div className="px-4 py-4 space-y-6">
        {/* Welcome Section */}
        <div className="gradient-card rounded-2xl p-6 border border-border/50 flex flex-col gap-3">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">
              مرحباً {profile?.full_name || 'حرفي'}
            </h2>
            <p className="text-muted-foreground text-sm">
              من هنا تدير كل خدماتك، تتابع الموافقات، وتستقبل رسائل الزبائن.
            </p>
          </div>

          {totalServices > 0 && (
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>
                  متوسط التقييم العام:
                  <span className="font-semibold text-foreground ml-1">
                    {averageRating ? averageRating.toFixed(1) : '—'}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4 text-primary" />
                <span>{totalReviews} مراجعة على خدماتك</span>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="gradient-card rounded-xl p-4 border border-border/50 text-center">
                <Icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Add Service Button */}
        <Button 
          onClick={() => navigate('/add-service')} 
          className="w-full h-14"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة خدمة جديدة
        </Button>

        {/* Services List */}
        <div className="space-y-4">
          <h3 className="font-bold text-foreground">خدماتي</h3>
          
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-32 rounded-xl bg-card animate-pulse" />
              ))}
            </div>
          ) : services && services.length > 0 ? (
            services.map((service) => (
              <div 
                key={service.id} 
                className="gradient-card rounded-xl p-4 border border-border/50 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{service.business_name}</h4>
                    <p className="text-sm text-muted-foreground">{service.categories?.name}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    service.is_approved 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {service.is_approved ? 'معتمد' : 'قيد المراجعة'}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{service.address}</span>
                  </div>

                  {typeof (service as any).averageRating === 'number' && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>
                        {(service as any).averageRating.toFixed(1)}
                        <span className="text-[11px] ml-1">({(service as any).reviewCount || 0} تقييم)</span>
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate(`/service/${service.id}`)}
                  >
                    <Eye className="w-4 h-4 ml-1" />
                    عرض
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate(`/edit-service/${service.id}`)}
                  >
                    <Edit2 className="w-4 h-4 ml-1" />
                    تعديل
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-destructive border-destructive/50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>حذف الخدمة</AlertDialogTitle>
                        <AlertDialogDescription>
                          هل أنت متأكد من حذف هذه الخدمة؟ لا يمكن التراجع عن هذا الإجراء.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDelete(service.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          حذف
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 rounded-xl bg-card border border-border/50">
              <p className="text-muted-foreground">لم تضف أي خدمات بعد</p>
              <Button 
                variant="link" 
                className="mt-2"
                onClick={() => navigate('/add-service')}
              >
                أضف خدمتك الأولى
              </Button>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-14"
            onClick={() => navigate('/messages')}
          >
            <MessageCircle className="w-5 h-5 ml-2" />
            الرسائل
          </Button>
          <Button 
            variant="outline" 
            className="h-14"
            onClick={() => navigate('/profile')}
          >
            <Edit2 className="w-5 h-5 ml-2" />
            تعديل الملف
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProviderDashboard;

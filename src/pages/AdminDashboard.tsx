import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Users, 
  Store, 
  MessageSquare,
  CheckCircle,
  XCircle,
  Eye,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all services (including unapproved)
  const { data: allServices } = useQuery({
    queryKey: ['admin-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          categories (name, icon),
          profiles (full_name, phone)
        `)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  // Fetch all profiles
  const { data: allProfiles } = useQuery({
    queryKey: ['admin-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  // Approve/Reject service mutation
  const updateServiceStatus = useMutation({
    mutationFn: async ({ id, is_approved }: { id: string; is_approved: boolean }) => {
      const { error } = await supabase
        .from('services')
        .update({ is_approved })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      toast({
        title: 'تم التحديث',
        description: 'تم تحديث حالة الخدمة بنجاح',
      });
    },
  });

  if (!user || !isAdmin) {
    return (
      <AppLayout title="لوحة الإدارة">
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <Shield className="w-16 h-16 text-destructive mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">غير مصرح</h3>
          <p className="text-muted-foreground text-sm text-center mb-4">
            هذه الصفحة متاحة للمسؤولين فقط
          </p>
          <Button onClick={() => navigate('/')}>
            العودة للرئيسية
          </Button>
        </div>
      </AppLayout>
    );
  }

  const pendingServices = allServices?.filter(s => !s.is_approved) || [];
  const approvedServices = allServices?.filter(s => s.is_approved) || [];
  const providers = allProfiles?.filter(p => p.account_type === 'provider') || [];
  const users = allProfiles?.filter(p => p.account_type === 'user') || [];

  const stats = [
    { label: 'الخدمات', value: allServices?.length || 0, icon: Store, color: 'text-primary' },
    { label: 'المستخدمين', value: allProfiles?.length || 0, icon: Users, color: 'text-accent' },
    { label: 'قيد المراجعة', value: pendingServices.length, icon: MessageSquare, color: 'text-yellow-500' },
    { label: 'الحرفيين', value: providers.length, icon: CheckCircle, color: 'text-green-500' },
  ];

  return (
    <AppLayout title="لوحة الإدارة">
      <div className="px-4 py-4 space-y-6">
        {/* Admin Header */}
        <div className="gradient-card rounded-2xl p-6 border border-border/50 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-glow">
            <Shield className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">لوحة الإدارة</h2>
            <p className="text-muted-foreground text-sm">إدارة التطبيق والمستخدمين</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="gradient-card rounded-xl p-4 border border-border/50">
                <div className="flex items-center gap-3">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-secondary">
            <TabsTrigger value="pending" className="text-xs">
              قيد المراجعة ({pendingServices.length})
            </TabsTrigger>
            <TabsTrigger value="services" className="text-xs">
              الخدمات ({approvedServices.length})
            </TabsTrigger>
            <TabsTrigger value="users" className="text-xs">
              المستخدمين ({allProfiles?.length})
            </TabsTrigger>
          </TabsList>

          {/* Pending Services */}
          <TabsContent value="pending" className="mt-4 space-y-3">
            {pendingServices.length > 0 ? (
              pendingServices.map((service: any) => (
                <div key={service.id} className="gradient-card rounded-xl p-4 border border-border/50 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{service.business_name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {service.categories?.icon} {service.categories?.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        بواسطة: {service.profiles?.full_name}
                      </p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
                      قيد المراجعة
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <p className="text-xs text-muted-foreground">{service.address}</p>

                  <div className="flex gap-2 pt-2 border-t border-border/50">
                    <Button
                      size="sm"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => updateServiceStatus.mutate({ id: service.id, is_approved: true })}
                    >
                      <CheckCircle className="w-4 h-4 ml-1" />
                      قبول
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                      onClick={() => updateServiceStatus.mutate({ id: service.id, is_approved: false })}
                    >
                      <XCircle className="w-4 h-4 ml-1" />
                      رفض
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/service/${service.id}`)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                لا توجد خدمات قيد المراجعة
              </div>
            )}
          </TabsContent>

          {/* Approved Services */}
          <TabsContent value="services" className="mt-4 space-y-3">
            {approvedServices.map((service: any) => (
              <div key={service.id} className="gradient-card rounded-xl p-4 border border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{service.business_name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {service.categories?.icon} {service.categories?.name}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/service/${service.id}`)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Users */}
          <TabsContent value="users" className="mt-4 space-y-3">
            {allProfiles?.map((profile: any) => (
              <div key={profile.id} className="gradient-card rounded-xl p-4 border border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{profile.full_name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {profile.account_type === 'provider' ? 'حرفي' : 'مستخدم'}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    profile.account_type === 'provider'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-secondary text-secondary-foreground'
                  }`}>
                    {profile.account_type === 'provider' ? 'حرفي' : 'مستخدم'}
                  </span>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;

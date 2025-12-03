import { AppLayout } from '@/components/layout/AppLayout';
import { Bell, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const mockNotifications = [
  {
    id: 1,
    type: 'info' as const,
    title: 'مرحباً بك في دليل سيدي عون',
    message: 'تم إنشاء حسابك بنجاح، يمكنك الآن البحث عن الخدمات والتواصل مع الحرفيين.',
    time: 'منذ لحظات',
  },
  {
    id: 2,
    type: 'success' as const,
    title: 'تم إرسال طلبك',
    message: 'تم إرسال رسالتك إلى مقدم الخدمة، سيتم الرد عليك في أقرب وقت.',
    time: 'منذ ساعة',
  },
  {
    id: 3,
    type: 'warning' as const,
    title: 'تذكير',
    message: 'قم بإكمال بيانات حسابك لتسهيل التواصل معك.',
    time: 'منذ يوم',
  },
];

const Notifications = () => {
  return (
    <AppLayout title="الإشعارات">
      <div className="px-4 py-6 space-y-4">
        {mockNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-muted-foreground">
            <Bell className="h-10 w-10 mb-3" />
            لا توجد إشعارات حالياً
          </div>
        ) : (
          <div className="space-y-3">
            {mockNotifications.map((n) => {
              const Icon =
                n.type === 'success' ? CheckCircle2 : n.type === 'warning' ? AlertTriangle : Info;
              return (
                <div
                  key={n.id}
                  className="flex items-start gap-3 rounded-2xl bg-card border border-border/60 p-3"
                >
                  <div className="mt-1">
                    <Icon
                      className={
                        n.type === 'success'
                          ? 'h-5 w-5 text-emerald-500'
                          : n.type === 'warning'
                          ? 'h-5 w-5 text-amber-500'
                          : 'h-5 w-5 text-primary'
                      }
                    />
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-sm font-semibold text-foreground">{n.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{n.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Notifications;

import { AppLayout } from '@/components/layout/AppLayout';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings = () => {
  return (
    <AppLayout title="الإعدادات">
      <div className="px-4 py-6 space-y-6">
        <section className="rounded-2xl bg-card border border-border/60 p-4 space-y-4">
          <h2 className="text-lg font-bold text-foreground text-right">المظهر</h2>
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode" className="text-right flex-1 mr-3">
              <div className="font-medium text-foreground">الوضع الداكن</div>
              <div className="text-xs text-muted-foreground">تفعيل/إيقاف الوضع الليلي للموقع</div>
            </Label>
            <Switch id="dark-mode" disabled />
          </div>
          <p className="text-xs text-muted-foreground text-right">
            (تنبيه) هذا الخيار تجريبي حالياً، ويمكن ربطه لاحقاً بنظام الثيمات في التطبيق.
          </p>
        </section>

        <section className="rounded-2xl bg-card border border-border/60 p-4 space-y-4">
          <h2 className="text-lg font-bold text-foreground text-right">اللغة والمنطقة</h2>
          <div className="space-y-2">
            <Label className="text-right block">اللغة</Label>
            <Select defaultValue="ar">
              <SelectTrigger>
                <SelectValue placeholder="اختر اللغة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="fr">الفرنسية (قريباً)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Settings;

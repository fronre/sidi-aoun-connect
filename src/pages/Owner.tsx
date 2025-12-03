import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Github, Instagram, Facebook, Linkedin } from 'lucide-react';

const Owner = () => {
  return (
    <AppLayout>
      <div className="px-4 py-6 space-y-6">
        <section className="rounded-3xl gradient-hero p-6 border border-border/30 shadow-elevated">
          <h1 className="text-2xl font-bold text-foreground mb-2 text-right">
            عن صاحب المشروع
          </h1>
          <p className="text-sm text-muted-foreground text-right mb-4">
            هذه الصفحة للتعريف بصاحب المشروع والمبرمج الذي يقف خلف منصة دليل خدمات سيدي عون.
            تم تطوير المنصة بحب لبلدية سيدي عون ورغبة في تسهيل الوصول للحرفيين والخدمات.
          </p>

          <div className="rounded-2xl bg-background/60 border border-border/60 p-4 space-y-3 text-right">
            <p className="text-sm text-foreground font-semibold">
              الاسم: <span className="font-normal">إسلام هاله</span>
            </p>
            <p className="text-sm text-foreground font-semibold">
              الدور: <span className="font-normal">مطور الواجهة الخلفية والواجهة الأمامية ومؤسس المشروع</span>
            </p>
            <p className="text-sm text-muted-foreground">
              أعمل على بناء منصات بسيطة ومفيدة تخدم المجتمع المحلي، وهذه المنصة خطوة أولى
              لجمع الحرفيين وأصحاب الخدمات في مكان واحد ليسهل على سكان سيدي عون الوصول إليهم.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground text-right">روابط التواصل الاجتماعي</h2>
          <p className="text-xs text-muted-foreground text-right">
            عدّل الروابط أدناه وضع حساباتك الحقيقية على مواقع التواصل الاجتماعي.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="flex items-center justify-center gap-2" asChild>
              <a href="#" target="_blank" rel="noreferrer">
                <Facebook className="h-4 w-4" />
                <span>Facebook</span>
              </a>
            </Button>

            <Button variant="outline" className="flex items-center justify-center gap-2" asChild>
              <a href="#" target="_blank" rel="noreferrer">
                <Instagram className="h-4 w-4" />
                <span>Instagram</span>
              </a>
            </Button>

            <Button variant="outline" className="flex items-center justify-center gap-2" asChild>
              <a href="#" target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            </Button>

            <Button variant="outline" className="flex items-center justify-center gap-2" asChild>
              <a href="#" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </Button>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Owner;

import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { CategoryCard } from '@/components/services/CategoryCard';
import { ServiceCard } from '@/components/services/ServiceCard';
import { SearchBar } from '@/components/search/SearchBar';
import { categories, services } from '@/data/mockData';
import { ChevronLeft, TrendingUp, Clock, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredServices = services.filter(service => {
    const matchesSearch = service.businessName.includes(searchQuery) || 
                         service.name.includes(searchQuery) ||
                         service.category.includes(searchQuery);
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const topRatedServices = [...services].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const recentServices = [...services].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 4);

  return (
    <AppLayout>
      <div className="space-y-6 pb-4">
        {/* Hero Section */}
        <section className="relative px-4 pt-4">
          <div className="rounded-3xl gradient-hero p-6 space-y-4 border border-border/30 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full gradient-primary blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-accent blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-foreground">
                مرحباً بك في
                <span className="text-gradient block mt-1">دليل خدمات سيدي عون</span>
              </h2>
              <p className="text-muted-foreground text-sm mt-2">
                منصة محلية تساعدك على العثور على الحرفيين والمتاجر والخدمات القريبة منك بسهولة وبواجهة عربية بسيطة.
              </p>
            </div>

            {/* Search */}
            <div className="relative z-10">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                onFilterClick={() => navigate('/search')}
              />
            </div>

            {/* Quick Highlights - نص عام بدون أرقام حقيقية */}
            <div className="relative z-10 flex flex-wrap items-center gap-3 pt-2 text-sm">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">حرفيون موثوقون وخدمات محلية</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">تجربة سهلة للبحث والتصفح</span>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-4">
            <h3 className="text-lg font-bold text-foreground">التصنيفات</h3>
            <Button variant="ghost" size="sm" className="text-primary">
              عرض الكل
              <ChevronLeft className="w-4 h-4 mr-1" />
            </Button>
          </div>
          
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 custom-scrollbar">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isSelected={selectedCategory === category.name}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.name ? null : category.name
                )}
              />
            ))}
          </div>
        </section>

        {/* Top Rated */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-foreground">الأعلى تقييماً</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              عرض الكل
              <ChevronLeft className="w-4 h-4 mr-1" />
            </Button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto px-4 pb-2 custom-scrollbar">
            {topRatedServices.map((service) => (
              <div key={service.id} className="min-w-[280px] max-w-[280px]">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </section>

        {/* Recent Services */}
        <section className="space-y-3 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-bold text-foreground">أضيفت مؤخراً</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(selectedCategory ? filteredServices : recentServices).map((service, index) => (
              <div 
                key={service.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Index;

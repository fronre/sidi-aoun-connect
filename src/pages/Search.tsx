import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SearchBar } from '@/components/search/SearchBar';
import { ServiceCard } from '@/components/services/ServiceCard';
import { CategoryCard } from '@/components/services/CategoryCard';
import { categories, services } from '@/data/mockData';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.businessName.includes(searchQuery) || 
      service.name.includes(searchQuery) ||
      service.category.includes(searchQuery) ||
      service.description.includes(searchQuery);
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  return (
    <AppLayout title="البحث">
      <div className="px-4 py-4 space-y-4">
        {/* Search Header */}
        <div className="space-y-4">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            onFilterClick={() => setShowFilters(!showFilters)}
          />

          {/* Active Filters */}
          {(searchQuery || selectedCategory) && (
            <div className="flex items-center gap-2 flex-wrap animate-fade-in">
              <span className="text-sm text-muted-foreground">الفلاتر:</span>
              {searchQuery && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 gap-1"
                  onClick={() => setSearchQuery('')}
                >
                  "{searchQuery}"
                  <X className="w-3 h-3" />
                </Button>
              )}
              {selectedCategory && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 gap-1"
                  onClick={() => setSelectedCategory(null)}
                >
                  {selectedCategory}
                  <X className="w-3 h-3" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-destructive"
                onClick={clearFilters}
              >
                مسح الكل
              </Button>
            </div>
          )}
        </div>

        {/* Categories Filter */}
        <div className={cn(
          'overflow-hidden transition-all duration-300',
          showFilters ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        )}>
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
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
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredServices.length} نتيجة
            </p>
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4 ml-2" />
              ترتيب
            </Button>
          </div>

          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredServices.map((service, index) => (
                <div 
                  key={service.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                لا توجد نتائج
              </h3>
              <p className="text-muted-foreground text-sm">
                جرب البحث بكلمات مختلفة أو اختر تصنيف آخر
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Search;

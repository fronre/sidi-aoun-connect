import { AppLayout } from '@/components/layout/AppLayout';
import { MapPin, Navigation, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services } from '@/data/mockData';
import { useState } from 'react';
import { ServiceCard } from '@/components/services/ServiceCard';

const Map = () => {
  const [showList, setShowList] = useState(false);

  return (
    <AppLayout title="الخريطة">
      <div className="relative h-[calc(100vh-180px)]">
        {/* Map Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
          <div className="text-center space-y-4 p-6">
            <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center mx-auto shadow-glow animate-pulse-glow">
              <MapPin className="w-12 h-12 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">خريطة الحرفيين</h3>
              <p className="text-muted-foreground text-sm mt-2">
                عرض جميع الحرفيين والخدمات على الخريطة
              </p>
            </div>
            <p className="text-xs text-muted-foreground bg-card/50 rounded-lg p-3">
              سيتم إضافة الخريطة التفاعلية قريباً مع إمكانية التوجيه المباشر
            </p>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Button 
            variant="glass" 
            size="icon" 
            className="rounded-full shadow-lg"
            onClick={() => setShowList(!showList)}
          >
            <List className="w-5 h-5" />
          </Button>
          
          <Button variant="glass" size="icon" className="rounded-full shadow-lg">
            <Navigation className="w-5 h-5" />
          </Button>
        </div>

        {/* Service Pins Simulation */}
        <div className="absolute inset-0 pointer-events-none">
          {services.slice(0, 4).map((service, index) => (
            <div
              key={service.id}
              className="absolute animate-float"
              style={{
                top: `${20 + index * 15}%`,
                left: `${15 + index * 20}%`,
                animationDelay: `${index * 0.5}s`
              }}
            >
              <div className="relative pointer-events-auto cursor-pointer group">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-glow group-hover:scale-125 transition-transform">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs bg-card px-2 py-1 rounded-lg shadow-lg">
                    {service.businessName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Sheet - Services List */}
        <div 
          className={`absolute bottom-0 left-0 right-0 glass-effect rounded-t-3xl transition-transform duration-300 ${
            showList ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'
          }`}
        >
          {/* Handle */}
          <div 
            className="flex justify-center py-3 cursor-pointer"
            onClick={() => setShowList(!showList)}
          >
            <div className="w-12 h-1.5 rounded-full bg-muted-foreground/30" />
          </div>

          <div className="px-4 pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-foreground">
                الخدمات القريبة ({services.length})
              </h3>
            </div>

            <div className="space-y-3 max-h-[40vh] overflow-y-auto custom-scrollbar">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Map;

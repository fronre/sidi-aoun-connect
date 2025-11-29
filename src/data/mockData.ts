import { Service, Category, Review } from '@/types/service';

export const categories: Category[] = [
  { id: '1', name: 'كهربائي', icon: '⚡', count: 12 },
  { id: '2', name: 'نجار', icon: '🪚', count: 8 },
  { id: '3', name: 'سباك', icon: '🔧', count: 15 },
  { id: '4', name: 'صيدلية', icon: '💊', count: 6 },
  { id: '5', name: 'بقالة', icon: '🛒', count: 20 },
  { id: '6', name: 'مطعم', icon: '🍽️', count: 14 },
  { id: '7', name: 'حلاق', icon: '💈', count: 10 },
  { id: '8', name: 'خياط', icon: '🧵', count: 7 },
  { id: '9', name: 'ميكانيكي', icon: '🔩', count: 9 },
  { id: '10', name: 'دهان', icon: '🎨', count: 5 },
];

export const services: Service[] = [
  {
    id: '1',
    name: 'محمد بن علي',
    businessName: 'ورشة الأمانة للكهرباء',
    category: 'كهربائي',
    description: 'خبرة 15 سنة في مجال الكهرباء المنزلية والصناعية. نقدم خدمات تركيب وصيانة الأنظمة الكهربائية بأعلى معايير الجودة والأمان.',
    phone: '0555123456',
    email: 'mohamed@example.com',
    address: 'شارع الاستقلال، سيدي عون',
    images: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400'],
    rating: 4.8,
    reviewCount: 45,
    latitude: 33.8,
    longitude: 6.9,
    isVerified: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'أحمد كريم',
    businessName: 'نجارة الفن الجميل',
    category: 'نجار',
    description: 'صناعة وتفصيل جميع أنواع الأثاث الخشبي حسب الطلب. نستخدم أجود أنواع الخشب مع ضمان على جميع الأعمال.',
    phone: '0556789012',
    address: 'حي النصر، سيدي عون',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
    rating: 4.5,
    reviewCount: 32,
    isVerified: true,
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'صيدلية الشفاء',
    businessName: 'صيدلية الشفاء',
    category: 'صيدلية',
    description: 'صيدلية متكاملة توفر جميع الأدوية والمستلزمات الطبية. خدمة 24 ساعة مع توصيل للمنازل.',
    phone: '0557890123',
    address: 'الشارع الرئيسي، سيدي عون',
    images: ['https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400'],
    rating: 4.9,
    reviewCount: 78,
    isVerified: true,
    createdAt: '2024-01-05',
  },
  {
    id: '4',
    name: 'عمر السباك',
    businessName: 'خدمات السباكة المتقدمة',
    category: 'سباك',
    description: 'إصلاح وتركيب جميع أنواع السباكة. خدمة طوارئ متاحة على مدار الساعة.',
    phone: '0558901234',
    address: 'حي الأمل، سيدي عون',
    images: ['https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400'],
    rating: 4.3,
    reviewCount: 25,
    isVerified: false,
    createdAt: '2024-03-10',
  },
  {
    id: '5',
    name: 'مطعم الوادي',
    businessName: 'مطعم الوادي للمأكولات التقليدية',
    category: 'مطعم',
    description: 'أشهى المأكولات الجزائرية التقليدية. كسكس، شخشوخة، رشتة، وأطباق متنوعة محضرة بعناية.',
    phone: '0559012345',
    address: 'ساحة البلدية، سيدي عون',
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'],
    rating: 4.7,
    reviewCount: 120,
    isVerified: true,
    createdAt: '2024-01-20',
  },
  {
    id: '6',
    name: 'صالون الأناقة',
    businessName: 'صالون الأناقة للحلاقة',
    category: 'حلاق',
    description: 'حلاقة رجالية عصرية وتقليدية. خدمات الحلاقة، تصفيف الشعر، والعناية باللحية.',
    phone: '0551234567',
    address: 'شارع الحرية، سيدي عون',
    images: ['https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400'],
    rating: 4.6,
    reviewCount: 55,
    isVerified: true,
    createdAt: '2024-02-05',
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    serviceId: '1',
    userId: 'u1',
    userName: 'خالد محمود',
    rating: 5,
    comment: 'خدمة ممتازة وسريعة. أنصح الجميع بالتعامل معه.',
    createdAt: '2024-03-15',
  },
  {
    id: '2',
    serviceId: '1',
    userId: 'u2',
    userName: 'فاطمة الزهراء',
    rating: 4,
    comment: 'عمل جيد لكن كان هناك بعض التأخير.',
    createdAt: '2024-03-10',
  },
  {
    id: '3',
    serviceId: '2',
    userId: 'u3',
    userName: 'سمير بوعلام',
    rating: 5,
    comment: 'أثاث راقي وجودة عالية. شكراً جزيلاً.',
    createdAt: '2024-03-12',
  },
];

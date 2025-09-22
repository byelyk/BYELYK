import { Dorm, Fit, Application, DormFilters, FitFilters } from './types';
import { prisma } from './db';

// Individual Dorm Rooms Seed Data
const seedDorms: Dorm[] = [
  {
    id: 'chris-dorm',
    name: "Chris's Dorm",
    hall: 'Cougar Village I',
    type: 'residence-hall',
    classEligibility: 'first-year-only',
    roomTypes: ['Double'],
    description: 'Chris has an amazing setup with LED lights, gaming setup, and great organization. Perfect for studying and hanging out.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', alt: 'Chris dorm room view' },
      { url: 'https://images.unsplash.com/photo-1555854877-bab0ef4c7c9e?w=800&h=600&fit=crop', alt: 'Chris gaming setup' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', alt: 'Chris study area' }
    ],
    amenities: ['LED Lights', 'Gaming Setup', 'Study Space', 'Clean Organization'],
    addressOrArea: 'Room 201',
    rating: { average: 8.5, count: 23 },
    tags: ['gaming', 'led-lights', 'organized', 'study-friendly', 'social']
  },
  {
    id: 'april-dorm',
    name: "April's Dorm",
    hall: 'Cougar Village II',
    type: 'residence-hall',
    classEligibility: 'first-year-only',
    roomTypes: ['Single'],
    description: 'April has created a cozy, minimalist space with plants and fairy lights. Perfect for studying and relaxing.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', alt: 'April dorm room view' },
      { url: 'https://images.unsplash.com/photo-1555854877-bab0ef4c7c9e?w=800&h=600&fit=crop', alt: 'April study corner' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', alt: 'April room decor' }
    ],
    amenities: ['Plants', 'Fairy Lights', 'Study Desk', 'Cozy Vibes'],
    addressOrArea: 'Room 305',
    rating: { average: 9.2, count: 31 },
    tags: ['minimalist', 'plants', 'cozy', 'study-friendly', 'aesthetic']
  },
  {
    id: 'mike-dorm',
    name: "Mike's Dorm",
    hall: 'Moody Towers',
    type: 'residence-hall',
    classEligibility: 'sophomore-plus',
    roomTypes: ['Double'],
    description: 'Mike has an awesome sports-themed room with memorabilia and a mini fridge. Great for hanging out with friends.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', alt: 'Mike dorm room view' },
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', alt: 'Mike sports corner' },
      { url: 'https://images.unsplash.com/photo-1555854877-bab0ef4c7c9e?w=800&h=600&fit=crop', alt: 'Mike hangout area' }
    ],
    amenities: ['Sports Memorabilia', 'Mini Fridge', 'TV Setup', 'Comfortable Seating'],
    addressOrArea: 'Room 412',
    rating: { average: 7.8, count: 19 },
    tags: ['sports', 'hangout', 'social', 'comfortable', 'entertainment']
  },
  {
    id: 'sarah-dorm',
    name: "Sarah's Dorm",
    hall: 'The Quad',
    type: 'apartment',
    classEligibility: 'sophomore-plus',
    roomTypes: ['2x2'],
    description: 'Sarah has transformed her space into a creative studio with art supplies and inspiration boards. Perfect for artistic students.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', alt: 'Sarah dorm room view' },
      { url: 'https://images.unsplash.com/photo-1555854877-bab0ef4c7c9e?w=800&h=600&fit=crop', alt: 'Sarah art corner' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', alt: 'Sarah creative space' }
    ],
    amenities: ['Art Supplies', 'Inspiration Boards', 'Creative Space', 'Good Lighting'],
    addressOrArea: 'Suite 2B',
    rating: { average: 8.9, count: 27 },
    tags: ['artistic', 'creative', 'inspiring', 'organized', 'unique']
  },
  {
    id: 'alex-dorm',
    name: "Alex's Dorm",
    hall: 'Cougar Place',
    type: 'apartment',
    classEligibility: 'sophomore-plus',
    roomTypes: ['1x1'],
    description: 'Alex has a tech-focused setup with multiple monitors and a standing desk. Perfect for computer science students.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', alt: 'Alex dorm room view' },
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', alt: 'Alex tech setup' },
      { url: 'https://images.unsplash.com/photo-1555854877-bab0ef4c7c9e?w=800&h=600&fit=crop', alt: 'Alex workspace' }
    ],
    amenities: ['Multiple Monitors', 'Standing Desk', 'Tech Setup', 'Cable Management'],
    addressOrArea: 'Apt 3C',
    rating: { average: 8.6, count: 24 },
    tags: ['tech', 'productive', 'modern', 'organized', 'professional']
  },
  {
    id: 'jessica-dorm',
    name: "Jessica's Dorm",
    hall: 'University Lofts',
    type: 'loft',
    classEligibility: 'upper-class',
    roomTypes: ['1x1'],
    description: 'Jessica has created a luxurious space with premium furniture and elegant decor. Perfect for students who love sophistication.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', alt: 'Jessica dorm room view' },
      { url: 'https://images.unsplash.com/photo-1555854877-bab0ef4c7c9e?w=800&h=600&fit=crop', alt: 'Jessica elegant corner' },
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', alt: 'Jessica luxury setup' }
    ],
    amenities: ['Premium Furniture', 'Elegant Decor', 'Luxury Bedding', 'Sophisticated Design'],
    addressOrArea: 'Loft 5A',
    rating: { average: 9.4, count: 18 },
    tags: ['luxury', 'elegant', 'sophisticated', 'premium', 'upscale']
  }
];

const seedFits: Fit[] = [
  {
    id: 'fit-1',
    creator: '@uhstudent1',
    dorm: 'University Lofts',
    description: 'Clean minimal look for class - perfect for presentations and study sessions. Love the natural lighting in the lofts!',
    photos: [
      { url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=600&fit=crop', alt: 'Minimal outfit' },
      { url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=600&fit=crop', alt: 'Outfit detail' }
    ],
    rating: { average: 8.5, count: 23 },
    styleTags: ['minimal', 'academic', 'clean']
  },
  {
    id: 'fit-2',
    creator: '@cougarstyle',
    dorm: 'The Quad',
    description: 'Streetwear vibes for a casual day around campus. The Quad has the best lighting for outfit photos!',
    photos: [
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop', alt: 'Streetwear outfit' },
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop', alt: 'Outfit close-up' }
    ],
    rating: { average: 7.8, count: 31 },
    styleTags: ['streetwear', 'casual', 'urban']
  },
  {
    id: 'fit-3',
    creator: '@uhfashion',
    dorm: 'Cougar Village I',
    description: 'Vintage thrift find styled for a night out. CVI common areas make great photo backdrops!',
    photos: [
      { url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop', alt: 'Vintage outfit' },
      { url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=600&fit=crop', alt: 'Vintage details' }
    ],
    rating: { average: 9.2, count: 18 },
    styleTags: ['vintage', 'thrift', 'night-out']
  },
  {
    id: 'fit-4',
    creator: '@dormstyle',
    dorm: 'Moody Towers',
    description: 'Athleisure perfect for a day of classes and gym. Moody Towers is so convenient for everything!',
    photos: [
      { url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop', alt: 'Athleisure outfit' },
      { url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop', alt: 'Athleisure detail' }
    ],
    rating: { average: 7.5, count: 27 },
    styleTags: ['athleisure', 'comfortable', 'active']
  },
  {
    id: 'fit-5',
    creator: '@uhvibes',
    dorm: 'Bayou Oaks',
    description: 'Cozy fall look for studying in the townhouse. Bayou Oaks gives such homey vibes!',
    photos: [
      { url: 'https://images.unsplash.com/photo-1571513720943-10795f3b0a54?w=800&h=600&fit=crop', alt: 'Cozy fall outfit' },
      { url: 'https://images.unsplash.com/photo-1571513720943-10795f3b0a54?w=800&h=600&fit=crop', alt: 'Cozy details' }
    ],
    rating: { average: 8.8, count: 19 },
    styleTags: ['cozy', 'fall', 'studying']
  }
];

// Initialize data
const dorms: Dorm[] = [...seedDorms];
const fits: Fit[] = [...seedFits];
const applications: Application[] = [];

// Service functions
export async function getDorms(filters?: DormFilters): Promise<Dorm[]> {
  try {
    const dorms = await prisma.dorm.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Parse JSON fields
    const dormsWithParsedData = dorms.map(dorm => ({
      ...dorm,
      photos: JSON.parse(dorm.photos || '[]'),
      tags: JSON.parse(dorm.tags || '[]'),
      rating: dorm.rating as { average: number; count: number }
    }));

    let filteredDorms = dormsWithParsedData;

    if (filters) {
      if (filters.hall && filters.hall.length > 0) {
        filteredDorms = filteredDorms.filter(dorm => filters.hall!.includes(dorm.name));
      }
      
      if (filters.type && filters.type.length > 0) {
        filteredDorms = filteredDorms.filter(dorm => filters.type!.includes(dorm.type));
      }
      
      if (filters.tags && filters.tags.length > 0) {
        filteredDorms = filteredDorms.filter(dorm => 
          filters.tags!.some(tag => dorm.tags.includes(tag))
        );
      }
      
      if (filters.q) {
        const query = filters.q.toLowerCase();
        filteredDorms = filteredDorms.filter(dorm => 
          dorm.name.toLowerCase().includes(query) ||
          (dorm.description && dorm.description.toLowerCase().includes(query)) ||
          dorm.tags.some((tag: string) => tag.toLowerCase().includes(query))
        );
      }
    }

    return filteredDorms.map(dorm => ({
      ...dorm,
      hall: dorm.name,
      classEligibility: 'sophomore-plus' as const,
      roomTypes: ['Double', 'Single'],
      amenities: ['Laundry', 'Study Rooms'],
      photos: JSON.parse(dorm.photos || '[]'),
      tags: JSON.parse(dorm.tags || '[]'),
      rating: typeof dorm.rating === 'object' ? dorm.rating : { average: 0, count: 0 },
      type: (dorm.type as 'residence-hall' | 'apartment' | 'loft') || 'residence-hall',
      description: dorm.description || ''
    })).sort((a, b) => b.rating.average - a.rating.average);
  } catch (error) {
    console.error('Error fetching dorms:', error);
    return [];
  }
}

export async function getFits(filters?: FitFilters): Promise<Fit[]> {
  try {
    const fits = await prisma.fit.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Parse JSON fields
    const fitsWithParsedData = fits.map(fit => ({
      ...fit,
      photos: JSON.parse(fit.photos || '[]'),
      styleTags: JSON.parse(fit.styleTags || '[]'),
      rating: fit.rating as { average: number; count: number }
    }));

    let filteredFits = fitsWithParsedData;

    if (filters) {
      if (filters.styleTags && filters.styleTags.length > 0) {
        filteredFits = filteredFits.filter(fit => 
          filters.styleTags!.some(tag => fit.styleTags.includes(tag))
        );
      }
      
      if (filters.q) {
        const query = filters.q.toLowerCase();
        filteredFits = filteredFits.filter(fit => 
          fit.creator.toLowerCase().includes(query) ||
          fit.description.toLowerCase().includes(query) ||
          fit.styleTags.some((tag: string) => tag.toLowerCase().includes(query))
        );
      }
    }

    return filteredFits.map(fit => ({
      ...fit,
      dorm: fit.dorm || undefined
    })).sort((a, b) => b.rating.average - a.rating.average);
  } catch (error) {
    console.error('Error fetching fits:', error);
    return [];
  }
}

export async function getDormById(id: string): Promise<Dorm | undefined> {
  try {
    const dorm = await prisma.dorm.findUnique({
      where: { id }
    });

    if (!dorm) return undefined;

    return {
      ...dorm,
      hall: dorm.addressOrArea.split(' • ')[0] || dorm.addressOrArea,
      classEligibility: 'sophomore-plus' as const,
      roomTypes: ['Double', 'Single'],
      amenities: ['Laundry', 'Study Rooms'],
      photos: JSON.parse(dorm.photos || '[]'),
      tags: JSON.parse(dorm.tags || '[]'),
      rating: dorm.rating as { average: number; count: number },
      description: dorm.description || '',
      type: (dorm.type as 'residence-hall' | 'apartment' | 'loft') || 'residence-hall'
    };
  } catch (error) {
    console.error('Error fetching dorm by ID:', error);
    return undefined;
  }
}

export async function getFitById(id: string): Promise<Fit | undefined> {
  try {
    const fit = await prisma.fit.findUnique({
      where: { id }
    });

    if (!fit) return undefined;

    return {
      ...fit,
      photos: JSON.parse(fit.photos || '[]'),
      styleTags: JSON.parse(fit.styleTags || '[]'),
      rating: fit.rating as { average: number; count: number },
      dorm: fit.dorm || undefined
    };
  } catch (error) {
    console.error('Error fetching fit by ID:', error);
    return undefined;
  }
}

export function rateDorm(id: string, score: number): { average: number; count: number } {
  const dorm = dorms.find(d => d.id === id);
  if (!dorm) throw new Error('Dorm not found');

  const newCount = dorm.rating.count + 1;
  const newAverage = (dorm.rating.average * dorm.rating.count + score) / newCount;
  
  dorm.rating = { average: newAverage, count: newCount };
  
  return dorm.rating;
}

export function rateFit(id: string, score: number): { average: number; count: number } {
  const fit = fits.find(f => f.id === id);
  if (!fit) throw new Error('Fit not found');

  const newCount = fit.rating.count + 1;
  const newAverage = (fit.rating.average * fit.rating.count + score) / newCount;
  
  fit.rating = { average: newAverage, count: newCount };
  
  return fit.rating;
}

export function submitApplication(application: Omit<Application, 'id' | 'createdAt'>): Application {
  const newApplication: Application = {
    ...application,
    id: `app-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  
  applications.push(newApplication);
  return newApplication;
}

export function getApplications(): Application[] {
  return [...applications].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getApplicationsBySection(section: 'dorm-wars' | 'fit-checks'): Application[] {
  return applications.filter(app => app.section === section);
}

// Building options for individual dorms
export const BUILDING_OPTIONS = [
  'CV1 (Cougar Village I)',
  'CV2 (Cougar Village II)', 
  'Moody Towers',
  'The Quad',
  'Cougar Place',
  'University Lofts',
  'Bayou Oaks',
  'Cambridge Oaks',
  'Cullen Oaks'
];

export const TYPE_OPTIONS = [
  'residence-hall',
  'apartment', 
  'loft'
];

export const TAG_OPTIONS = [
  'freshman',
  'sophomore+',
  'upper-class',
  'suite',
  'community-bath',
  'private-bath',
  'near dining hall',
  'LLCs',
  'quiet',
  'social',
  'Greek-adjacent',
  'study spaces',
  'kitchen',
  'amenities',
  'off-campus',
  'central'
];

export const STYLE_TAG_OPTIONS = [
  'minimal',
  'academic',
  'clean',
  'streetwear',
  'casual',
  'urban',
  'vintage',
  'thrift',
  'night-out',
  'athleisure',
  'comfortable',
  'active',
  'cozy',
  'fall',
  'studying'
];

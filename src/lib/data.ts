import { Dorm, Fit, Application, DormFilters, FitFilters } from './types';

// Mock data store (in-memory for MVP)
let dorms: Dorm[] = [];
let fits: Fit[] = [];
const applications: Application[] = [];

// UH Housing Seed Data
const seedDorms: Dorm[] = [
  {
    id: 'cvi',
    name: 'Cougar Village I',
    hall: 'Cougar Village I',
    type: 'residence-hall',
    classEligibility: 'first-year-only',
    roomTypes: ['Double', 'Single'],
    description: 'First-year only residence hall with doubles and singles. Features LLCs (Living Learning Communities) and is known for its social atmosphere. Close to dining halls and the Student Center.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', alt: 'Cougar Village I exterior' },
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', alt: 'CVI double room' },
      { url: 'https://images.unsplash.com/photo-1555854877-bab0ef4c7c9e?w=800&h=600&fit=crop', alt: 'CVI common area' }
    ],
    amenities: ['Laundry', 'Study Rooms', 'Dining Hall Access', 'LLCs', 'Community Bathrooms'],
    addressOrArea: 'Central Campus',
    rating: { average: 7.2, count: 45 },
    tags: ['freshman', 'community-bath', 'social', 'near dining hall', 'LLCs']
  },
  {
    id: 'cvii',
    name: 'Cougar Village II',
    hall: 'Cougar Village II',
    type: 'residence-hall',
    classEligibility: 'first-year-only',
    roomTypes: ['Double', 'Single'],
    description: 'First-year residence hall with modern amenities. Similar to CVI but with updated facilities. Great for students who want the traditional dorm experience with a bit more privacy.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', alt: 'Cougar Village II exterior' },
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', alt: 'CVII room interior' },
      { url: 'https://images.unsplash.com/photo-1555854877-bab0ef4c7c9e?w=800&h=600&fit=crop', alt: 'CVII study lounge' }
    ],
    amenities: ['Laundry', 'Study Rooms', 'Dining Hall Access', 'Community Bathrooms'],
    addressOrArea: 'Central Campus',
    rating: { average: 7.8, count: 38 },
    tags: ['freshman', 'community-bath', 'social', 'near dining hall']
  },
  {
    id: 'moody-towers',
    name: 'Moody Towers',
    hall: 'Moody Towers',
    type: 'residence-hall',
    classEligibility: 'sophomore-plus',
    roomTypes: ['Double', 'Single'],
    description: 'Twin towers housing both first-year and upper-class students. Features an on-site dining hall and is centrally located. Known for its convenience and social opportunities.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', alt: 'Moody Towers exterior' },
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', alt: 'Moody Towers room' },
      { url: 'https://images.unsplash.com/photo-1555854877-bab0ef4c7c9e?w=800&h=600&fit=crop', alt: 'Moody dining hall' }
    ],
    amenities: ['Laundry', 'Study Rooms', 'Dining Hall', 'Community Bathrooms', 'Central Location'],
    addressOrArea: 'Central Campus',
    rating: { average: 8.1, count: 52 },
    tags: ['mixed-class', 'community-bath', 'near dining hall', 'central', 'social']
  },
  {
    id: 'the-quad',
    name: 'The Quad',
    hall: 'The Quad',
    type: 'apartment',
    classEligibility: 'sophomore-plus',
    roomTypes: ['2x2', '4x2'],
    description: 'Suite-style living for sophomores and above. Features shared common areas and private bedrooms. Great for students who want more independence while staying on campus.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', alt: 'The Quad exterior' },
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', alt: 'Quad suite common area' },
      { url: 'https://images.unsplash.com/photo-1555854877-bab0ef4c7c9e?w=800&h=600&fit=crop', alt: 'Quad bedroom' }
    ],
    amenities: ['Laundry', 'Kitchen', 'Private Bathrooms', 'Study Spaces', 'Living Room'],
    addressOrArea: 'Central Campus',
    rating: { average: 8.5, count: 41 },
    tags: ['sophomore+', 'suite', 'private-bath', 'kitchen', 'independent']
  },
  {
    id: 'cougar-place',
    name: 'Cougar Place',
    hall: 'Cougar Place',
    type: 'apartment',
    classEligibility: 'sophomore-plus',
    roomTypes: ['1x1', '2x2', '4x2'],
    description: 'Apartment-style living with various configurations. Hosts special communities and offers more privacy. Great for upperclassmen who want apartment-style living on campus.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', alt: 'Cougar Place exterior' },
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', alt: 'Cougar Place apartment' },
      { url: 'https://images.unsplash.com/photo-1555854877-bab0ef4c7c9e?w=800&h=600&fit=crop', alt: 'Cougar Place kitchen' }
    ],
    amenities: ['Laundry', 'Kitchen', 'Private Bathrooms', 'Study Spaces', 'Special Communities'],
    addressOrArea: 'Central Campus',
    rating: { average: 8.7, count: 33 },
    tags: ['sophomore+', 'apartment', 'private-bath', 'kitchen', 'special-communities']
  },
  {
    id: 'university-lofts',
    name: 'University Lofts',
    hall: 'University Lofts',
    type: 'loft',
    classEligibility: 'upper-class',
    roomTypes: ['1x1', '2x2'],
    description: 'Modern loft-style apartments for upper-class students. Features contemporary design and premium amenities. Perfect for students who want a more upscale living experience.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', alt: 'University Lofts exterior' },
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', alt: 'Loft interior' },
      { url: 'https://images.unsplash.com/photo-1555854877-bab0ef4c7c9e?w=800&h=600&fit=crop', alt: 'Loft kitchen' }
    ],
    amenities: ['Laundry', 'Kitchen', 'Private Bathrooms', 'Modern Design', 'Premium Features'],
    addressOrArea: 'Central Campus',
    rating: { average: 9.1, count: 28 },
    tags: ['upper-class', 'loft', 'private-bath', 'premium', 'modern']
  },
  {
    id: 'bayou-oaks',
    name: 'Bayou Oaks',
    hall: 'Bayou Oaks',
    type: 'apartment',
    classEligibility: 'sophomore-plus',
    roomTypes: ['2x2', '4x2'],
    description: 'Townhouse-style apartments near Greek life. Offers a more independent living experience while staying connected to campus. Great for students involved in Greek life or who want more space.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', alt: 'Bayou Oaks exterior' },
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', alt: 'Bayou Oaks townhouse' },
      { url: 'https://images.unsplash.com/photo-1555854877-bab0ef4c7c9e?w=800&h=600&fit=crop', alt: 'Bayou Oaks living area' }
    ],
    amenities: ['Laundry', 'Kitchen', 'Private Bathrooms', 'More Space', 'Greek Life Proximity'],
    addressOrArea: 'South Campus',
    rating: { average: 8.3, count: 29 },
    tags: ['sophomore+', 'apartment', 'private-bath', 'Greek-adjacent', 'spacious']
  },
  {
    id: 'cambridge-oaks',
    name: 'Cambridge Oaks',
    hall: 'Cambridge Oaks',
    type: 'apartment',
    classEligibility: 'sophomore-plus',
    roomTypes: ['Studio', '1x1', '2x2'],
    description: 'Affiliated off-campus apartments managed by CLV. Offers studio and apartment options with modern amenities. Great for students who want off-campus living with campus convenience.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', alt: 'Cambridge Oaks exterior' },
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', alt: 'Cambridge Oaks studio' },
      { url: 'https://images.unsplash.com/photo-1555854877-bab0ef4c7c9e?w=800&h=600&fit=crop', alt: 'Cambridge Oaks amenities' }
    ],
    amenities: ['Laundry', 'Kitchen', 'Private Bathrooms', 'Pool', 'Fitness Center', 'Off-Campus'],
    addressOrArea: 'Off-Campus',
    rating: { average: 7.9, count: 22 },
    tags: ['sophomore+', 'apartment', 'private-bath', 'off-campus', 'amenities']
  },
  {
    id: 'cullen-oaks',
    name: 'Cullen Oaks',
    hall: 'Cullen Oaks',
    type: 'apartment',
    classEligibility: 'sophomore-plus',
    roomTypes: ['1x1', '2x2', '3x2', '4x2'],
    description: 'Affiliated apartments managed by ACC. Offers various bedroom configurations with full apartment amenities. Perfect for students who want apartment living with campus resources.',
    photos: [
      { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', alt: 'Cullen Oaks exterior' },
      { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', alt: 'Cullen Oaks apartment' },
      { url: 'https://images.unsplash.com/photo-1555854877-bab0ef4c7c9e?w=800&h=600&fit=crop', alt: 'Cullen Oaks living space' }
    ],
    amenities: ['Laundry', 'Kitchen', 'Private Bathrooms', 'Pool', 'Fitness Center', 'Study Rooms'],
    addressOrArea: 'Off-Campus',
    rating: { average: 8.0, count: 31 },
    tags: ['sophomore+', 'apartment', 'private-bath', 'off-campus', 'amenities', 'flexible-options']
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
dorms = [...seedDorms];
fits = [...seedFits];

// Service functions
export function getDorms(filters?: DormFilters): Dorm[] {
  let filteredDorms = [...dorms];

  if (filters) {
    if (filters.hall && filters.hall.length > 0) {
      filteredDorms = filteredDorms.filter(dorm => filters.hall!.includes(dorm.hall));
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
        dorm.description.toLowerCase().includes(query) ||
        dorm.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
  }

  return filteredDorms.sort((a, b) => b.rating.average - a.rating.average);
}

export function getFits(filters?: FitFilters): Fit[] {
  let filteredFits = [...fits];

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
        fit.styleTags.some(tag => tag.toLowerCase().includes(query))
      );
    }
  }

  return filteredFits.sort((a, b) => b.rating.average - a.rating.average);
}

export function getDormById(id: string): Dorm | undefined {
  return dorms.find(dorm => dorm.id === id);
}

export function getFitById(id: string): Fit | undefined {
  return fits.find(fit => fit.id === id);
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

// Filter options
export const HALL_OPTIONS = [
  'Cougar Village I',
  'Cougar Village II', 
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

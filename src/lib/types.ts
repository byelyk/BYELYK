export type Rating = { 
  average: number; 
  count: number; 
};

export type Photo = { 
  url: string; 
  alt?: string; 
};

export type Dorm = {
  id: string;
  name: string;          // e.g., "Cougar Village I"
  hall: string;          // same as name; used for filters/links
  type: "residence-hall" | "apartment" | "loft";
  classEligibility: "first-year-only" | "sophomore-plus" | "upper-class";
  roomTypes: string[];   // e.g., ["Double", "Single"] or ["1x1","2x2"]
  description: string;
  photos: Photo[];
  amenities: string[];   // laundry, study rooms, etc.
  addressOrArea: string; // short area label
  rating: Rating;
  tags: string[];        // e.g., ["freshman","suite","near dining hall"]
};

export type Fit = {
  id: string;
  creator: string;       // @handle or name
  dorm?: string;         // optional link to a UH hall
  description: string;
  photos: Photo[];
  rating: Rating;
  styleTags: string[];   // e.g., ["streetwear","vintage"]
};

export type Application = {
  id: string;
  section: "dorm-wars" | "fit-checks";
  name: string;
  email?: string;
  instagram?: string;
  tiktok?: string;
  dormOrHall?: string;   // free text or select from UH halls
  message?: string;      // short pitch
  photoUrls: string[];
  createdAt: string;
};

export type DormFilters = {
  hall?: string[];
  type?: string[];
  tags?: string[];
  q?: string;
};

export type FitFilters = {
  styleTags?: string[];
  q?: string;
};

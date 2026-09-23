export type Language = 'en' | 'hi' | 'mr';
export type ThemeMode = 'light' | 'dark';

export interface RoomOption {
  id: string;
  titleKey: string;
  taglineKey: string;
  category: 'villa' | 'cottage' | 'suite' | 'dorm';
  capacity: {
    min: number;
    max: number;
    bedrooms: number;
    bathrooms: number;
  };
  basePriceWeekday: number;
  basePriceWeekend: number;
  featuredImage: string;
  gallery: string[];
  keyFeatures: string[];
  bedType: string;
  view: string;
  descriptionKey: string;
}

export interface AmenityItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  highlights?: string[];
  category: 'leisure' | 'outdoor' | 'comfort' | 'dining';
  badge?: string;
  titleKey?: string;
  descKey?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'nonveg' | 'veg' | 'bbq' | 'breakfast' | 'dessert-beverage';
  price: number;
  portion: string;
  description: string;
  isVeg: boolean;
  isChefSpecial?: boolean;
  badge?: string;
  spicyLevel?: 1 | 2 | 3;
}

export interface DiningItem {
  id: string;
  name: string;
  nameKey?: string;
  category: 'lunch-dinner' | 'breakfast-snacks' | 'bbq';
  isVeg: boolean;
  specialty: boolean;
  descKey?: string;
}

export interface AttractionItem {
  id: string;
  name: string;
  distanceKm: number;
  driveTimeMin: number;
  category: 'nature' | 'waterfall' | 'heritage' | 'entertainment';
  description: string;
  highlight: string;
  image: string;
  mapDestinationQuery: string;
  descKey?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  city: string;
  stayType: string;
  category: 'villa' | 'family' | 'corporate' | 'pets' | 'celebration';
  date: string;
  rating: number;
  comment: string;
  highlightTags?: string[];
  groupSize?: string;
  textKey?: string;
}

export interface FaqItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

export interface BookingState {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomTypeId: string;
  mealPlan: 'none' | 'breakfast' | 'all-meals';
  name: string;
  phone: string;
  email: string;
  specialRequests: string;
}

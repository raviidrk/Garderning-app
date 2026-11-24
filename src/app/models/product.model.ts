export type PlantLight = 'bright-direct' | 'bright-indirect' | 'low-light' | 'all';
export type PlantWater = 'low' | 'moderate' | 'frequent';
export type PlantDifficulty = 'easy' | 'moderate' | 'expert';
export type PlantPlacement = 'indoor' | 'outdoor' | 'balcony' | 'terrace';

export interface ProductCare {
  light: 'Bright Direct Sun' | 'Bright Indirect Light' | 'Low Light / Shade';
  lightKey: PlantLight;
  water: 'Water when topsoil is dry' | '1-2 times weekly' | 'Daily in Chennai summer';
  difficulty: 'Beginner Friendly' | 'Moderate Care' | 'Plant Parent Pro';
  petSafe: boolean;
  placement: 'Living Room / Indoor' | 'Balcony / Window' | 'Terrace / Garden';
  placementKey: PlantPlacement;
  potSize: string;
}

export interface Product {
  id: string;
  name: string;
  tamilName: string;
  category: 'plants' | 'seeds' | 'growbags' | 'soil' | 'tools' | 'pots' | 'stands' | 'gifts';
  categoryLabel: string;
  categoryTamil: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  potSize?: string;
  packOptions: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  image: string;
  badge?: 'Bestseller' | 'New' | 'Chennai Special' | 'Fast Growing' | 'Top Rated';
  description: string;
  tamilDescription: string;
  careInfo?: ProductCare;
  isNativeToTamilNadu?: boolean;
}

export interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  tamilName: string;
  count: number;
  image: string;
  bgGradient: string;
}

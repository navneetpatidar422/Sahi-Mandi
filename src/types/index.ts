export interface Crop {
  id: string;
  name: string;
  nameHindi: string;
  category: string;
  emoji: string;
  unit: string;
}

export interface Mandi {
  id: string;
  name: string;
  location: string;
  state: string;
  distance: number;
  rating: number;
  reviews: number;
  phone: string;
  address: string;
  operatingHours: string;
  facilities: string[];
  image: string;
  paymentMethods: string[];
}

export interface FarmerProfile {
  name: string;
  phone: string;
  age?: number;
  gender?: string;
  state: string;
  district: string;
  pincode: string;
  village: string;
  farmSize?: string;
  crops: string[];
}

export interface PriceData {
  [mandiId: string]: {
    [cropId: string]: number;
  };
}

export interface PriceHistoryEntry {
  date: string;
  [mandiId: string]: number | string;
}

export interface Review {
  id: string;
  mandiId: string;
  farmerName: string;
  village: string;
  rating: number;
  comment: string;
  date: string;
}

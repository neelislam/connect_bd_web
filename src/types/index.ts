export interface UserProfile {
  uid: string;
  name: string;
  phone: string;
  address?: string;
  isProvider: boolean;
  verified: boolean;
  createdAt?: any; // Timestamp
}

export interface TravelPost {
  id?: string;
  fromDivision: string;
  toDivision: string;
  date: string; // 'YYYY-MM-DD'
  time: string; // e.g. '9:00 AM'
  vehicleType: string;
  contactNumber: string;
  socialLink?: string;
  driverName: string;
  isPassengerPost: boolean;
  rentOffer?: string;
  hasFreeFood: boolean;
  hasFreeLiving: boolean;
  intermediateStops?: string[];
  createdAt?: any;
}

export interface MedicalService {
  id?: string;
  name: string;
  type: string; // 'Doctor', 'Ambulance', 'Pharmacy', 'Blood Bank'
  division: string;
  district: string;
  phone: string;
  address: string;
  verified: boolean;
  createdAt?: any;
}

export interface ServicePost {
  id?: string;
  category: string; // subCategoryId from mock data
  isProviderPost: boolean;
  title: string;
  description?: string;
  priceOffer?: string;
  district: string;
  division: string;
  phone: string;
  creatorName: string;
  is24x7: boolean;
  daysActive: string[]; // ['Sun','Mon',...]
  timeFrom?: string;
  timeTo?: string;
  verified: boolean;
  createdAt?: any;
}

export interface FeatureCategory {
  id: string;
  title: string;
  subCategories: ServiceSubCategory[];
}

export interface ServiceSubCategory {
  id: string;
  title: string;
  divisions: DivisionAvailability[];
}

export interface DivisionAvailability {
  divisionName: string;
  count: number;
}
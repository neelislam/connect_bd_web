export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  division?: string;
  district?: string;
  role?: 'user' | 'admin';
}

export interface TravelPost {
  id?: string;
  fromDivision: string;
  toDivision: string;
  date: string;
  time: string;
  vehicleType: string;
  contactNumber: string;
  driverName?: string;
  isPassengerPost: boolean;
  hasFreeFood: boolean;
  hasFreeLiving: boolean;
  createdAt?: any;
}

export interface MedicalService {
  id?: string;
  name: string;
  type: string;
  division: string;
  district: string;
  phone?: string;
  address?: string;
  verified?: boolean;
  createdAt?: any;
}

export interface ServicePost {
  id?: string;
  category: string;
  title: string;
  description?: string;
  district: string;
  priceOffer?: string;
  phone?: string;
  verified?: boolean;
  createdAt?: any;
}

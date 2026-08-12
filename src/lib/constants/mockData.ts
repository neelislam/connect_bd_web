import { FeatureCategory, DivisionAvailability } from '@/types';
import { divisions } from './locations';

// Helper to generate divisions with counts (we'll set counts to 0 for now, they can be fetched live)
const generateDivisions = (counts: Record<string, number>): DivisionAvailability[] => {
  return divisions.map(d => ({
    divisionName: d,
    count: counts[d] || 0,
  }));
};

export const mockCategories: FeatureCategory[] = [
  {
    id: 'travel',
    title: 'Travel',
    subCategories: [
      {
        id: 'travel_go',
        title: 'Want to go',
        divisions: generateDivisions({ Dhaka: 20, Sylhet: 5 }),
      },
      {
        id: 'travel_take',
        title: 'Will take you',
        divisions: generateDivisions({ Dhaka: 10, Chittagong: 8 }),
      },
    ],
  },
  {
    id: 'medical',
    title: 'Medical',
    subCategories: [
      {
        id: 'med_doctor',
        title: 'I want Doctor',
        divisions: generateDivisions({ Dhaka: 45, Sylhet: 12 }),
      },
      {
        id: 'med_ambulance',
        title: 'Ambulance',
        divisions: generateDivisions({ Dhaka: 15, Khulna: 4 }),
      },
      {
        id: 'med_pharmacy',
        title: 'Pharmacy',
        divisions: generateDivisions({ Dhaka: 100, Rajshahi: 20 }),
      },
      {
        id: 'med_blood',
        title: 'Blood Bank',
        divisions: generateDivisions({ Dhaka: 80, Chittagong: 30 }),
      },
    ],
  },
  {
    id: 'marketplace',
    title: 'Buy / Sell',
    subCategories: [
      {
        id: 'buy',
        title: 'I want to Buy',
        divisions: generateDivisions({ Dhaka: 500, Chittagong: 200 }),
      },
      {
        id: 'sell',
        title: 'I want to Sell',
        divisions: generateDivisions({ Dhaka: 300, Khulna: 50 }),
      },
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    subCategories: [
      {
        id: 'eco_books',
        title: 'Books',
        divisions: generateDivisions({ Dhaka: 50 }),
      },
      {
        id: 'eco_bakery',
        title: 'Bakery',
        divisions: generateDivisions({ Dhaka: 30, Sylhet: 10 }),
      },
      {
        id: 'eco_food',
        title: 'Food',
        divisions: generateDivisions({ Dhaka: 500, Chittagong: 100 }),
      },
      {
        id: 'eco_electronics',
        title: 'Electronics',
        divisions: generateDivisions({ Dhaka: 150 }),
      },
      {
        id: 'eco_fashion',
        title: 'Fashion',
        divisions: generateDivisions({ Dhaka: 250 }),
      },
    ],
  },
  {
    id: 'service',
    title: 'Service',
    subCategories: [
      { id: 'garage', title: 'Garage / Parking Lot', divisions: generateDivisions({ Dhaka: 5 }) },
      { id: 'car_rent', title: 'Car Rent', divisions: generateDivisions({ Dhaka: 12 }) },
      { id: 'bike_rent', title: 'Bike Rent', divisions: generateDivisions({ Dhaka: 8 }) },
      { id: 'airbnb', title: 'Airbnb / Room Rent', divisions: generateDivisions({ Sylhet: 15 }) },
      { id: 'mechanic_bike', title: 'Mechanic (Bike)', divisions: generateDivisions({ Dhaka: 20 }) },
      { id: 'mechanic_car', title: 'Mechanic (Car)', divisions: generateDivisions({ Dhaka: 25 }) },
      { id: 'mechanic_cng', title: 'Mechanic (CNG)', divisions: generateDivisions({ Dhaka: 10 }) },
      { id: 'mechanic_truck_bus', title: 'Mechanic (Truck/Bus)', divisions: generateDivisions({ Dhaka: 5 }) },
      { id: 'mechanic_electronics', title: 'Electronics Mechanics', divisions: generateDivisions({ Dhaka: 30 }) },
      { id: 'mechanic_stove', title: 'Stove Mechanics', divisions: generateDivisions({ Dhaka: 15 }) },
      { id: 'food_restaurant', title: 'Food / Restaurant', divisions: generateDivisions({ Dhaka: 50 }) },
      { id: 'mobile_medical', title: 'Mobile Medical Service', divisions: generateDivisions({ Dhaka: 5 }) },
    ],
  },
];

export const getCategory = (id: string) => mockCategories.find(c => c.id === id)!;
export const getSubCategory = (categoryId: string, subId: string) => {
  const cat = getCategory(categoryId);
  return cat.subCategories.find(sc => sc.id === subId)!;
};
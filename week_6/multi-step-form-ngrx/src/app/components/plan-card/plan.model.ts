export interface Plan {
  icon: string;
  name: string;
  price: {
    monthly: string;
    yearly: string;
  };
}

export type rate = 'monthly' | 'yearly';

export interface selectedPackage {
  name: string;
  price: string;
}

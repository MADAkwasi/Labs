export interface AddOnItem {
  name: string;
  description: string;
  price: {
    monthly: string;
    yearly: string;
  };
}

export type rate = 'monthly' | 'yearly';

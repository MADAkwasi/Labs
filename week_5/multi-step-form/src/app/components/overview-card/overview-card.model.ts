export interface SubscriptionOverview {
  plan: {
    name: string;
    rate: rate;
    price: string;
  };
  addOns: {
    name: string;
    price: string;
  }[];
}

type rate = 'monthly' | 'yearly';

import { Review } from '@/modules/comments/domain/Comment';

export interface Restaurant {
  _id: string;
  name: string;
  description: string;
  image: string;
  address: string;
  phone: string;
  avgRating: number;
  reviews: Review[];
  isFavorite?: boolean;
}

export type RestaurantDetail = Restaurant & {};

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
  latlng: {
    lat: number;
    long: number;
  };
  owner: {
    name: string;
  };
}

export interface RestaurantCreate {
  name: string;
  address: string;
  description: string;
  file: File;
  latLng: {
    lat: number;
    lng: number;
  };
}

export type RestaurantDetail = Restaurant & {};

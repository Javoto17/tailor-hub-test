import { Restaurant } from './Restaurant';

interface GetRestaurantsParams {
  page: number;
  limit: number;
}

export interface RestaurantRepository {
  getRestaurantsPagination: (params: GetRestaurantsParams) => Promise<{
    page: number;
    limit: number;
    total: number;
    results: Array<Restaurant>;
    nextCursor: number | null;
  }>;
  getRestaurants: (params: GetRestaurantsParams) => Promise<Array<Restaurant>>;
}

import { Restaurant, RestaurantDetail } from './Restaurant';

interface GetRestaurantsParams {
  page: number;
  limit: number;
}

export interface RestaurantRepository {
  getRestaurantById: (id: string) => Promise<RestaurantDetail>;
  createRestaurant: (restaurant: FormData) => Promise<Restaurant>;
  getRestaurantsPagination: (params: GetRestaurantsParams) => Promise<{
    page: number;
    limit: number;
    total: number;
    results: Array<Restaurant>;
    nextCursor: number | null;
  }>;
  getRestaurants: (params: GetRestaurantsParams) => Promise<Array<Restaurant>>;
}

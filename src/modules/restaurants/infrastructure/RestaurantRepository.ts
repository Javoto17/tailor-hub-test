import { ClientRepository } from '@/modules/client/domain/ClientRepository';
import { RestaurantRepository } from '../domain/RestaurantRepository';
import { Restaurant } from '../domain/Restaurant';

import { StorageRepository } from '../../storage/domain/StorageRepository';

interface GetRestaurantsResponse {
  restaurantList: Restaurant[];
  total: number;
}

export function generateRestaurantsRepository(
  clientRepository: ClientRepository,
  storageRepository: StorageRepository
): RestaurantRepository {
  const API_URL = process.env.API_URL;

  return {
    getRestaurants: async (): Promise<Restaurant[]> => {
      try {
        const data = await clientRepository.get<GetRestaurantsResponse>(
          API_URL + `restaurant/list`
        );

        return data?.restaurantList;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  };
}

import { ClientRepository } from '@/modules/client/domain/ClientRepository';
import { RestaurantRepository } from '../domain/RestaurantRepository';
import { Restaurant } from '../domain/Restaurant';

const API_URL = process.env.API_URL;

interface GetRestaurantsResponse {
  restaurantList: Restaurant[];
  total: number;
}

export const generateRestaurantsRepository = (
  clientRepository: ClientRepository
): RestaurantRepository => {
  const getTotalPagesByLimit = (totalItems: number, limit: number) => {
    return Math.ceil(totalItems / limit);
  };

  return {
    getRestaurants: async (
      params = {
        page: 1,
        limit: 10,
      }
    ) => {
      try {
        const { data } = await clientRepository.get<GetRestaurantsResponse>(
          API_URL +
            `restaurant/list?page=${params?.page}&limit=${params?.limit}`
        );

        return data.restaurantList;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    getRestaurantsPagination: async (
      params = {
        page: 1,
        limit: 10,
      }
    ) => {
      const { data } = await clientRepository.get<GetRestaurantsResponse>(
        API_URL + `restaurant/list?page=${params?.page}&limit=${params?.limit}`
      );

      return {
        page: params?.page,
        limit: params?.limit,
        totalPages: getTotalPagesByLimit(data?.total, params?.limit),
        nextCursor:
          params?.page < getTotalPagesByLimit(data?.total, params?.limit)
            ? params?.page + 1
            : null,
        total: data.total,
        results: data.restaurantList,
      };
    },
  };
};

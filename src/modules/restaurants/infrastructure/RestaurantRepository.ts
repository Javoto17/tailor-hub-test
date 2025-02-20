import { ClientRepository } from '@/modules/client/domain/ClientRepository';
import { RestaurantRepository } from '../domain/RestaurantRepository';
import { Restaurant, RestaurantDetail } from '../domain/Restaurant';

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

        console.log(data);
        return data.restaurantList;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getRestaurantsPagination: async (
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
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getRestaurantById: async (id: string) => {
      const { data } = await clientRepository.get<RestaurantDetail>(
        API_URL + `restaurant/detail/${id}`
      );

      return data;
    },
    createRestaurant: async (restaurant) => {
      try {
        const { data } = await clientRepository.post<Restaurant>(
          API_URL + `restaurant/create`,
          restaurant,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateRestaurant: async (id: string, restaurant: FormData) => {
      try {
        const { data } = await clientRepository.put<Restaurant>(
          API_URL + `restaurant/${id}`,
          restaurant,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    deleteRestaurant: async (id: string) => {
      const { data } = await clientRepository.remove<Restaurant>(
        API_URL + `restaurant/${id}`
      );

      return data;
    },
  };
};

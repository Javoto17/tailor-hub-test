import { RestaurantRepository } from '../../domain/RestaurantRepository';

export const getRestaurantsPagination =
  (restaurantsRepository: RestaurantRepository) => async (page: number) => {
    const data = await restaurantsRepository.getRestaurantsPagination({
      page,
      limit: 10,
    });

    return data;
  };

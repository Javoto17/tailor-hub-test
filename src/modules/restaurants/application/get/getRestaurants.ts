import { RestaurantRepository } from '../../domain/RestaurantRepository';

export const getRestaurants =
  (restaurantsRepository: RestaurantRepository) =>
  async (page: number = 1) => {
    const data = await restaurantsRepository.getRestaurants({
      page,
      limit: 500,
    });

    return data;
  };

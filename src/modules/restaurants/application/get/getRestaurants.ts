import { RestaurantRepository } from '../../domain/RestaurantRepository';

export const getRestaurants =
  (restaurantsRepository: RestaurantRepository) => async () => {
    const data = await restaurantsRepository.getRestaurants();

    return data;
  };

import { RestaurantRepository } from '../../domain/RestaurantRepository';

export const getRestaurantDetail =
  (restaurantsRepository: RestaurantRepository) => async (id: string) => {
    const data = await restaurantsRepository.getRestaurantById(id);

    if (!data) {
      throw new Error('Restaurant not found');
    }

    return data;
  };

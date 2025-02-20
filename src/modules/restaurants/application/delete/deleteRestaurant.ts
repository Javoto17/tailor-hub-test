import { RestaurantRepository } from '@/modules/restaurants/domain/RestaurantRepository';

export const deleteRestaurant =
  (restaurantsRepository: RestaurantRepository) => async (id: string) => {
    return await restaurantsRepository.deleteRestaurant(id);
  };

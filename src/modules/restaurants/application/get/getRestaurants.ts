import { Restaurant } from '../../domain/Restaurant';
import { RestaurantRepository } from '../../domain/RestaurantRepository';

export const getRestaurants =
  (restaurantsRepository: RestaurantRepository) =>
  async (page: number = 1) => {
    const data = await restaurantsRepository.getRestaurants({
      page,
      limit: 10,
    });

    return data;
  };

export const getAllRestaurants =
  (restaurantsRepository: RestaurantRepository) => async () => {
    let allRestaurants: Restaurant[] = [];
    let currentPage = 1;
    let hasMoreData = true;

    while (hasMoreData) {
      const data = await restaurantsRepository.getRestaurants({
        page: currentPage,
        limit: 10,
      });

      if (data.length === 0) {
        hasMoreData = false;
      } else {
        allRestaurants = [...allRestaurants, ...data];
        currentPage++;
      }
    }

    return allRestaurants;
  };

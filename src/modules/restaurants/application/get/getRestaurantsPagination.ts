import { RestaurantRepository } from '../../domain/RestaurantRepository';

export const getRestaurantsPagination =
  (restaurantsRepository: RestaurantRepository) => async (page: number) => {
    const data = await restaurantsRepository.getRestaurantsPagination({
      page,
      limit: 10,
    });

    const formattedData = data?.results.map((restaurant) => ({
      id: restaurant._id,
      name: restaurant.name,
      address: restaurant.address,
      image: restaurant.image,
      rating: restaurant.avgRating,
      totalReviews: restaurant.reviews.length,
    }));

    return {
      ...data,
      results: formattedData,
    };
  };

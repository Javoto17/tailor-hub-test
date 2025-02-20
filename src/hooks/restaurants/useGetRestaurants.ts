import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import { getAllRestaurants } from '@/modules/restaurants/application/get/getRestaurants';
import { Restaurant } from '@/modules/restaurants/domain/Restaurant';
import { generateRestaurantsRepository } from '@/modules/restaurants/infrastructure/RestaurantRepository';
import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';
import { useRestaurantsStore } from '@/stores/restaurants/restaurantsStore';
import { useQuery } from '@tanstack/react-query';

const storageRepository = generateStorageRepository();
const clientRepository = generateClientRepository(storageRepository);
const restaurantsRepository = generateRestaurantsRepository(clientRepository);

export function useGetRestaurants() {
  const { restaurants } = useRestaurantsStore();
  const { data, isLoading, isSuccess, isError, refetch } = useQuery({
    queryKey: ['restaurants'],
    queryFn: async () => {
      return await getAllRestaurants(restaurantsRepository)();
    },
    select: (allRestaurants) => {
      return allRestaurants.map((restaurant) => ({
        ...restaurant,
        isFavorite: restaurants.some(
          (favorite: Restaurant) => favorite._id === restaurant._id
        ),
      }));
    },
  });

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    refetch,
  };
}

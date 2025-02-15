import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import { getRestaurants } from '@/modules/restaurants/application/get/getRestaurants';
import { generateRestaurantsRepository } from '@/modules/restaurants/infrastructure/RestaurantRepository';
import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';
import { useQuery } from '@tanstack/react-query';

const clientRepository = generateClientRepository();
const storageRepository = generateStorageRepository();
const restaurantsRepository = generateRestaurantsRepository(
  clientRepository,
  storageRepository
);

export function useGetRestaurants() {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['restaurants'],
    queryFn: async () => {
      return await getRestaurants(restaurantsRepository)();
    },
  });

  return {
    data,
    isLoading,
    isSuccess,
    isError,
  };
}

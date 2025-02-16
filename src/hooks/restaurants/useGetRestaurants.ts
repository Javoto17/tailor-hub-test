import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import { getRestaurants } from '@/modules/restaurants/application/get/getRestaurants';
import { generateRestaurantsRepository } from '@/modules/restaurants/infrastructure/RestaurantRepository';
import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';
import { useQuery } from '@tanstack/react-query';

const storageRepository = generateStorageRepository();
const clientRepository = generateClientRepository(storageRepository);
const restaurantsRepository = generateRestaurantsRepository(clientRepository);

export function useGetRestaurants(enabled = false) {
  const { data, isLoading, isSuccess, isError, refetch } = useQuery({
    queryKey: ['restaurants'],
    queryFn: async () => {
      return await getRestaurants(restaurantsRepository)();
    },
    enabled,
  });

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    refetch,
  };
}

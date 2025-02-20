import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import { getRestaurantDetail } from '@/modules/restaurants/application/get/getRestaurantDetail';
import { generateRestaurantsRepository } from '@/modules/restaurants/infrastructure/RestaurantRepository';
import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';
import { useRestaurantsStore } from '@/stores/restaurants/restaurantsStore';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useAuth } from '../auth/useAuth';

const storageRepository = generateStorageRepository();
const clientRepository = generateClientRepository(storageRepository);
const restaurantsRepository = generateRestaurantsRepository(clientRepository);

export function useGetRestaurantDetail(id: string) {
  const { user } = useAuth();

  const { data, isLoading, isSuccess, isError, refetch } = useQuery({
    queryKey: ['restaurant-detail', id],
    queryFn: async () => {
      return await getRestaurantDetail(restaurantsRepository)(id);
    },
  });

  const { restaurants } = useRestaurantsStore();

  const isFavorite = useMemo(() => {
    return restaurants.some((restaurant) => restaurant._id === id);
  }, [restaurants, id]);

  const iAmOwner = useMemo(() => {
    return data?.owner?.name === user?.name;
  }, [data, user]);

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    refetch,
    isFavorite,
    iAmOwner,
  };
}

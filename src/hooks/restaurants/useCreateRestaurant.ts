import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import {
  createRestaurant,
  CreateRestaurantParams,
} from '@/modules/restaurants/application/create/createRestaurant';
import { generateRestaurantsRepository } from '@/modules/restaurants/infrastructure/RestaurantRepository';
import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';

import { useMutation } from '@tanstack/react-query';

const storageRepository = generateStorageRepository();
const clientRepository = generateClientRepository(storageRepository);

const restaurantRepository = generateRestaurantsRepository(clientRepository);

export function useCreateRestaurant() {
  const createRestaurantMutation = useMutation({
    mutationFn: async (formData: CreateRestaurantParams) => {
      return await createRestaurant(restaurantRepository)(formData);
    },
  });

  return {
    createRestaurantUser: createRestaurantMutation.mutateAsync,
    isCreatingRestaurant: createRestaurantMutation.isPending,
    isCreatingRestaurantError: createRestaurantMutation.isError,
    isCreatingRestaurantSuccess: createRestaurantMutation.isSuccess,
  };
}

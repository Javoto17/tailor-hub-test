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

export function useManageRestaurant() {
  const createRestaurantMutation = useMutation({
    mutationFn: async (formData: CreateRestaurantParams) => {
      return await createRestaurant(restaurantRepository)(formData);
    },
  });

  //   const updateRestaurantMutation = useMutation({
  //     mutationFn: ({ id, name, location, cuisine }: updateRestaurantParams) =>
  //       updateRestaurant(restaurantRepository)(id, name, location, cuisine),
  //     onSuccess: () => {
  //       // Handle success (e.g., refetch restaurants)
  //     },
  //   });

  //   const deleteRestaurantMutation = useMutation({
  //     mutationFn: (id: string) => deleteRestaurant(restaurantRepository)(id),
  //     onSuccess: () => {
  //       // Handle success (e.g., refetch restaurants)
  //     },
  //   });

  return {
    createRestaurantUser: createRestaurantMutation.mutateAsync,
  };
}

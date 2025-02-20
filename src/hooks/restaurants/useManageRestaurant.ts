import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import {
  createRestaurant,
  CreateRestaurantParams,
} from '@/modules/restaurants/application/create/createRestaurant';
import { deleteRestaurant } from '@/modules/restaurants/application/delete/deleteRestaurant';
import { updateRestaurant } from '@/modules/restaurants/application/update/updateRestaurant';
import { UpdateRestaurantParams } from '@/modules/restaurants/application/update/updateRestaurant';
import { generateRestaurantsRepository } from '@/modules/restaurants/infrastructure/RestaurantRepository';
import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';

import { useMutation, useQueryClient } from '@tanstack/react-query';

const storageRepository = generateStorageRepository();
const clientRepository = generateClientRepository(storageRepository);

const restaurantRepository = generateRestaurantsRepository(clientRepository);

export function useManageRestaurant() {
  const queryClient = useQueryClient();

  const createRestaurantMutation = useMutation({
    mutationFn: async (formData: CreateRestaurantParams) => {
      return await createRestaurant(restaurantRepository)(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    },
  });

  const updateRestaurantMutation = useMutation({
    mutationFn: async ({
      id,
      formData,
    }: {
      id: string;
      formData: UpdateRestaurantParams;
    }) => {
      return await updateRestaurant(restaurantRepository)(id, formData);
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      queryClient.invalidateQueries({ queryKey: ['restaurant-detail', id] });
    },
  });

  const deleteRestaurantMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteRestaurant(restaurantRepository)(id);
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      queryClient.invalidateQueries({ queryKey: ['restaurant-detail', id] });
    },
  });

  return {
    create: {
      mutate: createRestaurantMutation.mutateAsync,
      isPending: createRestaurantMutation.isPending,
      isError: createRestaurantMutation.isError,
      isSuccess: createRestaurantMutation.isSuccess,
      isLoading: createRestaurantMutation.isIdle,
    },
    update: {
      mutate: updateRestaurantMutation.mutateAsync,
      isPending: updateRestaurantMutation.isPending,
      isError: updateRestaurantMutation.isError,
      isSuccess: updateRestaurantMutation.isSuccess,
      isLoading: updateRestaurantMutation.isIdle,
    },
    delete: {
      mutate: deleteRestaurantMutation.mutateAsync,
      isPending: deleteRestaurantMutation.isPending,
      isError: deleteRestaurantMutation.isError,
      isSuccess: deleteRestaurantMutation.isSuccess,
      isLoading: deleteRestaurantMutation.isIdle,
    },
  };
}

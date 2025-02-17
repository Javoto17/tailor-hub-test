import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Restaurant } from '@/modules/restaurants/domain/Restaurant';
import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';

interface RestaurantsStoreState {
  restaurants: Restaurant[];
  addRestaurant(payload: Restaurant): void;
  removeRestaurant(id: string): void;
}

const storageRepository = generateStorageRepository();

const asyncStoragePersistConfig = {
  setItem: async (key: string, value: string) =>
    await storageRepository.set(key, value),
  getItem: async (key: string) => await storageRepository.get(key),
  removeItem: async (key: string) => await storageRepository.delete(key),
};

export const useRestaurantsStore = create<RestaurantsStoreState>()(
  persist(
    (set) => ({
      restaurants: [],
      addRestaurant: (payload: Restaurant) =>
        set((state) => {
          const newRestaurants = [
            ...state.restaurants,
            {
              ...payload,
              isFavorite: true,
            },
          ];
          return { restaurants: newRestaurants };
        }),
      removeRestaurant: (id: string) =>
        set((state) => {
          const newRestaurants = state.restaurants.filter(
            (restaurant) => restaurant._id !== id
          );
          return { restaurants: newRestaurants };
        }),
    }),
    {
      name: 'restaurants-storage',
      storage: createJSONStorage(() => asyncStoragePersistConfig),
    }
  )
);

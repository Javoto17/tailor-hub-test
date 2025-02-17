import { Restaurant } from '@/modules/restaurants/domain/Restaurant';
import { useRestaurantsStore } from '@/stores/restaurants/restaurantsStore';
import { useQueryClient } from '@tanstack/react-query';

export function useFavoritesRestaurant() {
  const queryClient = useQueryClient();

  const { restaurants, addRestaurant, removeRestaurant } =
    useRestaurantsStore();

  const addFavoriteRestaurant = (restaurant: Restaurant) => {
    addRestaurant(restaurant);
    queryClient.invalidateQueries({ queryKey: ['restaurants'] });
  };

  const removeFavoriteRestaurant = (id: string) => {
    removeRestaurant(id);
    queryClient.invalidateQueries({ queryKey: ['restaurants'] });
  };

  return {
    favorites: restaurants,
    addFavoriteRestaurant,
    removeFavoriteRestaurant,
  };
}

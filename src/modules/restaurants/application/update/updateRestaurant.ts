import { RestaurantRepository } from '@/modules/restaurants/domain/RestaurantRepository';

export interface UpdateRestaurantParams {
  name: string;
  address: string;
  description: string;
  image: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export const updateRestaurant =
  (restaurantsRepository: RestaurantRepository) =>
  async (id: string, data: UpdateRestaurantParams) => {
    const { name, address, description, image, location } = data;

    const formData = new FormData();

    // Server have to parse the latlng as a json object
    formData.append('name', name);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('latlng[lat]', location.latitude.toString());
    formData.append('latlng[lng]', location.longitude.toString());
    formData.append('image', image);

    return await restaurantsRepository.updateRestaurant(id, formData);
  };

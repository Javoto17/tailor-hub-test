import { RestaurantRepository } from '@/modules/restaurants/domain/RestaurantRepository';

export interface CreateRestaurantParams {
  name: string;
  address: string;
  description: string;
  image: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export const createRestaurant =
  (restaurantsRepository: RestaurantRepository) =>
  async (restaurant: CreateRestaurantParams) => {
    const { name, address, description, image, location } = restaurant;

    const formData = new FormData();

    const latlng = {
      lat: Number(location?.latitude),
      lng: Number(location?.longitude),
    };

    formData.append('name', name);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('image', {
      name: `${name}.jpg`,
      type: 'image/jpeg',
      uri: image,
    });
    formData.append('latlng[lat]', latlng.lat.toString());
    formData.append('latlng[lng]', latlng.lng.toString());

    await restaurantsRepository.createRestaurant(formData);
  };

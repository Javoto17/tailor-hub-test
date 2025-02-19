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

    // Server have to parse the latlng as a json object
    formData.append('name', name);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('image', {
      name: `${name}.jpg`,
      type: 'image/jpeg',
      uri: image,
    });
    formData.append(
      'latlng',
      JSON.stringify({ lat: location.latitude, lng: location.longitude })
    );

    // formData.append('latlng[lat]', location.latitude.toString());
    // formData.append('latlng[lng]', location.longitude.toString());

    await restaurantsRepository.createRestaurant(formData);
  };

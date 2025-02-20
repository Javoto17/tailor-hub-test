import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import RestaurantsMap from '../RestaurantsMap';
import { useUserLocation } from '@/hooks/user/useUserLocation';
import { useFavoritesRestaurant } from '@/hooks/user/useFavoritesRestaurant';
import { Restaurant } from '@/modules/restaurants/domain/Restaurant';

// Mock the hooks and MapView
jest.mock('@/hooks/user/useUserLocation');
jest.mock('@/hooks/user/useFavoritesRestaurant');
jest.mock('react-native-maps', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: View,
    Marker: View,
  };
});

const mockRestaurants: Restaurant[] = [
  {
    _id: '1',
    name: 'Restaurant 1',
    address: '123 Street',
    image: 'https://test.com/image1.jpg',
    avgRating: 4.5,
    reviews: [],
    isFavorite: false,
    latlng: { lat: 1.234, long: 4.567 },
    description: 'A great place to eat',
    phone: '123-456-7890',
    owner: {
      name: 'Owner Name',
    },
  },
  {
    _id: '2',
    name: 'Restaurant 2',
    address: '456 Avenue',
    image: 'https://test.com/image2.jpg',
    avgRating: 4.0,
    reviews: [],
    isFavorite: true,
    latlng: { lat: 2.345, long: 5.678 },
    description: 'Another great place',
    phone: '987-654-3210',
    owner: {
      name: 'Another Owner',
    },
  },
];

describe('RestaurantsMap', () => {
  const mockOnPressItem = jest.fn();
  const mockGetCurrentLocation = jest.fn();
  const mockAddFavorite = jest.fn();
  const mockRemoveFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useUserLocation as jest.Mock).mockReturnValue({
      getCurrentLocation: mockGetCurrentLocation.mockResolvedValue({
        latitude: 0,
        longitude: 0,
      }),
    });
    (useFavoritesRestaurant as jest.Mock).mockReturnValue({
      addFavoriteRestaurant: mockAddFavorite,
      removeFavoriteRestaurant: mockRemoveFavorite,
    });
  });

  it('renders map with restaurants', () => {
    render(
      <RestaurantsMap data={mockRestaurants} onPressItem={mockOnPressItem} />
    );

    expect(screen.getByText('Restaurant 1')).toBeTruthy();
    expect(screen.getByText('Restaurant 2')).toBeTruthy();
  });

  it('calls onPressItem when a restaurant card is pressed', async () => {
    render(
      <RestaurantsMap data={mockRestaurants} onPressItem={mockOnPressItem} />
    );

    fireEvent.press(screen.getByTestId(mockRestaurants[0]._id));

    await waitFor(() => {
      expect(mockOnPressItem).toHaveBeenCalledWith(mockRestaurants[0]._id);
    });
  });

  it('handles favorite toggling correctly', async () => {
    render(
      <RestaurantsMap data={mockRestaurants} onPressItem={mockOnPressItem} />
    );

    // Test removing favorite
    fireEvent.press(screen.getAllByTestId('heart-icon')[1]); // Second restaurant is favorite

    await waitFor(() => {
      expect(mockRemoveFavorite).toHaveBeenCalledWith(mockRestaurants[1]._id);
    });

    // Test adding favorite
    fireEvent.press(screen.getAllByTestId('heart-icon')[0]); // First restaurant is not favorite

    await waitFor(() => {
      expect(mockAddFavorite).toHaveBeenCalledWith(mockRestaurants[0]);
    });
  });

  it('gets user location on mount', () => {
    render(
      <RestaurantsMap data={mockRestaurants} onPressItem={mockOnPressItem} />
    );

    expect(mockGetCurrentLocation).toHaveBeenCalled();
  });
});

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import RestaurantsList from '../RestaurantsList';
import { useFavoritesRestaurant } from '@/hooks/user/useFavoritesRestaurant';
import { Restaurant } from '@/modules/restaurants/domain/Restaurant';

// Mock the hooks
jest.mock('@/hooks/user/useFavoritesRestaurant');

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

describe('RestaurantsList', () => {
  const mockOnPressItem = jest.fn();
  const mockOnEndReached = jest.fn();
  const mockAddFavorite = jest.fn();
  const mockRemoveFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useFavoritesRestaurant as jest.Mock).mockReturnValue({
      addFavoriteRestaurant: mockAddFavorite,
      removeFavoriteRestaurant: mockRemoveFavorite,
    });
  });

  it('renders list of restaurants', () => {
    render(
      <RestaurantsList
        data={mockRestaurants}
        onPressItem={mockOnPressItem}
        onEndReached={mockOnEndReached}
      />
    );

    expect(screen.getByText('Restaurant 1')).toBeTruthy();
    expect(screen.getByText('Restaurant 2')).toBeTruthy();
  });

  it('shows empty state message when no data', () => {
    const emptyText = 'No restaurants found';

    render(
      <RestaurantsList
        data={[]}
        onPressItem={mockOnPressItem}
        emptyText={emptyText}
      />
    );

    expect(screen.getByText(emptyText)).toBeOnTheScreen();
  });

  it('calls onPressItem when a restaurant is pressed', () => {
    render(
      <RestaurantsList data={mockRestaurants} onPressItem={mockOnPressItem} />
    );

    fireEvent.press(screen.getByTestId(mockRestaurants[0]._id));
    expect(mockOnPressItem).toHaveBeenCalledWith(mockRestaurants[0]._id);
  });

  it('handles favorite toggling correctly', () => {
    render(
      <RestaurantsList data={mockRestaurants} onPressItem={mockOnPressItem} />
    );

    // Test removing favorite
    fireEvent.press(screen.getAllByTestId('heart-icon')[1]); // Second restaurant is favorite
    expect(mockRemoveFavorite).toHaveBeenCalledWith(mockRestaurants[1]._id);

    // Test adding favorite
    fireEvent.press(screen.getAllByTestId('heart-icon')[0]); // First restaurant is not favorite
    expect(mockAddFavorite).toHaveBeenCalledWith(mockRestaurants[0]);
  });

  it('shows loading spinner when isLoading is true', () => {
    render(
      <RestaurantsList
        data={mockRestaurants}
        isLoading={true}
        onPressItem={mockOnPressItem}
      />
    );

    expect(screen.getByTestId('spinner')).toBeTruthy();
  });
});

import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import RestaurantCard from '../RestaurantCard';

const mockRestaurant = {
  _id: '1',
  name: 'Test Restaurant',
  address: '123 Test Street',
  image: 'https://test.com/image.jpg',
  avgRating: 4.5,
  reviews: [],
  isFavorite: false,
  latlng: {
    lat: 0,
    long: 0,
  },
  description: 'Test Description',
  phone: '1234567890',
  owner: {
    name: 'Test Owner',
  },
};

describe('RestaurantCard', () => {
  const mockOnPress = jest.fn();
  const mockOnPressFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders restaurant information correctly', () => {
    render(
      <RestaurantCard
        restaurant={mockRestaurant}
        onPress={mockOnPress}
        onPressFavorite={mockOnPressFavorite}
      />
    );

    expect(screen.getByText(mockRestaurant.name)).toBeTruthy();
    expect(screen.getByText(mockRestaurant.address)).toBeTruthy();
    expect(screen.getByText('(0 reviews)')).toBeTruthy();
  });

  it('calls onPress when card is pressed', async () => {
    render(
      <RestaurantCard
        restaurant={mockRestaurant}
        onPress={mockOnPress}
        onPressFavorite={mockOnPressFavorite}
      />
    );

    fireEvent.press(screen.getByTestId(mockRestaurant._id));

    await waitFor(() => {
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
  });

  it('calls onPressFavorite when heart icon is pressed', async () => {
    render(
      <RestaurantCard
        restaurant={mockRestaurant}
        onPress={mockOnPress}
        onPressFavorite={mockOnPressFavorite}
      />
    );

    fireEvent.press(screen.getByTestId('heart-icon'));

    await waitFor(() => {
      expect(mockOnPressFavorite).toHaveBeenCalledTimes(1);
    });
  });

  it('renders with map variant correctly', () => {
    render(
      <RestaurantCard
        restaurant={mockRestaurant}
        onPress={mockOnPress}
        variant="map"
      />
    );

    // You might want to check specific styles or classes here
    // This is a basic check that the component renders
    expect(screen.getByTestId(mockRestaurant._id)).toBeTruthy();
  });
});

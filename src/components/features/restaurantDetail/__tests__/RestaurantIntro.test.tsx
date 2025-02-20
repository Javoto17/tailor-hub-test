import React from 'react';
import { Linking } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import RestaurantIntro from '../RestaurantIntro';

const renderWithNavigation = (component: React.ReactNode) => {
  return render(<NavigationContainer>{component}</NavigationContainer>);
};

describe('RestaurantIntro', () => {
  it('renders correctly with given props', () => {
    const { getByText } = renderWithNavigation(
      <RestaurantIntro
        image="https://example.com/image.jpg"
        title="Test Restaurant"
        address="123 Test St"
        bio="A great place to eat."
      />
    );

    expect(getByText('Test Restaurant')).toBeOnTheScreen();
    expect(getByText('123 Test St')).toBeOnTheScreen();
    expect(getByText('A great place to eat.')).toBeOnTheScreen();
  });

  it('renders correctly without optional props', async () => {
    const { getByText } = renderWithNavigation(
      <RestaurantIntro
        image="https://example.com/image.jpg"
        title="Test Restaurant"
      />
    );

    await waitFor(() => {
      expect(getByText('Test Restaurant')).toBeOnTheScreen();
      expect(() => getByText('123 Test St')).toThrow(); // Address should not be rendered
      expect(() => getByText('A great place to eat.')).toThrow(); // Bio should not be rendered
    });
  });

  it('opens the address link when pressed', async () => {
    const { getByText } = renderWithNavigation(
      <RestaurantIntro
        image="https://example.com/image.jpg"
        title="Test Restaurant"
        address="123 Test St"
      />
    );

    const addressText = getByText('123 Test St');

    fireEvent.press(addressText);

    await waitFor(() => {
      expect(Linking.openURL).toHaveBeenCalledWith(
        expect.stringContaining('123 Test St')
      );
    });
  });
});

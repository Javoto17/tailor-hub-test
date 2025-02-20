import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import RestaurantHeader from '../RestaurantHeader';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';

describe('RestaurantHeader', () => {
  let navigation: Partial<NativeStackNavigationProp<any>>;

  beforeEach(() => {
    navigation = {
      canGoBack: jest.fn(() => true),
      goBack: jest.fn(),
      navigate: jest.fn(),
      setOptions: jest.fn(),
      dispatch: jest.fn(),
      // Add any other necessary methods here
    };
  });

  const mockOptions = {
    headerLeft: ({ canGoBack }: { canGoBack?: boolean }) =>
      canGoBack ? (
        <View>
          <Text>Back</Text>
        </View>
      ) : null,
    headerRight: () => (
      <View>
        <Text>Menu</Text>
      </View>
    ),
  };

  it('renders header buttons when provided', () => {
    const { getByText } = render(
      <RestaurantHeader
        navigation={navigation as NativeStackNavigationProp<any>}
        options={mockOptions}
        route={{ key: 'test' } as any}
      />
    );

    expect(getByText('Back')).toBeOnTheScreen();
    expect(getByText('Menu')).toBeOnTheScreen();
  });

  it('renders header buttons when provided and pressed', () => {
    const mockOptions = {
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Text>Back</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation?.navigate?.('Menu')}>
          <Text>Menu</Text>
        </TouchableOpacity>
      ),
    };

    const { getByText } = render(
      <RestaurantHeader
        navigation={navigation as NativeStackNavigationProp<any>}
        options={mockOptions}
        route={{ key: 'test' } as any}
      />
    );

    fireEvent.press(getByText('Back'));
    expect(navigation?.goBack).toHaveBeenCalled();

    fireEvent.press(getByText('Menu'));
    expect(navigation?.navigate).toHaveBeenCalledWith('Menu');
  });
});

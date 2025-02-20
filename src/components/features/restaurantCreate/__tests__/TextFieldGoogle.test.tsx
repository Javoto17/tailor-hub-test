import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TextFieldGoogle from '../TextFieldGoogle';

// Mock fetch
global.fetch = jest.fn();

describe('TextFieldGoogle', () => {
  const mockOnPress = jest.fn();
  const mockOnCancel = jest.fn();

  const mockPredictions = {
    predictions: [
      { place_id: '1', description: 'Location 1' },
      { place_id: '2', description: 'Location 2' },
    ],
  };

  (global.fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockPredictions),
    })
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <TextFieldGoogle
        placeholder="Test Placeholder"
        onPress={mockOnPress}
        onCancel={mockOnCancel}
      />
    );

    expect(getByPlaceholderText('Test Placeholder')).toBeOnTheScreen();
  });

  it('shows predictions when typing', async () => {
    const { getByTestId, findByText } = render(
      <TextFieldGoogle
        placeholder="Test Placeholder"
        onPress={mockOnPress}
        onCancel={mockOnCancel}
        testID="text-field-google"
      />
    );

    fireEvent.changeText(getByTestId('text-field-google'), 'test location');

    await waitFor(
      () => {
        expect(findByText('Location 1', undefined)).toBeTruthy();
        expect(findByText('Location 2', undefined)).toBeTruthy();
      },
      {
        timeout: 10000,
      }
    );
  });

  it('calls onPress with selected prediction and location', async () => {
    const mockPlaceDetails = {
      result: {
        geometry: {
          location: {
            lat: 123,
            lng: 456,
          },
        },
      },
    };

    (global.fetch as jest.Mock)
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPredictions),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockPlaceDetails),
        })
      );

    const { getByPlaceholderText, findByText } = render(
      <TextFieldGoogle
        placeholder="Test Placeholder"
        onPress={mockOnPress}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.changeText(
      getByPlaceholderText('Test Placeholder'),
      'test location'
    );

    await waitFor(async () => {
      const prediction = await findByText('Location 1');
      fireEvent.press(prediction);
    });

    await waitFor(() => {
      expect(mockOnPress).toHaveBeenCalledWith(
        { place_id: '1', description: 'Location 1' },
        { latitude: 123, longitude: 456 }
      );
    });
  });

  it('calls onCancel when clearing input', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <TextFieldGoogle
        placeholder="Test Placeholder"
        onPress={mockOnPress}
        onCancel={mockOnCancel}
        value="Initial Value"
      />
    );

    const input = getByPlaceholderText('Test Placeholder');

    fireEvent.changeText(input, 'hola');

    const button = getByTestId('cancel-input');

    fireEvent.press(button);

    await waitFor(() => {
      expect(mockOnCancel).toHaveBeenCalled();
    });
  });
});

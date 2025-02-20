import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RestaurantFormComment from '../RestaurantFormComment';

describe('RestaurantFormComment', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <RestaurantFormComment onSubmit={mockOnSubmit} />
    );

    expect(getByPlaceholderText('Write your comment...')).toBeTruthy();
    expect(getByText('Enviar')).toBeTruthy();
  });

  it('submits form with valid data', async () => {
    const { getByText, getByTestId } = render(
      <RestaurantFormComment onSubmit={mockOnSubmit} />
    );

    // Set rating
    fireEvent.press(getByTestId('rating-4'));

    // Add comment
    fireEvent.changeText(getByTestId('comment-input'), 'Great place!');

    // Submit form
    fireEvent.press(getByText('Enviar'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          comment: 'Great place!',
          rating: 4,
        }),
        undefined
      );
    });
  });

  it('allows rating selection', async () => {
    const { getByTestId } = render(
      <RestaurantFormComment onSubmit={mockOnSubmit} />
    );

    const rating = getByTestId('rating-5');

    fireEvent.press(rating);

    await waitFor(() => {
      expect(rating.props.accessibilityState.selected).toBeTruthy();
    });
  });
});

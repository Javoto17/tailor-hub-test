import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RestaurantComment from '../RestaurantComment';

describe('RestaurantComment', () => {
  const mockComment = {
    _id: '1',
    owner: {
      _id: 'user1',
      name: 'John Doe',
    },
    rating: 4,
    comment: 'Great restaurant!',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders comment correctly', async () => {
    const { getByText } = render(
      <RestaurantComment
        comment={mockComment}
        owner={false}
        onDelete={mockOnDelete}
      />
    );

    await waitFor(() => {
      expect(getByText('John Doe')).toBeOnTheScreen();
      expect(getByText('Great restaurant!')).toBeOnTheScreen();
    });
  });

  it('shows delete button when owner is true', () => {
    const { getByTestId } = render(
      <RestaurantComment
        comment={mockComment}
        owner={true}
        onDelete={mockOnDelete}
      />
    );

    expect(getByTestId('delete-comment-button')).toBeOnTheScreen();
  });

  it('calls onDelete when delete button is pressed', async () => {
    const { getByTestId } = render(
      <RestaurantComment
        comment={mockComment}
        owner={true}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.press(getByTestId('delete-comment-button'));

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith('1');
    });
  });
});

import React from 'react';

import App from '@/App';
import { useGetMovieDetail } from '@/hooks/restaurants/useGetMovieDetail';
import { useGetMoviesPagination } from '@/hooks/restaurants/useGetMoviesPagination';
import { fireEvent, render } from '@testing-library/react-native';

jest.mock('@/hooks/useGetMoviesPagination', () => ({
  useGetMoviesPagination: jest.fn(),
}));

jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default
);

jest.mock('@/hooks/useGetMovieDetail', () => ({
  useGetMovieDetail: jest.fn(),
}));

const mockDetail = {
  id: 1,
  title: 'Inception',
};

describe('MovieListScreen', () => {
  it('Should navigate to movie detail screen when a movie is selected', async () => {
    // Mock hooks
    (useGetMoviesPagination as jest.Mock).mockReturnValue({
      data: [mockDetail],
      isFetching: false,
      isError: false,
    });

    (useGetMovieDetail as jest.Mock).mockReturnValue({
      data: mockDetail,
      isLoading: false,
      isError: false,
    });

    const { getByTestId, getByText } = render(<App />);

    const movieItem = getByTestId(mockDetail?.id.toString());

    fireEvent.press(movieItem);

    expect(getByText(mockDetail?.title)).toBeTruthy();
  });
});

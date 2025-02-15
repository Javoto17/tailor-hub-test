import React from 'react';

import MoviesList from '@/components/features/movies/MoviesList';

import { render } from '@testing-library/react-native';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('Movie list component', () => {
  it('renders the list of items correctly', () => {
    const listMovies = [
      {
        id: 1,
        title: 'The movie',
      },
      {
        id: 2,
        title: 'Broken heart',
      },
    ];

    const { getByText } = render(<MoviesList data={listMovies} />);

    listMovies.forEach((movie) => {
      expect(getByText(movie?.title)).toBeTruthy();
    });
  });
});

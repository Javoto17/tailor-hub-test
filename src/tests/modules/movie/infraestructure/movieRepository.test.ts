import { generateMoviesRepository } from '@/modules/movies/infrastructure/MovieRepository';
import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';

describe('Movies Repository Test Integration', () => {
  const clientRepository = generateClientRepository();
  const storageRepository = generateStorageRepository();
  const moviesRepository = generateMoviesRepository(
    clientRepository,
    storageRepository
  );

  it('Should obtain a list of movies', async () => {
    const data = await moviesRepository.getTrendingMovies();

    expect(data?.length)?.toBeGreaterThan(0);
  });

  it('Gets detail of first item list', async () => {
    const data = await moviesRepository.getTrendingMovies();
    const movieId = data?.[0]?.id;

    const movieDetail = await moviesRepository.getDetailMovie(movieId);

    expect(movieDetail).toBeDefined();
    expect(movieDetail?.id).toEqual(movieId);
  });

  it('Null is returned if movie not exists', async () => {
    const movieDetail = await moviesRepository.getDetailMovie(1234);

    expect(movieDetail).toBeNull();
  });

  it('Should obtain a list of movies by pagination', async () => {
    let page = 1;

    const dataPage1 = await moviesRepository.getTrendingMoviesPagination(page);

    expect(dataPage1?.results?.length).toBeGreaterThan(0);

    page = 2;
    const dataPage2 = await moviesRepository.getTrendingMoviesPagination(page);

    expect(dataPage2?.results?.length).toBeGreaterThan(0);
    expect(dataPage2?.page).toEqual(2);
  });

  it('Set movie favorite', async () => {
    const mockMovie = {
      title: 'Inception',
      id: 1,
    };

    await moviesRepository.saveFavorite(mockMovie);

    const isFavorite = await moviesRepository.getIsFavorite(mockMovie?.id);

    expect(isFavorite).toBeTruthy();
  });

  it('Remove movie favorite', async () => {
    const mockMovie = {
      title: 'Inception',
      id: 1,
    };

    await moviesRepository.removeFavorite(mockMovie?.id);

    const isFavorite = await moviesRepository.getIsFavorite(mockMovie?.id);

    expect(isFavorite).toBeFalsy();
  });
});

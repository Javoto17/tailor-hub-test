import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import { getRestaurantsPagination } from '@/modules/restaurants/application/get/getRestaurantsPagination';
import { generateRestaurantsRepository } from '@/modules/restaurants/infrastructure/RestaurantRepository';
import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';
import { useInfiniteQuery } from '@tanstack/react-query';

const storageRepository = generateStorageRepository();
const clientRepository = generateClientRepository(storageRepository);
const restaurantsRepository = generateRestaurantsRepository(clientRepository);

export function useGetRestaurantsPagination() {
  const {
    data,
    isSuccess,
    isError,
    isFetching,
    isFetchingNextPage,
    isLoadingError,
    isFetchNextPageError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['restaurants-pagination'],
    queryFn: async ({ pageParam }) => {
      return await getRestaurantsPagination(restaurantsRepository)(pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.nextCursor) return lastPage?.nextCursor;
      return null;
    },
    select: (result) => {
      return result.pages.flatMap((page) => page.results);
    },
    retry: 3,
    retryDelay: 1500,
  });

  return {
    data,
    isSuccess,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoadingError,
    isFetchNextPageError,
  };
}

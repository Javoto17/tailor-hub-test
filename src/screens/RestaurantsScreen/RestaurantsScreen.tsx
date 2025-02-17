import React, { useCallback, useEffect, useRef } from 'react';

import { RestaurantsScreenProps } from '@/components/features/navigation/Navigation';
import RestaurantsList, {
  RestaurantsListRef,
} from '@/components/features/restaurants/RestaurantsList';
import Layout from '@/components/features/shared/Layout';
import { useGetRestaurantsPagination } from '@/hooks/restaurants/useGetRestaurantsPagination';

const RestaurantsScreen: React.FC<RestaurantsScreenProps> = ({
  navigation,
}) => {
  const {
    data,
    isFetching: isLoading,
    hasNextPage,
    fetchNextPage,
    isLoadingError,
  } = useGetRestaurantsPagination();

  const refList = useRef<RestaurantsListRef>(null);

  useEffect(() => {
    navigation.setOptions({
      title: 'Restaurants',
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressItem = (id: string) => {
    navigation.navigate('RestaurantDetail', { id });
  };

  const onEndReached = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  const getEmptyText = useCallback(() => {
    if (isLoadingError) {
      return 'Error al cargar los restaurantes';
    }

    if (!data?.length && !isLoading) {
      return 'No hay restaurantes';
    }

    return undefined;
  }, [isLoadingError, data?.length, isLoading]);

  return (
    <Layout withHeader withTabs>
      <RestaurantsList
        data={data ?? []}
        ref={refList}
        isLoading={isLoading}
        onPressItem={onPressItem}
        onEndReached={data && data?.length > 0 ? onEndReached : undefined}
        emptyText={getEmptyText()}
      />
    </Layout>
  );
};

export default RestaurantsScreen;

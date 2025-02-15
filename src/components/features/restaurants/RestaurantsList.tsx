import React, { forwardRef } from 'react';
import { FlatList } from 'react-native';

import MovieCard, { MovieCardItem } from './RestaurantCard';
import Spinner from '../shared/Spinner';

type MovieListProps = {
  data: MovieCardItem[];
  isLoading: boolean;
  onPressItem: (id: number) => void;
  onEndReached?: () => void;
  isRefetching?: boolean;
  onRefresh?: () => void;
  header?: React.ReactNode;
  empty?: React.ReactNode;
};

export type MovieListRef = FlatList;

const MovieList = forwardRef<MovieListRef, MovieListProps>(
  (
    {
      data,
      isLoading,
      onPressItem,
      onEndReached,
      onRefresh,
      isRefetching = false,
      header = null,
      empty = null,
    },
    ref
  ) => {
    const renderFooter = () => {
      if (!isLoading) {
        return null;
      }
      return <Spinner />;
    };

    return (
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        ref={ref}
        data={data}
        extraData={data}
        ListFooterComponentStyle={{
          flexGrow: 1,
        }}
        ListEmptyComponent={React.isValidElement(empty) ? empty : null}
        ListHeaderComponent={React.isValidElement(header) ? header : null}
        keyExtractor={(item) => item?.id?.toString()}
        renderItem={({ item }) => (
          <MovieCard movie={item} onPress={onPressItem} />
        )}
        {...(typeof onRefresh === 'function' && {
          refreshing: isRefetching,
          onRefresh: () => {
            if (typeof onRefresh === 'function') {
              onRefresh();
            }
          },
        })}
        ListFooterComponent={renderFooter}
        {...(typeof onEndReached === 'function' && {
          onEndReachedThreshold: 0.35,
          onEndReached: () => {
            if (!isLoading) {
              onEndReached();
            }
          },
        })}
      />
    );
  }
);

MovieList.displayName = 'MovieList';

export default MovieList;

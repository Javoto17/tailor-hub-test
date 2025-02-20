import React, { forwardRef } from 'react';
import { FlatList, Text, View } from 'react-native';

import Spinner from '../shared/Spinner';
import RestaurantCard from './RestaurantCard';
import { useFavoritesRestaurant } from '@/hooks/user/useFavoritesRestaurant';
import { Restaurant } from '@/modules/restaurants/domain/Restaurant';

type RestaurantsListProps = {
  data: Restaurant[];
  isLoading?: boolean;
  onPressItem?: (id: Restaurant['_id']) => void;
  onEndReached?: () => void;
  isRefetching?: boolean;
  onRefresh?: () => void;
  header?: React.ReactNode;
  emptyText?: string;
};

export type RestaurantsListRef = FlatList;

const RestaurantsList = forwardRef<RestaurantsListRef, RestaurantsListProps>(
  (
    {
      data,
      onPressItem,
      onEndReached,
      onRefresh,
      isLoading = false,
      isRefetching = false,
      header = null,
      emptyText = null,
    },
    ref
  ) => {
    const { addFavoriteRestaurant, removeFavoriteRestaurant } =
      useFavoritesRestaurant();

    const toggleFavorite = (item: Restaurant) => {
      if (item.isFavorite) {
        removeFavoriteRestaurant(item._id);
        return;
      }
      addFavoriteRestaurant(item);
    };

    const renderFooter = () => {
      if (!isLoading) {
        return null;
      }

      return <Spinner className="text-primary" />;
    };

    return (
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        ref={ref}
        data={data}
        extraData={data}
        contentContainerClassName="gap-y-2"
        className="px-2"
        ListFooterComponentStyle={{
          flexGrow: 1,
        }}
        ListEmptyComponent={
          !!emptyText ? (
            <View className="flex justify-center items-center flex-1">
              <Text className="font-roober-semi text-body text-lightGray">
                {emptyText}
              </Text>
            </View>
          ) : null
        }
        ListHeaderComponent={React.isValidElement(header) ? header : null}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <RestaurantCard
            restaurant={item}
            onPress={() => {
              if (typeof onPressItem === 'function') {
                onPressItem(item._id);
              }
            }}
            onPressFavorite={() => {
              toggleFavorite(item);
            }}
          />
        )}
        {...(typeof onRefresh === 'function' && {
          refreshing: isRefetching,
          onRefresh: () => {
            if (typeof onRefresh === 'function') {
              onRefresh();
            }
          },
        })}
        {...(!emptyText && {
          ListFooterComponent: renderFooter,
        })}
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

RestaurantsList.displayName = 'RestaurantsList';

export default RestaurantsList;

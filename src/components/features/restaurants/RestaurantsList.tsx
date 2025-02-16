import React, { forwardRef } from 'react';
import { FlatList, Text, View } from 'react-native';

import Spinner from '../shared/Spinner';
import RestaurantCard, { RestaurantCardItem } from './RestaurantCard';

type RestaurantsListProps = {
  data: RestaurantCardItem[];
  isLoading: boolean;
  onPressItem: (id: RestaurantCardItem['id']) => void;
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
      isLoading,
      onPressItem,
      onEndReached,
      onRefresh,
      isRefetching = false,
      header = null,
      emptyText,
    },
    ref
  ) => {
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
            <View className="flex justify-center items-center">
              <Text className="font-roober-semi text-body text-black">
                {emptyText}
              </Text>
            </View>
          ) : null
        }
        ListHeaderComponent={React.isValidElement(header) ? header : null}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RestaurantCard restaurant={item} onPress={onPressItem} />
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

RestaurantsList.displayName = 'RestaurantsList';

export default RestaurantsList;

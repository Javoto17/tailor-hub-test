import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { RestaurantsScreenProps } from '@/components/features/navigation/Navigation';
import RestaurantsList, {
  RestaurantsListRef,
} from '@/components/features/restaurants/RestaurantsList';
import RestaurantsMap from '@/components/features/restaurants/RestaurantsMap';
import FloatIcon from '@/components/features/shared/FloatIcon';
import Layout from '@/components/features/shared/Layout';
import ListIcon from '@/components/features/shared/ListIcon';
import MapIcon from '@/components/features/shared/MapIcon';
import PlusIcon from '@/components/features/shared/PlusIcon';
import { useGetRestaurants } from '@/hooks/restaurants/useGetRestaurants';

enum RestaurantsScreenType {
  LIST = 'LIST',
  MAP = 'MAP',
}

const RestaurantsScreen: React.FC<RestaurantsScreenProps> = ({
  navigation,
}) => {
  const { data, isLoading, isError } = useGetRestaurants();

  const [screenType, setScreenType] = useState<RestaurantsScreenType>(
    RestaurantsScreenType.LIST
  );

  useEffect(() => {
    navigation.setOptions({
      title: 'Restaurants',
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            setScreenType(RestaurantsScreenType.MAP);
          }}
        >
          <View className="px-2">
            <MapIcon
              className={
                screenType === RestaurantsScreenType.MAP
                  ? 'text-black/35'
                  : 'text-black'
              }
            />
          </View>
        </TouchableOpacity>
      ),
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setScreenType(RestaurantsScreenType.LIST);
          }}
        >
          <View className="px-2">
            <ListIcon
              className={
                screenType === RestaurantsScreenType.LIST
                  ? 'text-black/35'
                  : 'text-black'
              }
            />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, screenType]);

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

  const getEmptyText = useCallback(() => {
    if (isError) {
      return 'Error al cargar los restaurantes';
    }

    if (!data?.length && !isLoading) {
      return 'No hay restaurantes';
    }

    return undefined;
  }, [isError, data?.length, isLoading]);

  const handlePress = () => {
    navigation.navigate('RestaurantCreate', {
      restaurant: undefined,
    });
  };

  return (
    <Layout withHeader withTabs>
      {screenType === RestaurantsScreenType.LIST && (
        <>
          <RestaurantsList
            data={data ?? []}
            ref={refList}
            isLoading={isLoading}
            onPressItem={onPressItem}
            emptyText={getEmptyText()}
          />
          <FloatIcon position="bottomRight" onPress={handlePress}>
            <PlusIcon className="text-white" width={32} height={32} />
          </FloatIcon>
        </>
      )}

      {screenType === RestaurantsScreenType.MAP && (
        <RestaurantsMap data={data ?? []} onPressItem={onPressItem} />
      )}
    </Layout>
  );
};

export default RestaurantsScreen;

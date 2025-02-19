import React, { useEffect, useRef } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { useFavoritesRestaurant } from '@/hooks/user/useFavoritesRestaurant';
import { useUserLocation } from '@/hooks/user/useUserLocation';
import { Restaurant } from '@/modules/restaurants/domain/Restaurant';

import StyledMapView from './StyledMap';
import RestaurantCard from './RestaurantCard';

const { width: windowWidth } = Dimensions.get('window');

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

const ITEM_FLEX_BASIS = windowWidth * 0.8;

const ITEM_MARGIN = 6;

const RestaurantsMap = ({ data, onPressItem }: RestaurantsListProps) => {
  const { addFavoriteRestaurant, removeFavoriteRestaurant } =
    useFavoritesRestaurant();

  const { getCurrentLocation } = useUserLocation();

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    const getLocation = async () => {
      const currentLocation = await getCurrentLocation();

      if (mapRef?.current && currentLocation) {
        mapRef.current.animateToRegion({
          latitude: Number(currentLocation?.latitude),
          longitude: Number(currentLocation?.longitude),
          latitudeDelta: Number(
            Platform.select({
              ios: 0.005,
              android: 0.25,
            })
          ),
          longitudeDelta: Number(
            Platform.select({
              ios: 0.005,
              android: 0.25,
            })
          ),
        });
      }
    };
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSlide = (index: number) => {
    if (mapRef?.current && data?.[index]?.latlng) {
      mapRef.current.animateToRegion({
        latitude: data[index].latlng.lat,
        longitude: data[index].latlng.long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      mapRef.current.setCamera({
        center: {
          latitude: data[index].latlng.lat,
          longitude: data[index].latlng.long,
        },
        zoom: 5,
      });
    }
  };

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const itemWidth = ITEM_FLEX_BASIS + ITEM_MARGIN * 2;
    const index = Math.round(contentOffsetX / itemWidth);

    onSlide(index);
  };

  const toggleFavorite = (item: Restaurant) => {
    if (item.isFavorite) {
      removeFavoriteRestaurant(item._id);
      return;
    }
    addFavoriteRestaurant(item);
  };

  return (
    <View className="flex-1 relative overflow-hidden">
      <StyledMapView
        className="flex-1 rounded-t-2xl overflow-hidden"
        ref={mapRef}
      >
        {data?.length > 0 &&
          data.map((restaurant) => (
            <Marker
              key={restaurant._id}
              coordinate={{
                latitude: restaurant.latlng.lat ?? 0,
                longitude: restaurant.latlng.long ?? 0,
              }}
              title={restaurant.name}
              onPress={() => {
                if (typeof onPressItem === 'function') {
                  onPressItem(restaurant._id);
                }
              }}
            />
          ))}
      </StyledMapView>
      <View className="absolute bottom-0 left-0 right-0 z-10">
        <FlatList
          data={data}
          contentContainerClassName="gap-x-4 pb-4 px-2"
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          horizontal={true}
          decelerationRate="fast"
          snapToInterval={ITEM_FLEX_BASIS + ITEM_MARGIN * 2}
          onMomentumScrollEnd={onMomentumScrollEnd}
          renderItem={({ item }) => (
            <View
              style={{
                width: ITEM_FLEX_BASIS,
              }}
              className="flex-1"
            >
              <RestaurantCard
                variant="map"
                restaurant={item}
                key={item._id}
                onPress={() => {
                  onPressItem?.(item._id);
                }}
                onPressFavorite={() => {
                  toggleFavorite(item);
                }}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default RestaurantsMap;

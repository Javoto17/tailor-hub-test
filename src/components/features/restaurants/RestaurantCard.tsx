import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { Restaurant } from '@/modules/restaurants/domain/Restaurant';

import HearthIcon from '../shared/HearthIcon';
import Rating from '../shared/Rating';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: () => void;
  onPressFavorite?: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onPress,
  onPressFavorite,
}) => {
  return (
    <TouchableOpacity onPress={onPress} testID={restaurant?._id}>
      <View className="flex flex-row gap-x-1 items-center">
        <View className="overflow-hidden rounded-2xl relative h-24 w-24 bg-secondary">
          <Image
            source={{
              uri: restaurant.image,
            }}
            resizeMode="cover"
            className="absolute w-full h-full"
          />
        </View>
        <View className="flex-1 flex-row gap-x-2">
          <View className="flex-1 py-2 px-2 gap-y-1">
            <Text className="text-body-small font-semibold text-dark">
              {restaurant.name}
            </Text>
            <Text className="text-caption text-dark" numberOfLines={3}>
              {restaurant.address}
            </Text>
            <View className="flex flex-row gap-x-2 items-end">
              <Rating value={Math.ceil(restaurant.avgRating)} max={5} />
              <Text className="text-body-small text-dark">
                {`(${restaurant?.reviews?.length} reviews) `}
              </Text>
            </View>
          </View>
          <View className="px-2">
            <TouchableOpacity onPress={onPressFavorite}>
              <HearthIcon filled={restaurant?.isFavorite} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;

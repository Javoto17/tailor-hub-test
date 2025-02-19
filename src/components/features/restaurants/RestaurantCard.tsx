import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { Restaurant } from '@/modules/restaurants/domain/Restaurant';

import HearthIcon from '../shared/HearthIcon';
import Rating from '../shared/Rating';
import { tv, VariantProps } from '@/lib/tv';

const restaurantCardVariants = tv({
  slots: {
    container: 'flex flex-row gap-x-1 items-center min-h-24',
    image: 'overflow-hidden rounded-2xl relative h-24 w-24 bg-secondary',
    name: 'text-body-small font-semibold text-black',
    address: 'text-caption text-black',
  },
  variants: {
    variant: {
      map: {
        container: 'bg-white rounded-2xl p-4 basis-1/3',
      },
      list: {
        container: '',
      },
    },
  },
});

type RestaurantCardVariants = VariantProps<typeof restaurantCardVariants>;

interface RestaurantCardProps extends RestaurantCardVariants {
  restaurant: Restaurant;
  onPress: () => void;
  onPressFavorite?: () => void;
  className?: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onPress,
  onPressFavorite,
  variant = 'list',
  className,
}) => {
  const { container, image, name, address } = restaurantCardVariants({
    variant,
    className,
  });

  return (
    <TouchableOpacity onPress={onPress} testID={restaurant?._id}>
      <View className={container()}>
        <View className={image()}>
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
            <Text className={name()}>{restaurant.name}</Text>
            <Text className={address()} numberOfLines={3}>
              {restaurant.address}
            </Text>
            <View className="flex flex-row gap-x-2 items-end">
              <Rating value={Math.ceil(restaurant.avgRating)} max={5} />
              <Text className="text-body-small text-black">
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

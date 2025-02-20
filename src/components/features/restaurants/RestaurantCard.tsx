import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { tv, VariantProps } from '@/lib/tv';
import { Restaurant } from '@/modules/restaurants/domain/Restaurant';

import HearthIcon from '../shared/icons/HearthIcon';
import Rating from '../shared/Rating';

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
        container: 'bg-white rounded-2xl px-2 py-2 h-full',
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
        <View className="flex-1 flex-row gap-x-2 py-2 relative h-full min-h-16">
          <View className="basis-10/12 gap-y-1 h-auto pl-2">
            <Text className={name()}>{restaurant.name}</Text>
            <Text className={address()} numberOfLines={2}>
              {restaurant.address}
            </Text>
            <View className="flex flex-row gap-x-2 items-end">
              <Rating value={Math.ceil(restaurant.avgRating)} max={5} />
              <Text className="text-body-small text-black">
                {`(${restaurant?.reviews?.length} reviews) `}
              </Text>
            </View>
          </View>
          <View className="basis-2/12 pr-4 items-end justify-start">
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

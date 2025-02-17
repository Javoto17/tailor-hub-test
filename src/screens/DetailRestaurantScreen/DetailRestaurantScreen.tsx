import { vars } from 'nativewind';
import React from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RestaurantDetailScreenProps } from '@/components/features/navigation/Navigation';
import RestaurantComment from '@/components/features/restaurantDetail/RestaurantComment';
import RestaurantFormComment, {
  FormCommentData,
} from '@/components/features/restaurantDetail/RestaurantFormComment';
import RestaurantHeader from '@/components/features/restaurantDetail/RestaurantHeader';
import RestaurantIntro from '@/components/features/restaurantDetail/RestaurantIntro';
import ArrowIcon from '@/components/features/shared/ArrowIcon';
import ButtonIcon from '@/components/features/shared/ButtonIcon';
import HearthIcon from '@/components/features/shared/HearthIcon';
import Layout from '@/components/features/shared/Layout';
import Spinner from '@/components/features/shared/Spinner';
import { useAuth } from '@/hooks/auth/useAuth';
import { useComment } from '@/hooks/comments/useComment';
import { useGetRestaurantDetail } from '@/hooks/restaurants/useGetRestaurantDetail';
import { useFavoritesRestaurant } from '@/hooks/user/useFavoritesRestaurant';
import { Restaurant } from '@/modules/restaurants/domain/Restaurant';

const HEADER_HEIGHT = 64;

const DetailRestaurantScreen = ({
  route,
  navigation,
}: RestaurantDetailScreenProps) => {
  const { id } = route.params;

  const {
    data: restaurant,
    isLoading,
    isFavorite,
  } = useGetRestaurantDetail(id);
  const { addFavoriteRestaurant, removeFavoriteRestaurant } =
    useFavoritesRestaurant();
  const { createComment, deleteComment } = useComment();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  const thisIsLoading = isLoading || !restaurant;

  const thisOnSubmit = (formData: FormCommentData) => {
    createComment({
      restaurantId: id,
      comment: formData.comment,
      rating: formData.rating,
    });
  };

  const { name, address } = restaurant ?? {};

  const toggleFavorite = (item: Restaurant) => {
    if (isFavorite) {
      removeFavoriteRestaurant(item?._id);
      return;
    }

    addFavoriteRestaurant(item);
  };

  const thisHeaderLeft = () => (
    <ButtonIcon onPress={() => navigation.goBack()}>
      <ArrowIcon className="text-white" width={24} height={24} />
    </ButtonIcon>
  );

  const thisHeaderRight = () => (
    <ButtonIcon onPress={() => toggleFavorite(restaurant as Restaurant)}>
      <HearthIcon
        className="text-white"
        width={24}
        height={24}
        filled={isFavorite}
      />
    </ButtonIcon>
  );

  return (
    <Layout withHeader>
      {thisIsLoading ? (
        <View className="flex-1 justify-center items-center">
          <Spinner />
        </View>
      ) : (
        <View className="flex-1 relative">
          <RestaurantHeader
            route={route}
            navigation={navigation}
            height={HEADER_HEIGHT}
            options={{
              headerLeft: thisHeaderLeft,
              headerRight: thisHeaderRight,
            }}
          />
          <FlatList
            data={restaurant?.reviews}
            renderItem={({ item }) => (
              <RestaurantComment
                comment={item}
                owner={item?.owner?.name === user?.name}
                onDelete={() => {
                  deleteComment({
                    restaurantId: id,
                    commentId: item?._id,
                  });
                }}
              />
            )}
            contentContainerClassName="gap-y-4"
            ListHeaderComponentClassName="gap-y-8 pb-4"
            ListHeaderComponent={
              <>
                <RestaurantIntro
                  image={restaurant?.image}
                  title={name}
                  address={address}
                  bio={restaurant?.description}
                />
                <RestaurantFormComment onSubmit={thisOnSubmit} />
              </>
            }
            className="px-2 flex-1 relative mt-[--header-height]"
            style={vars({
              '--header-height': insets?.top + HEADER_HEIGHT * 0.15,
            })}
          />
        </View>
      )}
    </Layout>
  );
};

export default DetailRestaurantScreen;

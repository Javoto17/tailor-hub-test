import React, { useEffect } from 'react';
import RestaurantsList from '@/components/features/restaurants/RestaurantsList';

import Layout from '@/components/features/shared/Layout';

import { FavoritesScreenProps } from '@/components/features/navigation/Navigation';
import { useFavoritesRestaurant } from '@/hooks/user/useFavoritesRestaurant';

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
  const { favorites } = useFavoritesRestaurant();

  useEffect(() => {
    navigation.setOptions({
      title: 'Favorites',
    });
  }, [navigation]);

  const handlePressItem = (id: string) => {
    navigation.navigate('RestaurantDetail', { id });
  };

  return (
    <Layout withHeader withTabs>
      <RestaurantsList data={favorites} onPressItem={handlePressItem} />
    </Layout>
  );
};

export default FavoritesScreen;

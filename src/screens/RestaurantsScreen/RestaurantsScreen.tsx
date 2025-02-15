import React, { useState } from 'react';

import { Text } from 'react-native';
import { RestaurantsScreenProps } from '@/components/features/navigation/Navigation';

import Layout from '@/components/features/shared/Layout';

import { useGetRestaurants } from '@/hooks/restaurants/useGetRestaurants';

const RestaurantsScreen: React.FC<RestaurantsScreenProps> = ({
  navigation,
  route,
}) => {
  const [text, setText] = useState<string>();

  const { data } = useGetRestaurants();

  return (
    <Layout withHeader>
      <Text>Restaurants</Text>
    </Layout>
  );
};

export default RestaurantsScreen;

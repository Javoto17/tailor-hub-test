import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import RestaurantForm, {
  RestaurantFormData,
} from '@/components/features/restaurantCreate/RestaurantForm';
import Layout from '@/components/features/shared/Layout';
import LogoIcon from '@/components/features/shared/LogoIcon';
import ArrowIcon from '@/components/features/shared/ArrowIcon';

import { CreateRestaurantScreenProps } from '@/components/features/navigation/Navigation';
import { useManageRestaurant } from '@/hooks/restaurants/useManageRestaurant';

const CreateRestaurantScreen: React.FC<CreateRestaurantScreenProps> = ({
  navigation,
}) => {
  const { createRestaurantUser } = useManageRestaurant();

  const handlePress = () => {
    navigation.goBack();
  };

  const handleSubmit = (data: RestaurantFormData) => {
    createRestaurantUser(data);
  };

  return (
    <Layout>
      <View className="flex flex-row relative mb-2 items-center ">
        <TouchableOpacity onPress={handlePress}>
          <View className="py-2 px-2">
            <ArrowIcon className="text-primary" width={32} height={32} />
          </View>
        </TouchableOpacity>
        <View className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <LogoIcon className="text-primary" />
        </View>
      </View>
      <RestaurantForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default CreateRestaurantScreen;

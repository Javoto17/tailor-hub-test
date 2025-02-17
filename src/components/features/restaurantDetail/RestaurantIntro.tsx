import React from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
  Platform,
  Linking,
} from 'react-native';

interface RestaurantIntroProps {
  image: string;
  title?: string;
  address?: string;
  bio?: string;
}

const RestaurantIntro = ({
  image,
  title,
  address,
  bio,
}: RestaurantIntroProps) => {
  const onPressAddress = () => {
    Linking.openURL(
      Platform.select({
        ios: `maps://?address=${address}`,
        android: `geo:0,0?q=${address}`,
      }) as string
    );
  };

  return (
    <View className="flex-1 gap-y-4">
      <View className={'relative rounded-2xl overflow-hidden h-56'}>
        <Image
          source={{ uri: image }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 justify-center items-center z-10 gap-y-2">
          <Text className="text-body text-white font-roobert-semi font-bold">
            {title}
          </Text>
          <TouchableWithoutFeedback onPress={onPressAddress}>
            <Text className="text-caption text-white font-roobert">
              {address}
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View className="absolute bg-black/40 w-full h-full" />
      </View>
      <View>
        <Text className="text-body-small text-black font-roobert">{bio}</Text>
      </View>
    </View>
  );
};

export default RestaurantIntro;

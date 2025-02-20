import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { HomeScreenProps } from '@/components/features/navigation/Navigation';
import Button from '@/components/features/shared/Button';
import Layout from '@/components/features/shared/Layout';
import TailorIcon from '@/components/features/shared/icons/TailorIcon';
import { useAuth } from '@/hooks/auth/useAuth';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { verifyUser } = useAuth();

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handlePress = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    verifyUser.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (verifyUser?.isError) {
      opacity.value = withDelay(1250, withTiming(1, { duration: 350 }));
      translateY.value = withDelay(1000, withTiming(-36, { duration: 500 }));
    }
  }, [opacity, translateY, verifyUser?.isError]);

  return (
    <Layout withHeader={false}>
      <View className="flex-1 bg-secondary m-4 rounded-2xl items-center justify-center">
        <Animated.View style={animatedIconStyle}>
          <TailorIcon className="text-black" />
        </Animated.View>
        <Animated.View style={[{ opacity: 0 }, animatedTextStyle]}>
          <Text className="text-black font-roobert text-body leading-regular text-center">
            Hola, Bienvenido a la prueba de Tailor hub, en ella has de añadir
            los restaurantes favoritos donde te gustaría ir en tu onboarding.
          </Text>
          <Button
            variant="outline"
            className="mt-8 mx-4"
            label="Iniciar"
            onPress={handlePress}
          />
        </Animated.View>
      </View>
    </Layout>
  );
};

export default HomeScreen;

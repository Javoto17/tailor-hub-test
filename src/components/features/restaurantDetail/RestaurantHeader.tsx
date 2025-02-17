import React from 'react';
import { vars } from 'nativewind';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { tv } from '@/lib/tv';

interface RestaurantHeaderProps extends NativeStackHeaderProps {
  className?: string;
  height?: number;
}

const wrapperHeader = tv({
  base: 'bg-transparent absolute top-[--safe-top] left-0 right-0 z-10',
});

const RestaurantHeader: React.FC<RestaurantHeaderProps> = (props) => {
  const { options, navigation, className, height = 64 } = props ?? {};
  const { headerRight, headerLeft } = options ?? {};

  const insets = useSafeAreaInsets();

  return (
    <View
      className={wrapperHeader({
        className,
      })}
      style={vars({
        '--safe-top': insets?.top,
        '--header-height': height,
      })}
    >
      <View className="flex h-[--header-height] flex-row gap-x-1 justify-between px-2 bg-transparent">
        <View className="flex items-center justify-center">
          {headerLeft &&
            headerLeft({
              canGoBack: navigation?.canGoBack(),
            })}
        </View>
        <View className="flex items-end justify-center">
          {headerRight &&
            headerRight({
              canGoBack: navigation?.canGoBack(),
            })}
        </View>
      </View>
    </View>
  );
};

export default RestaurantHeader;

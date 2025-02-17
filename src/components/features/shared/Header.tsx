import React from 'react';
import { vars } from 'nativewind';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NativeStackHeaderProps } from '@react-navigation/native-stack';

interface HeaderProps extends NativeStackHeaderProps {}

const Header: React.FC<HeaderProps> = (props) => {
  const { options, navigation } = props ?? {};
  const { headerRight, title, headerLeft } = options ?? {};

  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-light pt-[--safe-top]"
      style={vars({ '--safe-top': insets?.top })}
    >
      <View className="flex h-16 flex-row gap-x-1">
        <View className="flex basis-8/12 flex-col px-2 justify-center">
          <Text className="text-body font-semibold text-dark">{title}</Text>
        </View>
        <View className="flex basis-2/12 items-end justify-center">
          {headerLeft &&
            headerLeft({
              canGoBack: navigation?.canGoBack(),
            })}
        </View>
        <View className="flex basis-3/12 items-end justify-center">
          {headerRight &&
            headerRight({
              canGoBack: navigation?.canGoBack(),
            })}
        </View>
      </View>
    </View>
  );
};

export default Header;

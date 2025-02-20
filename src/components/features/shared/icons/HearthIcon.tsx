import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { cssInterop } from 'nativewind';
import { StyleProp, ViewStyle, View } from 'react-native';

interface HearthIconProps {
  width?: number;
  height?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
  filled?: boolean;
}

const HearthIcon = ({
  width = 24,
  height = 24,
  filled = false,
  ...props
}: HearthIconProps) => {
  return filled ? (
    <View testID="heart-icon">
      <Svg
        width={width}
        height={height}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
      >
        <Path
          fill="currentColor"
          fillRule="evenodd"
          d="M3.806 6.206a4.8 4.8 0 0 1 6.788 0L12 7.612l1.406-1.406a4.8 4.8 0 1 1 6.788 6.788L12 21.188l-8.194-8.194a4.8 4.8 0 0 1 0-6.788Z"
          clipRule="evenodd"
        />
      </Svg>
    </View>
  ) : (
    <View testID="heart-icon">
      <Svg
        width={width}
        height={height}
        fill="none"
        {...props}
        viewBox="0 0 24 24"
      >
        <Path
          fillRule="evenodd"
          fill="currentColor"
          clipRule="evenodd"
          d="m14.025 7.025-1.318 1.318a1 1 0 0 1-1.414 0L9.975 7.025a3.5 3.5 0 1 0-4.95 4.95L12 18.95l6.975-6.975.707.707-.707-.707a3.5 3.5 0 0 0-4.95-4.95Zm-1.414-1.414a5.5 5.5 0 0 1 7.778 7.778l-7.682 7.682a1 1 0 0 1-1.414 0L3.61 13.39a5.5 5.5 0 0 1 7.778-7.778l.611.61.61-.61Z"
        />
      </Svg>
    </View>
  );
};

export default cssInterop(HearthIcon, {
  className: {
    target: 'style', // map className->style
  },
});

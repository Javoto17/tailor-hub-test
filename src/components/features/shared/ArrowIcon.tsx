import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { cssInterop } from 'nativewind';
import { StyleProp, ViewStyle } from 'react-native';

interface ArrowIconProps {
  width?: number;
  height?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const ArrowIcon = ({ width = 24, height = 24, ...props }: ArrowIconProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M9.57 18.07 3.5 12l6.07-6.07M20.5 12H3.67"
    />
  </Svg>
);

export default cssInterop(ArrowIcon, {
  className: {
    target: 'style', // map className->style
  },
});

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

const ArrowIcon = ({ width = 24, height = 24, ...props }: ArrowIconProps) => {
  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M16 4c.736 0 1.333.597 1.333 1.333v9.334h9.334a1.333 1.333 0 0 1 0 2.666h-9.334v9.334a1.333 1.333 0 0 1-2.666 0v-9.334H5.333a1.333 1.333 0 1 1 0-2.666h9.334V5.333C14.667 4.597 15.264 4 16 4Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default cssInterop(ArrowIcon, {
  className: {
    target: 'style', // map className->style
  },
});

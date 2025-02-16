import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { cssInterop } from 'nativewind';
import { StyleProp, ViewStyle } from 'react-native';

interface StarIconProps {
  width?: number;
  height?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
  empty?: boolean;
}

const StarIcon = ({
  width = 16,
  height = 17,
  empty,
  ...props
}: StarIconProps) => {
  return empty ? (
    <Svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 16 17"
      {...props}
    >
      <Path
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        d="m8 .5 1.17 5.177 4.487-2.834-2.834 4.488L16 8.5l-5.177 1.17 2.834 4.487-4.488-2.834L8 16.5l-1.17-5.177-4.487 2.834 2.834-4.488L0 8.5l5.177-1.17-2.834-4.487 4.488 2.834L8 .5Z"
      />
    </Svg>
  ) : (
    <Svg width={width} height={height} fill="none" {...props}>
      <Path
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1}
        d="m8 .5 1.17 5.177 4.487-2.834-2.834 4.488L16 8.5l-5.177 1.17 2.834 4.487-4.488-2.834L8 16.5l-1.17-5.177-4.487 2.834 2.834-4.488L0 8.5l5.177-1.17-2.834-4.487 4.488 2.834L8 .5Z"
      />
    </Svg>
  );
};

export default cssInterop(StarIcon, {
  className: {
    target: 'style', // map className->style
  },
});

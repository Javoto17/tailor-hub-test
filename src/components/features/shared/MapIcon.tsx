import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { cssInterop } from 'nativewind';
import { StyleProp, ViewStyle } from 'react-native';

interface MapIconProps {
  width?: number;
  height?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const MapIcon = ({ width = 24, height = 24, ...props }: MapIconProps) => (
  <Svg width={width} height={height} fill="none" {...props}>
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M14.553 3.106a1 1 0 0 1 .894 0l5.447 2.723A2 2 0 0 1 22 7.618v10.764a2 2 0 0 1-2.894 1.789L15 18.118l-5.553 2.776a1 1 0 0 1-.894 0l-5.447-2.723A2 2 0 0 1 2 16.382V5.618a2 2 0 0 1 2.894-1.789L9 5.882l5.553-2.776ZM8 7.618l-4-2v10.764l4 2V7.618Zm2 10.764 4-2V5.618l-4 2v10.764Zm6-12.764v10.764l4 2V7.618l-4-2Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default cssInterop(MapIcon, {
  className: {
    target: 'style',
  },
});

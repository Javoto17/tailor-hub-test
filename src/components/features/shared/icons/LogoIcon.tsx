import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { cssInterop } from 'nativewind';
import { StyleProp, ViewStyle } from 'react-native';

interface LogoIconProps {
  width?: number;
  height?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const LogoIcon = ({ width = 27, height = 24, ...props }: LogoIconProps) => {
  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      {...props}
      viewBox="0 0 27 24"
    >
      <Path
        fill="#264BEB"
        d="M26.655 24v-4H20.7c-.622 0-1.334-.356-1.867-.978L16.255 16h10.4v-4h-7.289l5.156-6.133-3.111-2.578-5.956 7.022V0h-4v10.311L5.59 3.29 2.478 5.867 7.633 12H.344v4h10.4l-2.578 3.022C7.633 19.644 6.922 20 6.3 20H.344v4h6.222c1.6 0 3.2-.622 4.09-1.689l2.844-3.378 2.844 3.378c.89.978 2.49 1.689 4.09 1.689h6.221Z"
      />
    </Svg>
  );
};

export default cssInterop(LogoIcon, {
  className: {
    target: 'style', // map className->style
  },
});

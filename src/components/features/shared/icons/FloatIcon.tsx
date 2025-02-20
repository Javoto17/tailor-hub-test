import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';
import { tv } from '@/lib/tv';

export interface FloatIconProps extends TouchableOpacityProps {
  color?: string;
  icon?: 'bookmark' | 'bookmarks' | 'close-circle-sharp';
  children?: React.ReactNode;
  position?: 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft';
}

const floatIconTv = tv({
  base: 'bg-primary p-2 rounded-full h-14 w-14 justify-center items-center shadow-lg shadow-black/20 z-10',
  variants: {
    position: {
      topRight: 'absolute bottom-4 right-4',
      bottomRight: 'absolute bottom-4 right-4',
      bottomLeft: 'absolute bottom-4 left-4',
      topLeft: 'absolute top-4 left-4',
    },
  },
});

const FloatIcon: React.FC<FloatIconProps> = ({
  onPress,
  icon,
  children,
  position = 'bottomRight',
  className,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      className={floatIconTv({ position, className })}
    >
      {children ? (
        children
      ) : icon ? (
        <Ionicons {...props} name={icon} size={24} />
      ) : null}
    </TouchableOpacity>
  );
};

export default FloatIcon;

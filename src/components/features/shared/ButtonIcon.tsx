import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

export interface ButtonIconProps extends TouchableOpacityProps {
  color?: string;
  icon?: 'bookmark' | 'bookmarks' | 'close-circle-sharp';
  children?: React.ReactNode;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  onPress,
  icon,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      className="bg-gray p-2 rounded-full"
    >
      {children ? (
        children
      ) : icon ? (
        <Ionicons {...props} name={icon} size={24} testID={`${icon}-icon`} />
      ) : null}
    </TouchableOpacity>
  );
};

export default ButtonIcon;

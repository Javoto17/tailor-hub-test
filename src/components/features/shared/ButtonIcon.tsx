import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

export interface ButtonIconProps extends TouchableOpacityProps {
  color?: string;
  icon: 'bookmark' | 'bookmarks' | 'close-circle-sharp';
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  onPress,
  icon,
  color = '#000000',
  ...props
}) => {
  return (
    <TouchableOpacity {...props} onPress={onPress}>
      <Ionicons {...props} name={icon} size={24} color={color} />
    </TouchableOpacity>
  );
};

export default ButtonIcon;

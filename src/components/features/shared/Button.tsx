import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  View,
} from 'react-native';
import { tv, VariantProps } from 'tailwind-variants';

import Ionicons from '@react-native-vector-icons/ionicons';

const buttonVariants = tv({
  slots: {
    button: 'py-4 px-8 flex flex-row items-center justify-center text-primary',
    label: 'font-semibold leading-semibold text-body-small',
  },
  variants: {
    variant: {
      filled: {
        button: '',
      },
      outline: {
        button: 'bg-transparent border',
      },
    },
    color: {
      primary: {
        label: 'text-black',
      },
      secondary: {
        label: 'text-light',
      },
    },
    size: {
      small: {
        button: 'py-4 px-4 rounded-[17px]',
      },
      large: {
        button: 'py-4 px-10 rounded-[32px]',
        label: 'text-body',
      },
      full: {
        button: 'py-4 px-10 rounded-[32px] w-full',
      },
    },
  },
  compoundVariants: [
    {
      variant: 'filled',
      color: 'primary',
      class: {
        button: 'bg-light',
        label: 'text-black',
      },
    },
    {
      variant: 'filled',
      color: 'secondary',
      class: {
        button: 'bg-primary',
        label: 'text-light',
      },
    },
    {
      variant: 'outline',
      color: 'primary',
      class: {
        button: 'border-black',
        label: 'text-black',
      },
    },
    {
      variant: 'outline',
      color: 'secondary',
      class: {
        button: 'border-light',
        label: 'text-light',
      },
    },
  ],
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface ButtonProps extends TouchableOpacityProps, ButtonVariants {
  label?: string;
  icon?: {
    name: 'trash';
    size?: number;
    color?: string;
  };
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  variant = 'filled',
  className,
  label,
  children,
  color = 'primary',
  size = 'small',
  icon,
  ...props
}) => {
  const { button, label: tvLabel } = buttonVariants({
    variant,
    color,
    size,
  });

  const renderChildren = () => {
    if (children) return children;
    if (label) return <Text className={tvLabel()}>{label}</Text>;
    if (icon)
      return <Ionicons name={icon.name} size={icon.size} color={icon.color} />;
    return null;
  };
  return (
    <TouchableOpacity {...props} onPress={onPress}>
      <View className={button({ className })}>{renderChildren()}</View>
    </TouchableOpacity>
  );
};

export default Button;

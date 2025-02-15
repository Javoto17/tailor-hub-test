import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';
import { tv, VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
  slots: {
    button: 'py-4 px-8 flex flex-row items-center justify-center text-primary',
    label: 'font-semibold leading-semibold text-caption',
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
        button: 'bg-light ',
        label: 'text-black',
      },
    },
    {
      variant: 'filled',
      color: 'secondary',
      class: {
        button: 'bg-black',
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
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  variant = 'filled',
  className,
  label,
  children,
  color = 'primary',
  size = 'small',
  ...props
}) => {
  const { button, label: tvLabel } = buttonVariants({
    variant,
    color,
    size,
  });

  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      className={button({
        className,
      })}
    >
      {children ? (
        children
      ) : label ? (
        <Text className={tvLabel()}>{label}</Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default Button;

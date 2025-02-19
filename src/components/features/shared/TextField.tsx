import React, { useCallback } from 'react';
import { TextInput, TextInputProps, Text, View } from 'react-native';

import { tv, VariantProps } from '@/lib/tv';

const textFieldVariants = tv({
  slots: {
    wrapper: 'flex flex-row border border-black rounded-[32px] relative',
    label: 'font-roobert-semi text-body mb-2 font-semibold',
    input: 'font-roobert text-body min-h-11 py-3 px-4 basis-full',
    error: 'text-red-500 font-roobert text-caption pl-4 mt-2',
  },
  variants: {
    variant: {
      primary: {
        wrapper: 'border-black',
        label: 'text-black',
        input: 'text-black placeholder:text-black',
      },
      secondary: {
        wrapper: 'border-white',
        label: 'text-white',
        input: 'text-white opacity-100 placeholder:text-lightGray',
      },
    },
    rightIcon: {
      true: {
        wrapper: 'pr-10',
      },
      false: {
        wrapper: '',
      },
    },
    size: {
      small: {
        label: 'text-body-small',
        input: 'text-body-small',
      },
      large: {
        label: 'text-body',
        input: 'text-body',
      },
    },
  },
});

export type TextFieldVariants = VariantProps<typeof textFieldVariants>;

export interface TextFieldProps
  extends TextInputProps,
    Omit<TextFieldVariants, 'rightIcon'> {
  label?: string;
  rightIcon?: React.ReactNode;
  error?: {
    message: string;
  };
}

const TextField = React.forwardRef<TextInput, TextFieldProps>(
  (
    {
      placeholder,
      value,
      onChangeText,
      variant = 'secondary',
      label,
      size = 'large',
      rightIcon,
      error,
      ...props
    },
    ref
  ) => {
    const handleOnChange = useCallback(
      (text: string) => {
        if (typeof onChangeText === 'function') {
          onChangeText(text);
        }
      },
      [onChangeText]
    );

    const {
      wrapper,
      label: tvLabel,
      input,
      error: errorMessage,
    } = textFieldVariants({ variant, size, rightIcon: !!rightIcon });

    return (
      <View>
        <Text className={tvLabel()}>{label}</Text>
        <View className={wrapper()}>
          <TextInput
            {...props}
            ref={ref}
            className={input()}
            placeholder={placeholder}
            value={value}
            onChangeText={handleOnChange}
          />
          <View className="absolute top-1/2 right-2 -translate-y-1/2 w-10">
            {React.isValidElement(rightIcon) && rightIcon}
          </View>
        </View>

        {error && <Text className={errorMessage()}>{error?.message}</Text>}
      </View>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;

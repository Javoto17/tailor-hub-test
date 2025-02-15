import React, { useCallback, useState } from 'react';
import { TextInput, TextInputProps, Text, View } from 'react-native';

import { tv } from '@/lib/tv';

interface TextFieldProps extends TextInputProps {
  variant?: 'primary' | 'secondary';
  label?: string;
}

const textFieldVariants = tv({
  slots: {
    wrapper: 'flex flex-row border border-black rounded-[32px]',
    label: 'font-roobert-semi text-body mb-2 font-semibold',
    input: 'font-roobert text-body min-h-11 py-3 px-6 w-full',
  },
  variants: {
    variant: {
      primary: {
        wrapper: 'border-black',
        label: 'text-black',
        input: 'text-black',
      },
      secondary: {
        wrapper: 'border-white',
        label: 'text-white',
        input: 'text-white opacity-100 placeholder:text-lightGray',
      },
    },
  },
});

const TextField = React.forwardRef<TextInput, TextFieldProps>(
  (
    {
      placeholder,
      value,
      onChangeText,
      variant = 'secondary',
      label,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value || '');

    const handleOnChange = useCallback(
      (text: string) => {
        setInputValue(text);

        if (typeof onChangeText === 'function') {
          onChangeText(text);
        }
      },
      [onChangeText]
    );

    const { wrapper, label: tvLabel, input } = textFieldVariants({ variant });

    return (
      <>
        <Text className={tvLabel()}>{label}</Text>
        <View className={wrapper()}>
          <TextInput
            {...props}
            ref={ref}
            className={input()}
            placeholder={placeholder}
            value={inputValue}
            onChangeText={handleOnChange}
          />
        </View>
      </>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;

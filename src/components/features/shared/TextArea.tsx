import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

const TextArea = React.forwardRef<TextInput, TextInputProps>(
  ({ placeholder, value, onChangeText, ...props }, ref) => {
    return (
      <TextInput
        {...props}
        ref={ref}
        multiline
        className="w-full min-h-11 text-body-small text-black"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;

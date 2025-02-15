import React from 'react';
import { View, ViewProps } from 'react-native';

interface FormWrapperProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

const FormWrapper = ({ children, className, ...props }: FormWrapperProps) => {
  return (
    <View
      className={`flex-1 bg-primary p-4 rounded-[32px] ${className}`}
      {...props}
    >
      {children}
    </View>
  );
};

export default FormWrapper;

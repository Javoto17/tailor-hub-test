import React from 'react';
import { View, ViewProps } from 'react-native';

interface FormWrapperProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

const FormWrapper = ({ children, className, ...props }: FormWrapperProps) => {
  return (
    <View
      className={` bg-primary p-4 py-8 rounded-[32px] ${className} min-h-[250px]`}
      {...props}
    >
      {children}
    </View>
  );
};

export default FormWrapper;

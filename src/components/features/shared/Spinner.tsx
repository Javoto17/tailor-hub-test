import React from 'react';
import { ActivityIndicator, View } from 'react-native';

interface SpinnerProps {
  className?: string;
  size?: 'small' | 'large';
}

const Spinner = ({
  className = 'text-primary',
  size = 'large',
}: SpinnerProps) => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size={size} className={className} />
    </View>
  );
};

export default Spinner;

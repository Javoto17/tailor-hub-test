import React from 'react';
import { ActivityIndicator, View } from 'react-native';

interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className = 'text-primary' }: SpinnerProps) => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" className={className} />
    </View>
  );
};

export default Spinner;

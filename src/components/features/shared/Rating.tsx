import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import StarIcon from './StarIcon';

const Rating: React.FC<{
  value: number;
  max?: number;
  onRate?: (value: number) => void;
}> = ({ value, max = 5, onRate }) => {
  return (
    <View className="flex-row items-center gap-x-1">
      {[...Array(max)].map((_, index) => (
        <TouchableOpacity key={index} onPress={() => onRate?.(index + 1)}>
          <StarIcon
            className={index < value ? 'text-primary' : 'text-black'}
            filled={index < value}
            width={18}
            height={18}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Rating;

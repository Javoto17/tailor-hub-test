import React from 'react';
import { View, TouchableOpacity, ViewProps } from 'react-native';
import StarIcon from './icons/StarIcon';

interface RatingProps extends ViewProps {
  value: number;
  max?: number;
  onRate?: (value: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  onRate,
  ...props
}) => {
  return (
    <View className="flex-row items-center gap-x-1" {...props}>
      {[...Array(max)].map((_, index) => (
        <TouchableOpacity
          key={`rating-${index + 1}`}
          onPress={() => onRate?.(index + 1)}
          testID={`rating-${index + 1}`}
          accessibilityState={{ selected: index < value }}
        >
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

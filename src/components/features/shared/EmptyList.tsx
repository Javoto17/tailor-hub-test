import React from 'react';
import { View, Text } from 'react-native';

interface EmptyListProps {
  text: string;
}

const EmptyList: React.FC<EmptyListProps> = ({ text }) => {
  return (
    <View
      className="flex-1 flex-grow items-center justify-center"
      testID="empty-list"
    >
      <Text className="text-caption text-secondary">{text}</Text>
    </View>
  );
};

export default EmptyList;

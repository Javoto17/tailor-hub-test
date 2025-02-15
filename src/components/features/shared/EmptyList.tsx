import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmptyListProps {
  text: string;
}

const EmptyList: React.FC<EmptyListProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#ccc',
  },
});

export default EmptyList;

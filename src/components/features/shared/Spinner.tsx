import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Spinner = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default Spinner;

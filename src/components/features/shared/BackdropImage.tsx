import React from 'react';
import { Image, StyleSheet } from 'react-native';

const BackdropImage: React.FC<{ source: string }> = ({ source, ...props }) => (
  <Image source={{ uri: source }} style={styles.backdropImage} {...props} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backdropImage: {
    width: '100%',
    height: 200,
  },
});

export default BackdropImage;

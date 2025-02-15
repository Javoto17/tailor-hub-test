import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ButtonIcon, { ButtonIconProps } from '../shared/ButtonIcon';

interface MovieHeaderProps {
  title: string;
  tagline: string;
  favoriteBtn?: ButtonIconProps;
}

const MovieHeader: React.FC<MovieHeaderProps> = ({
  title,
  tagline,
  favoriteBtn,
}) => (
  <View style={styles.titleSection}>
    <View>
      <Text style={styles.title}>{title}</Text>
      {tagline ? <Text style={styles.tagline}>{tagline}</Text> : null}
    </View>
    {favoriteBtn && (
      <ButtonIcon {...favoriteBtn} onPress={favoriteBtn?.onPress} />
    )}
  </View>
);

export default MovieHeader;

const styles = StyleSheet.create({
  titleSection: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
  },
});

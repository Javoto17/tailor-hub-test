import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MovieOverviewProps {
  overview: string;
}

const MovieOverview: React.FC<MovieOverviewProps> = ({ overview }) => (
  <View style={styles.overviewSection}>
    <Text style={styles.heading}>Overview</Text>
    <Text style={styles.overview}>{overview}</Text>
  </View>
);

const styles = StyleSheet.create({
  overviewSection: {
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    color: '#333',
  },
});

export default MovieOverview;

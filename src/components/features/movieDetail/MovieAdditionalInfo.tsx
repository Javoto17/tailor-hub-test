import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MovieAdditionalInfoProps {
  releaseDate?: string;
  runtime?: number;
  budget?: number;
  revenue?: number;
}

const MovieAdditionalInfo: React.FC<MovieAdditionalInfoProps> = ({
  releaseDate,
  runtime,
  budget,
  revenue,
}) => (
  <View style={styles.additionalInfoSection}>
    <Text style={styles.heading}>Additional Info</Text>
    <Text>Release Date: {releaseDate}</Text>
    <Text>Runtime: {runtime} minutes</Text>
    <Text>Budget: ${budget?.toLocaleString()}</Text>
    <Text>Revenue: ${revenue?.toLocaleString()}</Text>
  </View>
);

const styles = StyleSheet.create({
  additionalInfoSection: {
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default MovieAdditionalInfo;

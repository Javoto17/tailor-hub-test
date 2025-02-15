import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface MovieCardItem {
  id: number;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

interface MovieCardProps {
  movie: MovieCardItem;
  onPress: (id: MovieCardItem['id']) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(movie?.id)}
      testID={movie?.id.toString()}
    >
      <View style={styles.card}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={styles.poster}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.overview} numberOfLines={3}>
            {movie.overview}
          </Text>
          <Text style={styles.releaseDate}>
            Release Date: {movie.release_date}
          </Text>
          <Text style={styles.voteAverage}>
            Rating: {movie.vote_average} / 10
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  poster: {
    width: 100,
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  overview: {
    marginTop: 4,
    color: '#666',
  },
  releaseDate: {
    marginTop: 12,
    fontSize: 12,
    color: '#888',
  },
  voteAverage: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  genresWrapper: {
    paddingTop: 4,
  },
});

export default MovieCard;

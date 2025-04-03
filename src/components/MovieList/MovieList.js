import React from 'react';

import './MovieList.css';
import MovieCard from '../MovieCard/MovieCard';

const MovieList = () => {
  return (
    <div className="movie-list">
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
    </div>
  );
};

export default MovieList;

import React, { useState, useEffect } from 'react';

import './MovieList.css';
import MovieCard from '../MovieCard/MovieCard';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `https://api.themoviedb.org/3/search/movie?query=return&api_key=${API_KEY}`;

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovies(data.results.slice(0, 6));
      } catch (error) {
        console.error('Ошибка загрузки фильмов:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;

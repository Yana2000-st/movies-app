/* global process */
import React, { useState, useEffect } from 'react';
import { Row, Col, Input } from 'antd';

import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const { Search } = Input;

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('return');

  const fetchMovies = async (query) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`);
      const data = await response.json();
      setMovies(data.results.slice(0, 6));
    } catch (error) {
      console.error('Ошибка загрузки фильмов:', error);
    }
  };

  useEffect(() => {
    fetchMovies(searchQuery);
  }, [searchQuery]);

  return (
    <div className="movie-list">
      <Search
        placeholder="Type to search..."
        size="large"
        onSearch={(value) => setSearchQuery(value)}
        style={{ maxWidth: 1000, margin: '0 auto 32px', display: 'block' }}
      />
      <Row gutter={[16, 16]} justify="center">
        {movies.map((movie) => (
          <Col key={movie.id} xs={24} md={12}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MovieList;

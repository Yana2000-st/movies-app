import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Alert, Spin } from 'antd';

import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

const API_KEY = '0a1e72874ef8be4eaa52cdce332f473e';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('return');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOnline, setIsOnline] = useState(true);

  const fetchMovies = async (query) => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`);
      const data = await response.json();
      setMovies(data.results.slice(0, 6));
    } catch (error) {
      setError('Не удалось загрузить фильмы');
    } finally {
      setLoading(false);
    }
  };

  // Обработка статуса сети
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Проверяю в начале сеть
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isOnline) {
      fetchMovies(searchQuery);
    }
  }, [searchQuery, isOnline]);

  return (
    <div className="movie-list">
      {!isOnline && (
        <Alert
          message="Нет подключения к интернету"
          type="error"
          showIcon
          style={{ marginBottom: 20, textAlign: 'center' }}
        />
      )}

      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 20, textAlign: 'center' }} />}

      <Input.Search
        placeholder="Type to search..."
        size="large"
        onSearch={(value) => setSearchQuery(value)}
        style={{ maxWidth: 1000, margin: '0 auto 32px', display: 'block' }}
      />

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {movies.map((movie) => (
            <Col key={movie.id} xs={24} md={12}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default MovieList;

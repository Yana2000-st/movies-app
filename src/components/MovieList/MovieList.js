import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Alert, Spin, Pagination } from 'antd';

import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

const API_KEY = '0a1e72874ef8be4eaa52cdce332f473e';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('return');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Загрузка фильмов
  const fetchMovies = async (query, pageNumber) => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&page=${pageNumber}`
      );
      const data = await response.json();
      setMovies(data.results.slice(0, 6));
      setTotalResults(data.total_results);
    } catch (error) {
      setError('Не удалось загрузить фильмы');
    } finally {
      setLoading(false);
    }
  };

  // Проверка интернетa
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setIsOnline(navigator.onLine); // при старте

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Загружаю фильмы
  useEffect(() => {
    if (isOnline) {
      fetchMovies(searchQuery, page);
    }
  }, [searchQuery, page, isOnline]);

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
        onSearch={(value) => {
          setSearchQuery(value);
          setPage(1);
        }}
        style={{ maxWidth: 1000, margin: '0 auto 32px', display: 'block' }}
      />

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]} justify="center">
            {movies.map((movie) => (
              <Col key={movie.id} xs={24} md={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <div className="paginationContainer">
            <Pagination
              current={page}
              pageSize={6}
              total={totalResults}
              onChange={(newPage) => setPage(newPage)}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MovieList;

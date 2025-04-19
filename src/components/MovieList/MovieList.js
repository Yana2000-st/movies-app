import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Input, Alert, Spin, Pagination } from 'antd';
import { debounce } from 'lodash';

import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

const API_KEY = '0a1e72874ef8be4eaa52cdce332f473e';

const MovieList = ({ guestSessionId }) => {
  const [movies, setMovies] = useState([]); //массив всех найденных фильмов
  const [searchQuery, setSearchQuery] = useState(''); // Поиск
  const [loading, setLoading] = useState(false); //Загрузка фильма
  const [error, setError] = useState(''); //Сообщение об ошбике
  const [isOnline, setIsOnline] = useState(true); //Подключен ли интернет
  const [page, setPage] = useState(1); //Текущая страница фильмов
  const [totalResults, setTotalResults] = useState(0); //Все страницы фильмов

  const pageSize = 6; //По макету показываю 6 фильмов

  const fetchMovies = async (query, pageNumber) => {
    try {
      setLoading(true); //Показываю спинер, пока загружаются фильмы
      setError('');
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&page=${pageNumber}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setMovies(data.results.slice(0, pageSize));
        setTotalResults(data.total_results);
      } else {
        setMovies([]);
        setTotalResults(0);
      }
    } catch (error) {
      setError('Не удалось загрузить фильмы');
    } finally {
      setLoading(false); //В любом случае убираю спинер
    }
  };
  //Проверка на интернет
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  // Загружаю фильмы при изменении поиска или страницы
  useEffect(() => {
    if (isOnline && searchQuery.trim() !== '') {
      fetchMovies(searchQuery, page);
    } else {
      setMovies([]);
      setTotalResults(0);
    }
  }, [searchQuery, page, isOnline]);
  //Задержка при наборе текста
  const debouncedSearch = useCallback(
    debounce((value) => {
      setPage(1);
      setSearchQuery(value);
    }, 800),
    []
  );
  // Отменяю отложенный вызов debounce
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  return (
    <div className="movie-list">
      {!isOnline && (
        <Alert
          message="Проверьте подключение к интернету"
          type="error"
          showIcon
          style={{ marginBottom: 20, textAlign: 'center' }}
        />
      )}

      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 20, textAlign: 'center' }} />}

      <Input
        placeholder="Type to search..."
        size="large"
        onChange={(e) => debouncedSearch(e.target.value)}
        style={{ maxWidth: 1000, margin: '0 auto 32px', display: 'block' }}
      />

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          {movies.length === 0 && searchQuery && !loading && (
            <Alert message="Фильмы не найдены" type="info" style={{ textAlign: 'center', marginBottom: 20 }} />
          )}

          <Row gutter={[16, 16]} justify="center">
            {movies.map((movie) => (
              <Col key={movie.id} xs={24} md={12}>
                <MovieCard movie={movie} guestSessionId={guestSessionId} />
              </Col>
            ))}
          </Row>

          {totalResults > pageSize && (
            <div className="paginationContainer">
              <Pagination
                current={page}
                pageSize={pageSize}
                total={totalResults}
                onChange={(newPage) => setPage(newPage)}
                showSizeChanger={false}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MovieList;

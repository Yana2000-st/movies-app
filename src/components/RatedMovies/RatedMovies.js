import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Alert, Pagination } from 'antd';

import MovieCard from '../MovieCard/MovieCard';

const API_KEY = '0a1e72874ef8be4eaa52cdce332f473e';

const RatedMovies = ({ guestSessionId }) => {
  const [ratedMovies, setRatedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 6;

  useEffect(() => {
    const fetchRated = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${API_KEY}&page=${page}`
        );
        const data = await res.json();
        setRatedMovies(data.results || []);
        setTotalResults(data.total_results || 0);
      } catch (err) {
        setError('Ошибка загрузки оценённых фильмов');
      } finally {
        setLoading(false);
      }
    };

    if (guestSessionId) fetchRated();
  }, [guestSessionId, page]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message={error} type="error" showIcon style={{ textAlign: 'center', marginBottom: 20 }} />;
  }

  return (
    <>
      <Row gutter={[16, 16]} justify="center">
        {ratedMovies.map((movie) => (
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
  );
};

export default RatedMovies;

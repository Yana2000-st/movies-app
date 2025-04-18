import React, { useContext } from 'react';
import { Rate } from 'antd';
import { format } from 'date-fns';

import GenresContext from '../GenresContext/GenresContext';
import './MovieCard.css';

const API_KEY = '0a1e72874ef8be4eaa52cdce332f473e';

const MovieCard = ({ movie, guestSessionId }) => {
  const genresList = useContext(GenresContext);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

  const formattedDate = movie.release_date ? format(new Date(movie.release_date), 'dd MMMM yyyy') : 'Дата неизвестна';

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, text.lastIndexOf(' ', maxLength)) + '...';
  };

  const rateMovie = async (value) => {
    try {
      await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/rating?api_key=${API_KEY}&guest_session_id=${guestSessionId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          body: JSON.stringify({ value }),
        }
      );
      console.log(`Оценка ${value} для фильма "${movie.title}" отправлена`);
    } catch (err) {
      console.error('Ошибка при голосовании:', err);
    }
  };

  const getRatingColor = (vote) => {
    if (vote < 3) return '#E90000';
    if (vote < 5) return '#E97E00';
    if (vote < 7) return '#E9D100';
    return '#66E900';
  };

  const getGenreNames = (ids) => {
    return ids
      .map((id) => {
        const genre = genresList.find((g) => g.id === id);
        return genre ? genre.name : null;
      })
      .filter(Boolean);
  };

  return (
    <div className="movie-card">
      <div className="cover">
        <img src={posterUrl} alt={movie.title} className="image" />
      </div>
      <div className="info-wrapper">
        <div className="info-top">
          <h3 className="title">{movie.title}</h3>
          <p className="date">{formattedDate}</p>
          <div className="genres">
            {getGenreNames(movie.genre_ids || []).map((name) => (
              <span key={name} className="genre-tag">
                {name}
              </span>
            ))}
          </div>
        </div>
        <div className="info-bottom">
          <p className="description">{truncateText(movie.overview, 150)}</p>
          <div className="rating-section">
            <Rate allowHalf count={10} onChange={rateMovie} defaultValue={movie.rating || 0} />
          </div>
        </div>
      </div>

      <div className="circle-rating" style={{ backgroundColor: getRatingColor(movie.vote_average) }}>
        {movie.vote_average.toFixed(1)}
      </div>
    </div>
  );
};

export default MovieCard;

import React from 'react';
import { format } from 'date-fns';
import './MovieCard.css';

const renderStars = (rating) => {
  const stars = Math.round(rating / 2);
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < stars ? 'gold' : 'gray', fontSize: '18px' }}>
      ★
    </span>
  ));
};

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
  const formattedDate = movie.release_date ? format(new Date(movie.release_date), 'dd MMMM yyyy') : 'Дата неизвестна';
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, text.lastIndexOf(' ', maxLength)) + '...';
  };

  return (
    <div className="movie-card">
      <div className="cover">
        <img src={posterUrl} alt={movie.title} className="image" />
      </div>
      <div className="details">
        <h3 className="title">{movie.title}</h3>
        <p className="date">{formattedDate}</p>
        <p className="description">{truncateText(movie.overview, 100)}</p>
        <div className="rating">
          {renderStars(movie.vote_average)} ({movie.vote_average})
        </div>
      </div>
      <div className="circle-rating">{movie.vote_average}</div>
    </div>
  );
};

export default MovieCard;

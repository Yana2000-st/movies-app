import React from 'react';
import './MovieCard.css';
import { Rate } from 'antd';
import { format } from 'date-fns';

// {
//   title: "The way back",
//   release_date: "March 5, 2020",
//   vote_average: 6.6,
//   overview: "A former basketball all-star, who has lost his wife and family foundation...",
//   poster_path: "http"
// }

const MovieCard = ({ movie }) => {
  // Если есть постер — показываю его, иначе — пустую картинку
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

  // Форматирую дату, если она есть, иначе дата неизвестна
  const formattedDate = movie.release_date ? format(new Date(movie.release_date), 'dd MMMM yyyy') : 'Дата неизвестна';

  // Обрезаю описание фильма
  const truncateText = (text, maxLength) => {
    if (!text) {
      return '';
    }
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, text.lastIndexOf(' ', maxLength)) + '...';
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
            <span className="genre-tag">Action</span>
            <span className="genre-tag">Drama</span>
          </div>
        </div>
        <div className="info-bottom">
          <p className="description">{truncateText(movie.overview, 150)}</p>
          <div className="rating-section">
            <Rate disabled allowHalf defaultValue={movie.vote_average} count={10} />
          </div>
        </div>
      </div>

      <div className="circle-rating">{movie.vote_average.toFixed(1)}</div>
    </div>
  );
};

export default MovieCard;

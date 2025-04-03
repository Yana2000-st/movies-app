import React from 'react';

import './MovieCard.css';
import coverImage from '../../image/cover.png';

const MovieCard = () => {
  return (
    <div className="movie-card">
      <div className="cover">
        <img src={coverImage} alt="Movie Poster" className="image" />
      </div>
      <div className="details">
        <h3 className="title">The way back</h3>
        <p className="date">March 5, 2020 </p>
        <div className="genre">
          <span className="genre-tag">Action</span>
          <span className="genre-tag">Drama</span>
        </div>
        <p className="description">
          A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction
          attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...
        </p>
        <div className="rating">⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐</div>
      </div>
      <div className="circle-rating">6.6</div>
    </div>
  );
};

export default MovieCard;

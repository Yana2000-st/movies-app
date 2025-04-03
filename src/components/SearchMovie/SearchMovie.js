import React from 'react';
import './SearchMovie.css';

const SearchMovie = () => {
  return (
    <div className="search-container">
      <div className="labels">
        <span className="search-label">Search</span>
        <span className="rated-label">Rated</span>
      </div>
      <input type="text" className="search-input" placeholder="Type to search..." />
    </div>
  );
};

export default SearchMovie;

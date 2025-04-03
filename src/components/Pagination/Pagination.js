import React from 'react';
import './Pagination.css';

const Pagination = () => {
  return (
    <div className="pagination-container">
      <button className="arrow">←</button>
      {[1, 2, 3, 4, 5].map((num) => (
        <button key={num} className="page">
          {num}
        </button>
      ))}
      <button className="arrow">→</button>
    </div>
  );
};

export default Pagination;

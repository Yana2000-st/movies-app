import React from 'react';

import './App.css';
import SearchMovie from '../SearchMovie/SearchMovie';
import MovieList from '../MovieList/MovieList';
import Pagination from '../Pagination/Pagination';

function App() {
  return (
    <div className="App">
      <SearchMovie />
      <MovieList />
      <Pagination />
    </div>
  );
}

export default App;

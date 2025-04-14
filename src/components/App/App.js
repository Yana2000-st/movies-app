import React from 'react';

import './App.css';
import SearchMovie from '../SearchMovie/SearchMovie';
import MovieList from '../MovieList/MovieList';

function App() {
  return (
    <div className="App">
      <SearchMovie />
      <MovieList />
    </div>
  );
}

export default App;

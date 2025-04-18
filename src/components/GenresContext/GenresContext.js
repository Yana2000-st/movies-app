import React, { createContext, useState, useEffect } from 'react';

const GenresContext = createContext([]);

const API_KEY = '0a1e72874ef8be4eaa52cdce332f473e';

export const GenresProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
      const data = await res.json();
      setGenres(data.genres);
    };

    fetchGenres();
  }, []);

  return <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>;
};

export default GenresContext;

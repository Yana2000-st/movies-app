import React, { createContext, useState, useEffect } from 'react';

const GenresContext = createContext([]); // Создаю контекст с начальным значением []

const API_KEY = '0a1e72874ef8be4eaa52cdce332f473e';

export const GenresProvider = ({ children }) => {
  const [genres, setGenres] = useState([]); // Храню список жанров

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
      const data = await res.json();
      setGenres(data.genres); // Сохраняю полученные с апи жанры в состояние
    };

    fetchGenres();
  }, []);
  // Жанры доступны всем детям
  return <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>;
};

export default GenresContext;

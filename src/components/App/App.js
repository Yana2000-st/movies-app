import React, { useEffect, useState } from 'react';
import { Tabs, Spin } from 'antd';

import './App.css';
import MovieList from '../MovieList/MovieList';
import RatedMovies from '../RatedMovies/RatedMovies';
import { GenresProvider } from '../GenresContext/GenresContext';

const API_KEY = '0a1e72874ef8be4eaa52cdce332f473e';

function App() {
  const [guestSessionId, setGuestSessionId] = useState(null);

  useEffect(() => {
    const createGuestSession = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`);
        const data = await res.json();
        setGuestSessionId(data.guest_session_id);
      } catch (error) {
        console.error('Ошибка при создании гостевой сессии', error);
      }
    };

    createGuestSession();
  }, []);

  return (
    <GenresProvider>
      <div className="App">
        {!guestSessionId ? (
          <div style={{ textAlign: 'center', marginTop: 50 }}>
            <Spin size="large" />
          </div>
        ) : (
          <Tabs
            defaultActiveKey="1"
            centered
            items={[
              {
                label: 'Search',
                key: '1',
                children: <MovieList guestSessionId={guestSessionId} />,
              },
              {
                label: 'Rated',
                key: '2',
                children: <RatedMovies guestSessionId={guestSessionId} />,
              },
            ]}
          />
        )}
      </div>
    </GenresProvider>
  );
}

export default App;

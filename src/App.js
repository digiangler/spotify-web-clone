import React, { useEffect } from 'react';

import SpotifyWebApi from 'spotify-web-api-js';

import './App.css';
import Login from './Login';
import Player from './Player';
import { useStateProviderValue } from './StateProvider';
import { getTokenFromUrl } from './spotify';

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useStateProviderValue();

  // Run Code based on [] condition
  useEffect(() => {
    const hash = getTokenFromUrl();
    // clear the token from the url (safety)
    window.location.hash = '';
    // take the actual token from hash object {}
    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      });

      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        console.log('😎 person', user);
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists,
        });
      });

      spotify.getPlaylist('0OcgwYhdd3LgFYOFQl2iIj').then((response) =>
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response,
        })
      );

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: 'SET_TOP_ARTISTS',
          top_artists: response,
        })
      );
    }

    console.log('I Have a token 👉', token);
  }, [token, dispatch]);

  return (
    <div className='app'>
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;

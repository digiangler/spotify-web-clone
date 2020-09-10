// Use for all spotify project logic
// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#

// throw the user to spotify
export const authEndpoint = 'https://accounts.spotify.com/authorize';

const redirectUri = 'http://localhost:3000/';

// id from official spotify for developer project
const clientId = '13e44a5a6e9945bf99a23db5e74c7f31';

const scopes = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-top-read',
  'user-modify-playback-state',
];

// get token from response
export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      var parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

// ------------------------------------ Create Url

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;

// %20 --> ascii code for white space

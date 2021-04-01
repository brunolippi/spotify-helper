import logo from "../logo.svg";
import "../App.css";

const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "17fe4d950d0a4aea98cb4de221277d80";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-library-read",
  "user-library-modify",
  "playlist-modify-private",
  "playlist-modify-public",
];

function Login(){

    return(
        <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      
        <a
          className="btn btn-success"
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=code&show_dialog=false`}
        >
          Login with Spotify
        </a>
      
      </header>
    </div>
    )
}

export default Login;
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from "react-bootstrap"
import NavBar from './components/NavBar';
import Playlist from './components/Playlist';
import Sidebar from './components/Sidebar';
import Library from './components/Library';
import Info from './components/Info';
import Home from './Home'
import Login from './components/Login';
import { BrowserRouter, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import Profile from './components/Profile';
import Albums from './components/Albums';
import Album from './components/Album';
import getProfile from "./helpers/getProfile"

const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const redirect_uri = "https://spotify-helper.netlify.app";

function App() {
  const [accessToken, setAccessToken] = useState();
  const [profile, setProfile] = useState();

  function getToken(token) {
    return new Promise(function(resolve, reject) {
      fetch(tokenEndpoint, { 
        method: 'post', 
        headers: new Headers({
          'Authorization': 'Basic '+btoa('17fe4d950d0a4aea98cb4de221277d80:4bfa4244e8584f539ed82b380641dca7'), 
          'Content-Type': 'application/x-www-form-urlencoded'
        }), 
        body: new URLSearchParams({
          "grant_type": "authorization_code",
          "code": token,
          "redirect_uri": redirect_uri
        })
      })
        .then(res => res.json())
        .then(res => {
          resolve(res)
        });
    })
  }

  function Logout() {
    setAccessToken(undefined);
  }

  useEffect(() => {
    let params = (new URL(document.location)).searchParams;
    let _token = params.get("code");
    if (_token) {
      getToken(_token).then(res => {
      setAccessToken(res.access_token)
      getProfile(res.access_token).then(res => {
        setProfile(res)
      })
    })
    }
  }, [])
  

  return (
    <BrowserRouter>
      <div>
        <NavBar logout={Logout} logged={accessToken} profile={profile}></NavBar>
        {accessToken && <Sidebar logout={Logout} />}
        {accessToken ?
        <div className="pt-5">
                <Col md={accessToken && { span: 10, offset: 2 }}>
                    <div className='justify-content-md-center' id="full">
                        <div className={accessToken && 'pageBox p-4'}>
                              <>
                                <Route exact path="/"><Home token={accessToken} /></Route>
                                <Route exact path="/playlist/:id"><Playlist token={accessToken} /></Route>
                                <Route exact path="/profile"><Profile token={accessToken} /></Route>
                                <Route exact path="/library"><Library token={accessToken} /></Route>
                                <Route exact path="/album/:id"><Album token={accessToken} /></Route>
                                <Route exact path="/albums"><Albums token={accessToken} /></Route>
                                <Route exact path="/info"><Info /></Route>
                                <Route exact path="/login"><Login /></Route>
                              </>
                        </div>
                    </div>
                </Col>
            </div>
    : <Login />}
      </div>
    </BrowserRouter>
  );
}

export default App;

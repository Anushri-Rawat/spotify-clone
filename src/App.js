import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./services/tokenSlice";
import Spotify from "./components/Spotify";
import SpotifyWebApi from "spotify-web-api-js"; //connect spotify to react

export const spotifyVal = new SpotifyWebApi();

function App() {
  const token = useSelector((state) => state.token.token);
  const dispatch = useDispatch();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const tokenVal = hash.substring(1).split("&")[0].split("=")[1];
      dispatch(setToken(tokenVal));
      spotifyVal.setAccessToken(tokenVal); //allows u to talk back and forth betw react and spotify api.
      window.location.hash = "";
    }
  }, [token, dispatch]);

  return <>{token ? <Spotify /> : <Login />}</>;
}

export default App;

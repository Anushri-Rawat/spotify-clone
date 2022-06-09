import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./services/tokenSlice";
import Spotify from "./components/Spotify";

function App() {
  const token = useSelector((state) => state.token.token);
  const dispatch = useDispatch();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const tokenVal = hash.substring(1).split("&")[0].split("=")[1];
      dispatch(setToken(tokenVal));
    }
  }, [token, dispatch]);

  return <>{token ? <Spotify /> : <Login />}</>;
}

export default App;

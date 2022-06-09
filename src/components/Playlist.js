import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, usedispatch, useDispatch } from "react-redux";
import { setPlaylist, setSelectedPlaylistId } from "../services/tokenSlice";
import "../App.css";

function Playlist() {
  const { token, playlist } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlists = items.map(({ name, id }) => {
        return { name, id };
      });
      dispatch(setPlaylist(playlists));
    };
    getPlaylistData();
  }, [token, dispatch]);

  const changeCurrentPlaylist = (id) => {
    dispatch(setSelectedPlaylistId(id));
  };

  return (
    <div className="menuContainer playlist-container">
      <p>Playlist</p>
      <ul>
        {playlist.map(({ name, id }) => (
          <li key={id} onClick={() => changeCurrentPlaylist(id)}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Playlist;

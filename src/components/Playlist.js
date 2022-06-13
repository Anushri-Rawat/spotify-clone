import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlaylist, setSelectedPlaylistId } from "../services/tokenSlice";
import "../App.css";
import { spotifyVal } from "../App";
import { Link } from "react-router-dom";

function Playlist() {
  const { token, playlist } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    spotifyVal.getUserPlaylists().then((data) => {
      const playlists = data.items.map(({ name, id }) => {
        return { name, id };
      });
      dispatch(setPlaylist(playlists));
    });
  }, [dispatch]);

  const changeCurrentPlaylist = (id) => {
    dispatch(setSelectedPlaylistId(id));
  };

  return (
    <div className="menuContainer playlist-container">
      <p>Playlist</p>
      <ul>
        {playlist.map(({ name, id }) => (
          <Link to={`/playlist/${id}`} key={id}>
            <li onClick={() => changeCurrentPlaylist(id)}>{name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Playlist;

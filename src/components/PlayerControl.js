import React, { useEffect } from "react";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setPlayerState, setPlaying } from "../services/tokenSlice";
import axios from "axios";
import { spotifyVal } from "../App";

function PlayerControl() {
  const { token, playerState } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const skipNext = () => {
    spotifyVal.skipToNext();
    spotifyVal.getMyCurrentPlayingTrack().then((r) => {
      if (r !== "") {
        const currentPlaying = {
          id: r.item.id,
          name: r.item.name,
          artists: r.item.artists.map((artist) => artist.name),
          image: r.item.album.images[2].url,
        };
        dispatch(setPlaying(currentPlaying));
      }
      dispatch(setPlayerState(true));
    });
  };

  const skipPrevious = () => {
    spotifyVal.skipToPrevious();
    spotifyVal.getMyCurrentPlayingTrack().then((r) => {
      if (r !== "") {
        const currentPlaying = {
          id: r.item.id,
          name: r.item.name,
          artists: r.item.artists.map((artist) => artist.name),
          image: r.item.album.images[2].url,
        };
        dispatch(setPlaying(currentPlaying));
      }
      dispatch(setPlayerState(true));
    });
  };

  const changeState = async () => {
    // const state = playerState ? "pause" : "play";
    // const response = await axios.put(
    //   `https://api.spotify.com/v1/me/player/${state}`,
    //   {},
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + token,
    //     },
    //   }
    // );
    dispatch(setPlayerState(!playerState));
  };

  useEffect(() => {}, [token, dispatch]);
  return (
    <div className="playerControls">
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous" onClick={skipPrevious}>
        <CgPlayTrackPrev />
      </div>
      <div className="state">
        {playerState ? (
          <BsFillPauseCircleFill onClick={changeState} />
        ) : (
          <BsFillPlayCircleFill onClick={changeState} />
        )}
      </div>
      <div className="next" onClick={skipNext}>
        <CgPlayTrackNext />
      </div>
      <div className="repeat">
        <FiRepeat />
      </div>
    </div>
  );
}

export default PlayerControl;

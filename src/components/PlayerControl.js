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

function PlayerControl() {
  const { token, playerState } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    const response1 = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response1.data !== "") {
      const currentPlaying = {
        id: response1.data.item.id,
        name: response1.data.item.name,
        artists: response1.data.item.artists.map((artist) => artist.name),
        image: response1.data.item.album.images[2].url,
      };
      dispatch(setPlaying(currentPlaying));
    } else {
      dispatch(setPlaying(null));
    }
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
      <div className="previous" onClick={() => changeTrack("previous")}>
        <CgPlayTrackPrev />
      </div>
      <div className="state">
        {playerState ? (
          <BsFillPauseCircleFill onClick={changeState} />
        ) : (
          <BsFillPlayCircleFill onClick={changeState} />
        )}
      </div>
      <div className="next" onClick={() => changeTrack("next")}>
        <CgPlayTrackNext />
      </div>
      <div className="repeat">
        <FiRepeat />
      </div>
    </div>
  );
}

export default PlayerControl;

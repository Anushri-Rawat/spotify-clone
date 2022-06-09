import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPlaying } from "../services/tokenSlice";

function CurrentTrack() {
  const { token, currentlyPlaying } = useSelector((state) => state.token);
  const dispatch = useDispatch();
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        ` https://api.spotify.com/v1/me/player/currently-playing`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data !== "") {
        const { item } = response.data;
        const currentPlaying = {
          id: item.id,
          name: item.name,
          artists: item.artists.map((artist) => artist.name),
          image: item.album.images[2].url,
        };

        dispatch(setPlaying(currentPlaying));
      }
    };
    getCurrentTrack();
  }, [dispatch, token]);

  return (
    <>
      {currentlyPlaying && (
        <div className="track">
          <div className="track__image">
            <img src={currentlyPlaying.image} alt="currentlyPlaying" />
          </div>
          <div className="track__info">
            <h4 className="track__info__track__name">
              {currentlyPlaying.name}
            </h4>
            <h6 className="track__info__track__artists">
              {currentlyPlaying.artists.join(", ")}
            </h6>
          </div>
        </div>
      )}
    </>
  );
}

export default CurrentTrack;

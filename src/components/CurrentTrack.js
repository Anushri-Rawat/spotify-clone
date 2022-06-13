import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPlaying } from "../services/tokenSlice";
import { spotifyVal } from "../App";

function CurrentTrack() {
  const { token, currentlyPlaying } = useSelector((state) => state.token);
  const dispatch = useDispatch();
  useEffect(() => {
    spotifyVal.getMyCurrentPlaybackState().then((r) => {
      if (r !== "") {
        const { item } = r;
        const currentPlaying = {
          id: item.id,
          name: item.name,
          artists: item.artists.map((artist) => artist.name),
          image: item.album.images[2].url,
        };

        dispatch(setPlaying(currentPlaying));
      }
    });
  }, [spotifyVal, dispatch]);

  return (
    <>
      {currentlyPlaying ? (
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
      ) : (
        <div className="track">
          <div className="track__image">
            <img
              src={`https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e5a`}
              alt="currentlyPlaying"
              style={{ width: "66px", height: "66px" }}
            />
          </div>
          <div className="track__info">
            <h4 className="track__info__track__name">driver's license</h4>
            <h6 className="track__info__track__artists">Olivia Rodrigo</h6>
          </div>
        </div>
      )}
    </>
  );
}

export default CurrentTrack;

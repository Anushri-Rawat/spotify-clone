import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function Volume() {
  const { token } = useSelector((state) => state.token);
  const setVolume = async (e) => {
    console.log("heell");
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  };
  return (
    <div className="volumeContainer">
      <input type="range" onMouseUp={(e) => setVolume(e)} min={0} max={100} />
    </div>
  );
}

export default Volume;

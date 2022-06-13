import React from "react";

function Card({ image, albumName, artists, description }) {
  return (
    <>
      <div className="dashboard-image">
        <img src={image} />
      </div>
      <p className="album-name">{albumName}</p>
      <span>
        {artists ? artists.map((artist) => artist.name).join(",") : description}
      </span>
    </>
  );
}

export default Card;

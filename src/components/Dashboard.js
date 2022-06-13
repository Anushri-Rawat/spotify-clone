import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { spotifyVal } from "../App";
import {
  setFeatured,
  setRecentlyPlayed,
  setReleases,
} from "../services/Categories";
import Card from "../Containers/Card";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { recentlyPlayed, recommendations, featured, releases } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    spotifyVal.getMyRecentlyPlayedTracks().then((r) => {
      dispatch(setRecentlyPlayed(r.items));
    });
    spotifyVal.getFeaturedPlaylists().then((r) => {
      dispatch(setFeatured(r.playlists.items));
    });
    spotifyVal.getNewReleases().then((r) => {
      dispatch(setReleases(r.albums.items));
    });
  }, [spotifyVal, dispatch]);

  return (
    <div className="dashboardContainer">
      <div className="dashboard-title">
        <h1>Recently Played</h1>
      </div>
      <ul className="dashboard-row">
        {recentlyPlayed?.map((el, i) => {
          if (i < 5) {
            return (
              <li key={i}>
                <Card
                  image={el.track.album.images[0].url}
                  albumName={el.track.name}
                  artists={el.track.artists}
                />
              </li>
            );
          }
        })}
      </ul>
      <div className="dashboard-title">
        <h1>Featured Playlists</h1>
      </div>
      <ul className="dashboard-row">
        {featured?.map(({ id, name, images, description }, i) => {
          if (i < 5) {
            return (
              <li key={id}>
                <Card
                  image={images[0].url}
                  albumName={name}
                  description={description.startsWith("<a") ? "" : description}
                />
              </li>
            );
          }
        })}
      </ul>
      <div className="dashboard-title">
        <h1>New Releases</h1>
      </div>
      <ul className="dashboard-row">
        {releases?.map(({ id, name, images, artists }, i) => {
          if (i < 5) {
            return (
              <li key={id}>
                <Card
                  image={images[0].url}
                  albumName={name}
                  artists={artists}
                />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Dashboard;
{
  /* <div>
        <h1>Country</h1>
      </div>
      <div>
        {recommendations?.country &&
          recommendations.country.map(({ name, id, album }, i) => (
            <div key={id}>
              <img src={album.images[0].url} />
              <p>
                {name}:{album.artists[0].name}
              </p>
            </div>
          ))}
      </div>
      <div>
        <h1>Classical</h1>
      </div>
      <div>
        {recommendations?.classical &&
          recommendations.classical.map(({ name, id, album }, i) => (
            <div key={id}>
              <img src={album.images[0].url} />
              <p>
                {name}:{album.artists[0].name}
              </p>
            </div>
          ))}
      </div>*/
}

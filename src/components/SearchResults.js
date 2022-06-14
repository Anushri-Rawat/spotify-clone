import React, { useEffect } from "react";
import { spotifyVal } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setCategories, setReleases } from "../services/Categories";
import Card from "../Containers/Card";

function SearchResults() {
  const dispatch = useDispatch();
  const { releases, categories } = useSelector((state) => state.categories);

  useEffect(() => {
    spotifyVal.getCategories().then((r) => {
      console.log(r.categories.items);
      dispatch(setCategories(r.categories.items));
    });
    spotifyVal.getNewReleases().then((r) => {
      dispatch(setReleases(r.albums.items));
    });
  }, [spotifyVal, dispatch]);

  return (
    <div className="dashboardContainer">
      <div className="dashboard-title">
        <h1>New Releases</h1>
      </div>
      <ul className="dashboard-row">
        {releases?.map(({ id, name, images, artists }, i) => {
          if (i < 10) {
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
      <div className="dashboard-title">
        <h1>Your Top Genres</h1>
      </div>
      <ul className="dashboard-row">
        {categories?.map(({ id, name, icons }, i) => {
          if (i < 10) {
            return (
              <li key={id}>
                <Card image={icons[0]?.url} albumName={name} />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default SearchResults;

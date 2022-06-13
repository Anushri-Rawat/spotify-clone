import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { spotifyVal } from "../App";
import { setSearchResults } from "../services/tokenSlice";
import { MdOutlineCancel } from "react-icons/md";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Navbar = ({ navBackground }) => {
  const { user, searchResults } = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const navigate = useNavigate();

  const searchHandler = () => {
    if (inputRef.current.value == "") dispatch(setSearchResults([]));
    else {
      spotifyVal.searchTracks(inputRef.current.value).then((r) => {
        const { items } = r.tracks;
        dispatch(setSearchResults(items));
      });
    }
  };

  const resetHandler = () => {
    inputRef.current.value = "";
    dispatch(setSearchResults([]));
  };

  return (
    <>
      <div
        className="navbar-container"
        style={{ background: `${navBackground ? "rgba(0,0,0,0.7)" : "none"}` }}
      >
        <div className="search_and_arrows">
          <div className="control-button">
            <div
              className="previous_btn"
              onClick={() => {
                navigate(-1);
              }}
            >
              <IoChevronBackOutline
                style={{
                  color: "#fff",
                  width: "16px",
                  height: "16px",
                  fontWeight: "bold",
                }}
              />
            </div>
            <div
              className="next_btn"
              onClick={() => {
                navigate(1);
              }}
            >
              <MdNavigateNext
                style={{ color: "#fff", width: "22px", height: "22px" }}
              />
            </div>
          </div>

          <div className="search__bar">
            <FaSearch />
            <input
              type="text"
              ref={inputRef}
              placeholder="Search songs"
              onChange={searchHandler}
            />
            <MdOutlineCancel onClick={resetHandler} />
          </div>
        </div>
        <div className="avatar">
          <a href="#">
            <CgProfile />
            <span>{user?.username}</span>
          </a>
        </div>
      </div>
      {searchResults.length > 0 ? (
        <div className="searchResults">
          {searchResults.map((r) => (
            <div key={r.id}>
              <img src={r.album.images[2].url} />
              <div className="track__info">
                <span className="track__info__track__name">{r.name}</span>
                <span className="track__info__track__artists">
                  {r.artists[0].name}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;

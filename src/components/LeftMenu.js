import React, { useState } from "react";
import { FaItunesNote } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { MenuList } from "./MenuList";
import Playlist from "./Playlist";
import { BsFillHouseFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { setIsSearching } from "../services/tokenSlice";
import { useDispatch } from "react-redux/es/exports";

const LeftMenu = () => {
  const dispatch = useDispatch();

  document.querySelectorAll(".menuContainer ul li").forEach((li) => {
    li.addEventListener("click", (e) => {
      if (e.target.textContent == "Search") dispatch(setIsSearching(true));
      else dispatch(setIsSearching(false));
    });
  });

  return (
    <div className="leftMenu">
      <div className="logoContainer">
        <FaItunesNote style={{ fontSize: "40px" }} />
        <h2>MusiQ</h2>
      </div>
      <div className="menuContainer">
        <p>Menu</p>
        <ul>
          <Link to="/">
            <li key={"1"}>
              <i>
                <BsFillHouseFill />
              </i>
              <span>Home</span>
            </li>
          </Link>
          <Link to="/search">
            <li key={"2"}>
              <i>
                <BiSearchAlt />
              </i>
              <span>Search</span>
            </li>
          </Link>
          {MenuList.map((li) => (
            <li key={li.id}>
              <i>{li.icon}</i>
              <span>{li.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <Playlist />
    </div>
  );
};

export default LeftMenu;

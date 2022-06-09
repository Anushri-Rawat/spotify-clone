import React, { useState } from "react";
import { FaItunesNote } from "react-icons/fa";
import { MenuList } from "./MenuList";
import Playlist from "./Playlist";

const LeftMenu = () => {
  return (
    <div className="leftMenu">
      <div className="logoContainer">
        <FaItunesNote style={{ fontSize: "40px" }} />
        <h2>MusiQ</h2>
      </div>
      <div className="menuContainer">
        <p>Menu</p>
        <ul>
          {MenuList.map((li) => (
            <li key={li.id}>
              <i>{li.icon}</i>
              <span> {li.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <Playlist />
    </div>
  );
};

export default LeftMenu;

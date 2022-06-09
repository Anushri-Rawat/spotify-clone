import React from "react";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const Navbar = ({ navBackground }) => {
  const { user } = useSelector((state) => state.token);
  return (
    <div
      className="navbar-container"
      style={{ background: `${navBackground ? "rgba(0,0,0,0.7)" : "none"}` }}
    >
      <div className="search__bar">
        <FaSearch />
        <input type="text" placeholder="Artists,songs,or podcasts" />
      </div>
      <div className="avatar">
        <a href="#">
          <CgProfile />
          <span>{user?.username}</span>
        </a>
      </div>
    </div>
  );
};

export default Navbar;

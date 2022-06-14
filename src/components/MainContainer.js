import React, { useRef, useState } from "react";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import PlaylistSection from "./PlaylistSection";
import SearchResults from "./SearchResults";
import { Routes, Route } from "react-router-dom";

function MainContainer() {
  const bodyRef = useRef();
  const [headerBackground, setHeaderBackground] = useState(false);
  const [navBackground, setNavBackground] = useState(false);

  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };

  return (
    <div className="mainContainer" ref={bodyRef} onScroll={bodyScrolled}>
      <Navbar navBackground={navBackground} />
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route
          path="/playlist/:id"
          element={<PlaylistSection headerBackground={headerBackground} />}
        ></Route>
        <Route path="/search" element={<SearchResults />}></Route>
      </Routes>
    </div>
  );
}

export default MainContainer;

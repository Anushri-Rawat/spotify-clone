import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlayerState,
  setPlaying,
  setSelectedPlaylist,
} from "../services/tokenSlice";
import Navbar from "./Navbar";
import HTMLReactParser from "html-react-parser";
import { Row, Col } from "react-bootstrap";

function MainContainer() {
  const { token, selectedPlaylistId, selectedPlaylist } = useSelector(
    (state) => state.token
  );
  const dispatch = useDispatch();
  const bodyRef = useRef();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);

  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 600000) / 10000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : seconds);
  };

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: HTMLReactParser(response.data.description)
          .map((desp) => (desp.props ? desp.props.children : desp))
          .join(""),
        image: response.data.images[0].url,
        songsCount: response.data.tracks.items.length,
        tracks: response.data.tracks.items.map(({ added_at, track }) => ({
          id: track.id,
          added_at: added_at,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch(setSelectedPlaylist(selectedPlaylist));
    };
    getInitialPlaylist();
  }, [selectedPlaylistId, token, dispatch]);

  return (
    <div className="mainContainer" ref={bodyRef} onScroll={bodyScrolled}>
      <Navbar navBackground={navBackground} />
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="album-image">
              <img src={selectedPlaylist.image} alt="selectedPlaylisted"></img>
            </div>
            <div className="album-details">
              <span className="album-type">PLAYLIST</span>
              <h1>{selectedPlaylist.name}</h1>
              <p className="album-description">
                {selectedPlaylist.description}
              </p>
              <p className="album-count">
                <span>Spotify</span>
                <span>.</span>
                <span>{selectedPlaylist.songsCount} Songs</span>
              </p>
            </div>
          </div>
          <div className="list">
            <Row
              className="header__row"
              style={{
                background: `${headerBackground ? "#000000" : "none"}`,
              }}
            >
              <Col className="col-1">
                <span>#</span>
              </Col>
              <Col className="col-6">
                <span>TITLE</span>
              </Col>
              <Col className="col-4">
                <span>ALBUM</span>
              </Col>
              <Col className="col-1">
                <span>
                  <AiFillClockCircle />
                </span>
              </Col>
            </Row>
            <div className="album-tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <Row key={id}>
                      <Col className="col-1">
                        <span>{index + 1}</span>
                      </Col>
                      <Col className="details col-6">
                        <div className="image">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </Col>
                      <Col className="col-4">
                        <span>{album}</span>
                      </Col>
                      <Col className="col-1">
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </Col>
                    </Row>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MainContainer;

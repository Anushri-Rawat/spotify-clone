import React, { useEffect } from "react";
import {
  AiFillClockCircle,
  AiFillPlayCircle,
  AiFillHeart,
} from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlayerState,
  setPlaying,
  setSelectedPlaylist,
  setSelectedPlaylistId,
} from "../services/tokenSlice";
import HTMLReactParser from "html-react-parser";
import { Row, Col } from "react-bootstrap";
import { spotifyVal } from "../App";
import { useParams } from "react-router-dom";

function PlaylistSection(props) {
  const { selectedPlaylistId, selectedPlaylist } = useSelector(
    (state) => state.token
  );
  const dispatch = useDispatch();
  const params = useParams();

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 600000) / 10000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : seconds);
  };

  const playSong = (id) => {
    spotifyVal
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotifyVal.getMyCurrentPlayingTrack().then((r) => {
          dispatch(setPlaying(r.item));
          dispatch(setPlayerState(true));
        });
      });
  };

  useEffect(() => {
    dispatch(setSelectedPlaylistId(params.id));
  }, [params.id]);

  useEffect(() => {
    spotifyVal.getPlaylist(selectedPlaylistId).then((response) => {
      const selectedPlaylist = {
        id: response.id,
        name: response.name,
        description: HTMLReactParser(response.description)
          .map((desp) => (desp.props ? desp.props.children : desp))
          .join(""),
        image: response.images[0].url,
        songsCount: response.tracks.items.length,
        tracks: response.tracks.items.map(({ added_at, track }) => ({
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
    });
  }, [selectedPlaylistId, dispatch]);

  return (
    <>
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
          <div className="body__icons">
            <AiFillPlayCircle className="body__shuffle" />
            <AiFillHeart style={{ fontSize: "30px" }} />
            <BsThreeDots />
          </div>
          <div className="list">
            <Row
              className="header__row"
              style={{
                background: `${props.headerBackground ? "#000000" : "none"}`,
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
                    <Row
                      key={id}
                      onClick={() => {
                        playSong(id);
                      }}
                    >
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
    </>
  );
}

export default PlaylistSection;

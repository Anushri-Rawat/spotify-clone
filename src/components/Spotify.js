import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./Footer";
import LeftMenu from "./LeftMenu";
import MainContainer from "./MainContainer";
import { setUser } from "../services/tokenSlice";
import { spotifyVal } from "../App";

const Spotify = () => {
  const { user } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    spotifyVal.getMe().then((user) => {
      const userInfo = { id: user.id, username: user.display_name };
      dispatch(setUser(userInfo));
    });
  }, [dispatch]);

  return (
    <Container fluid className="p-0">
      <div className="spotify__body">
        <LeftMenu />
        <MainContainer />
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </Container>
  );
};

export default Spotify;

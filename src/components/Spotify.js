import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./Footer";
import LeftMenu from "./LeftMenu";
import MainContainer from "./MainContainer";
import axios from "axios";
import { setUser } from "../services/tokenSlice";

const Spotify = () => {
  const { token, user } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = { id: data.id, username: data.display_name };
      dispatch(setUser(userInfo));
    };
    getUserInfo();
  }, [dispatch, token]);

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

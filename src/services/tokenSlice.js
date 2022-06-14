import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  playlist: [],
  user: {},
  selectedPlaylistId: "37i9dQZF1EIV5ihzgPnqBl",
  selectedPlaylist: null,
  currentlyPlaying: null,
  playerState: false,
  searchResults: [],
  isSearching: false,
};
const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSelectedPlaylistId: (state, action) => {
      state.selectedPlaylistId = action.payload;
    },
    setSelectedPlaylist: (state, action) => {
      state.selectedPlaylist = action.payload;
    },
    setPlaying: (state, action) => {
      state.currentlyPlaying = action.payload;
    },
    setPlayerState: (state, action) => {
      state.playerState = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
  },
});
export const {
  setToken,
  setPlaylist,
  setUser,
  setSelectedPlaylist,
  setPlaying,
  setPlayerState,
  setSelectedPlaylistId,
  setSearchResults,
  setIsSearching,
} = tokenSlice.actions;

export default tokenSlice.reducer;

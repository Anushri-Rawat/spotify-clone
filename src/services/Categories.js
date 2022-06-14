import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommendations: null,
  featured: null,
  releases: null,
  recentlyPlayed: null,
  categories: null,
  artists: null,
};
const Categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setRecommendations: (state, action) => {
      state.recommendations = action.payload;
    },
    setFeatured: (state, action) => {
      state.featured = action.payload;
    },
    setReleases: (state, action) => {
      state.releases = action.payload;
    },
    setRecentlyPlayed: (state, action) => {
      state.recentlyPlayed = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setArtists: (state, action) => {
      state.artists = action.payload;
    },
  },
});
export const {
  setFeatured,
  setRecommendations,
  setReleases,
  setRecentlyPlayed,
  setCategories,
} = Categories.actions;

export default Categories.reducer;

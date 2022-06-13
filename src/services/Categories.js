import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommendations: null,
  featured: null,
  releases: null,
  recentlyPlayed: null,
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
  },
});
export const {
  setFeatured,
  setRecommendations,
  setReleases,
  setRecentlyPlayed,
} = Categories.actions;

export default Categories.reducer;

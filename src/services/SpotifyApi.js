import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = {
  "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  "X-RapidAPI-Key": "8204c57366msh00c3ec2146eb710p189cc9jsn8b74bed8aaf7",
};

const baseUrl = "https://spotify23.p.rapidapi.com";

const createRequest = (url) => ({
  url,
  params: { id: "37i9dQZF1DX4Wsb4d7NKfP", offset: "0", limit: "100" },
  headers,
});

export const SpotifyApi = createApi({
  reducerPath: "SpotifyApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPlaylist: builder.query({
      query: () => createRequest(`/playlist_tracks/`),
    }),
  }),
});
export const { useGetPlaylistQuery } = SpotifyApi;

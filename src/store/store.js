import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../services/tokenSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});

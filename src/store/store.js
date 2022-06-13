import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../services/tokenSlice";
import categoriesReducer from "../services/Categories";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    categories: categoriesReducer,
  },
});

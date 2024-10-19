import { configureStore } from "@reduxjs/toolkit";
import favoritesSlice from "../pages/Profile/favoritesSlice";
import moviesSlice from "../pages/Home/MoviesSlice";
import authSlice from "../pages/Login/authSlice";

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
    favorites: favoritesSlice,
    login: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

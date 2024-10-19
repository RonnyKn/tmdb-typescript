import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import Movie_Interface from "../../interfaces/Movie_Interface";

export interface FavoriteState {
  favorites: Movie_Interface[];
  loading: boolean;
  error?: string | null;
}

const initialState: FavoriteState = {
  favorites: localStorage.getItem("favoritesStorage")
    ? JSON.parse(localStorage.getItem("favoritesStorage") || "[]")
    : [],
  loading: false,
};

const favoritesSlice = createSlice({
  initialState,
  name: "favoritesStorage",
  reducers: {
    addToFavorites: (state, action) => {
      state.loading = true;
      const itemIndex = state.favorites.findIndex(
        (item: Movie_Interface) => item.id === action.payload.id //ada yg sama or not
      );

      if (itemIndex >= 0) {
        toast.error(`${action.payload.title} 'Already added to Favorites'`);
      } else {
        const temp = { ...action.payload };
        state.favorites.push(temp); //masukan ke array
        toast.success(`${action.payload.title} Added to Favorites`);
      }
      localStorage.setItem("favoritesStorage", JSON.stringify(state.favorites)); //set localstorage dgn key cart then convert JS ke JSON string
      state.loading = false;
    },
    removeFromFavorites: (state, action) => {
      state.loading = true;
      const removeItem = state.favorites.filter(
        (item: Movie_Interface) => action.payload.id !== item.id
      );
      state.favorites = removeItem;
      localStorage.setItem("favoritesStorage", JSON.stringify(state.favorites));

      toast.success(`${action.payload.title} removed from Favorites`);
      state.loading = false;
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

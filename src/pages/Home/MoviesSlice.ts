import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Movie_Interface from "../../interfaces/Movie_Interface";

const apiKey = import.meta.env.VITE_API_KEY;
const apiBaseUrl = "https://api.themoviedb.org/3";

// Async thunk untuk fetch Now Playing Movies
export const fetchNowPlayingMovies = createAsyncThunk(
  "movies/fetchNowPlaying",
  async () => {
    const response = await axios.get(`${apiBaseUrl}/movie/now_playing`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page: 1,
      },
    });
    return response.data.results;
  }
);

// Async thunk untuk fetch Popular Movies
export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopular",
  async (page: number = 1) => {
    const response = await axios.get(`${apiBaseUrl}/movie/popular`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page,
      },
    });
    return response.data.results;
  }
);

export const getLoadMorePopularMovies = createAsyncThunk(
  "movies/getLoadMore",
  async (page: number = 1) => {
    const response = await axios.get(`${apiBaseUrl}/movie/popular`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page,
      },
    });
    return response.data.results.slice(0, 6); // Limit 6
  }
);
interface MovieState {
  nowPlaying: Movie_Interface[];
  popularMovie: Movie_Interface[];
  page: number;
  loading: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: MovieState = {
  nowPlaying: [],
  popularMovie: [],
  page: 1,
  loading: false,
  status: "idle",
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    incrementPage(state) {
      state.page += 1;
    },
    isLoadingTrue(state) {
      state.loading = true;
    },
    isLoadingFalse(state) {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.nowPlaying = action.payload.slice(0, 6);
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popularMovie = action.payload;
      })
      .addCase(getLoadMorePopularMovies.fulfilled, (state, action) => {
        state.popularMovie = [...state.popularMovie, ...action.payload];
      });
  },
});

export const { incrementPage, isLoadingTrue, isLoadingFalse } =
  moviesSlice.actions;
export default moviesSlice.reducer;

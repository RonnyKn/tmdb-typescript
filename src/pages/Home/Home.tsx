import React, { useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Movie_Interface from "../../interfaces/Movie_Interface";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "../Profile/favoritesSlice";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  getLoadMorePopularMovies,
  incrementPage,
  isLoadingFalse,
  isLoadingTrue,
} from "./MoviesSlice";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { nowPlaying, page, loading, popularMovie } = useSelector(
    (state: RootState) => state.movies
  );

  const addFavorites = (movie: Movie_Interface) => {
    dispatch(addToFavorites(movie));
  };

  const fetchMovies = async () => {
    try {
      dispatch(isLoadingTrue());
      await new Promise((resolve) => {
        dispatch(fetchNowPlayingMovies());
        dispatch(fetchPopularMovies(page));
        setTimeout(resolve, 1000);
      });
      dispatch(isLoadingFalse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, []);

  const loadMore = async () => {
    try {
      await dispatch(getLoadMorePopularMovies(page + 1));
      dispatch(incrementPage());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home-container">
      <h1>Now Playing Movies</h1>
      <section className="movies-grid">
        {loading ? (
          <div className="custom-loader" />
        ) : (
          nowPlaying.map((movie) => (
            <MovieCard
              key={movie?.id}
              movie={movie}
              onClickEvent={addFavorites}
            />
          ))
        )}
      </section>
      <h1>Popular Movies</h1>
      <section className="movies-grid">
        {loading ? (
          <div className="custom-loader" />
        ) : (
          popularMovie.map((movie) => (
            <MovieCard
              key={movie?.id}
              movie={movie}
              onClickEvent={addFavorites}
            />
          ))
        )}
      </section>
      {loading ? null : (
        <button className="load-more-btn" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Home;

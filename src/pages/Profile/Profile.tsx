import React from "react";
import "./Profile.css";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../../components/MovieCard/MovieCard";
import Movie_Interface from "../../interfaces/Movie_Interface";
import { removeFromFavorites } from "./favoritesSlice";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const favoriteState = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const romoveFavorites = (movie: Movie_Interface) => {
    dispatch(removeFromFavorites(movie));
  };

  return (
    <div className="profile-container">
      <h1>Your Favorite Movies</h1>
      <div className="movies-grid">
        {favoriteState.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClickEvent={romoveFavorites}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;

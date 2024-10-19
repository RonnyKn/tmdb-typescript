import React from "react";
import Movie_Interface from "../../interfaces/Movie_Interface";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface MovieCardProps {
  movie: Movie_Interface;
  onClickEvent: (movie: Movie_Interface) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClickEvent }) => {
  const { username } = useSelector((state: RootState) => state.login);
  const location = useLocation();
  return (
    <div className="movie-card" key={movie.id}>
      <div className="movie-card-image">
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <h5>{movie.title}</h5>
      {location.pathname === "/" && username && (
        <button onClick={() => onClickEvent(movie)}>Add to Favorites</button>
      )}
      {location.pathname === "/profile" && username && (
        <button onClick={() => onClickEvent(movie)}>Remove</button>
      )}
    </div>
  );
};

export default MovieCard;

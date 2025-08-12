import "../css/favourites.css";
import { useMovieContext } from "../components/MovieContext";
import MovieCard from "../components/MovieCard";

export default function Favourites() {
  
  const { favourites } = useMovieContext();
  if (favourites.length > 0) {
        return (
        <div className="favourites">
            <h2>Your Favourites</h2>
            <div className="movies-grid">
            {favourites.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
            ))}
            </div>
        </div>
        )
    }

   else{ return (
        <div className="favourites-empty">
        <h2>No Favourite Movies Yet</h2>
        <p>Start adding movies to your favourites and they will appear here!</p>
        </div>
      )
   }  
}


  
  

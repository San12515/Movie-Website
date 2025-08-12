import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieTrailers, getMovieDetails } from "../api.js";
import '../css/moviedetails.css';

export default function MovieDetails() {
  const { id } = useParams(); // movie ID from URL
  const [details, setDetails] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await getMovieDetails(id);
        setDetails(movieData);

        const trailerData = await getMovieTrailers(id);
        setTrailers(trailerData);
      } catch (err) {
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!details) return <p>No movie found</p>;

  return (
  <div className="movie-details" style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    color: "white"
  }} >
    <div className="Poster" >
      <img
        className="Movie-Poster"
        src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
        alt={details.title}
      />
    </div>

    <div className="Info">
      <h1>
        {details.title}{" "}
        <span className="year">
          ({new Date(details.release_date).getFullYear()})
        </span>
      </h1>
      <div className="meta">
        <span>{details.runtime} min</span>
        <span> | Rating: {details.vote_average} ⭐</span>
        <span> | {details.genres.map(g => g.name).join(", ")}</span>
      </div>
      <p className="tagline">{details.tagline}</p>
      <p className="Movie-Info">{details.overview}</p>

      {trailers.length > 0 && (
        <a
          href={`https://www.youtube.com/watch?v=${trailers[0].key}`}
          target="_blank"
          rel="noreferrer"
          className="watch-trailer"
        >
          🎬 Watch Trailer
        </a>
      )}
    </div>
  </div>
);
}
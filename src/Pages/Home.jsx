import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  searchMovies,
  getPopularMovies,
  movieYear,
  getOlderMovies,
  getMovieGenre,
  getGenres
} from '../api.js';
import MovieCard from '../components/MovieCard.jsx';
import '../css/home.css';

export default function Home() {
  const { term } = useParams();  // search term from /search/:term
  const navigate = useNavigate();
  const location = useLocation();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState(term || '');

  // Load genres on mount
  useEffect(() => {
    (async () => {
      try {
        const data = await getGenres();
        setGenres(data.genres);
      } catch {
        setError('Failed to fetch genres');
      }
    })();
  }, []);

  // Fetch movies when filters, page, or URL term changes
  useEffect(() => {
    fetchMovies();
  }, [term, page, selectedYear, selectedGenre]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      let data;

      if (term) {
        // Search from URL param
        if (selectedYear) {
          if (selectedYear === 'older') {
            data = await searchMovies(term, page, 'older');
          } else {
            data = await searchMovies(term, page, selectedYear);
          }
        } else {
          data = await searchMovies(term, page);
        }
      } else if (selectedYear && selectedGenre) {
        if (selectedYear === 'older') {
          data = await getMovieGenre(selectedGenre, page, 'older');
        } else {
          data = await getMovieGenre(selectedGenre, page, selectedYear);
        }
      } else if (selectedYear) {
        if (selectedYear === 'older') {
          data = await getOlderMovies(page);
        } else {
          data = await movieYear(selectedYear, page);
        }
      } else if (selectedGenre) {
        data = await getMovieGenre(selectedGenre, page);
      } else {
        data = await getPopularMovies(page);
      }

      setMovies(data.results);
      setTotalPages(data.total_pages || 1);
    } catch {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${encodeURIComponent(searchTerm)}`);
      setPage(1);
    } else {
      navigate(`/`);
    }
  };

  const handleFilterYear = (e) => {
    setSelectedYear(e.target.value);
    setPage(1);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    setPage(1);
  };

  // Reset filters when navigating to `/`
  useEffect(() => {
    if (location.pathname === '/') {
      setSearchTerm('');
      setSelectedYear('');
      setSelectedGenre('');
      setPage(1);
    }
  }, [location.pathname]);

  return (
    <div className="home">
      {/* Search Form */}
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="terminator eg."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {/* Filter Form */}
      <form className="filter-form">
        <select className="filter-select" value={selectedYear} onChange={handleFilterYear}>
          <option value="">Release Year</option>
          {[2025, 2024, 2023, 2022, 2021, 2020, 2019].map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
          <option value="older">Older</option>
        </select>
        <select className="movie-genre" value={selectedGenre} onChange={handleGenreChange}>
          <option className="option-text" value="">Select Genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </form>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Movie Grid */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            <button className="Prev-Button" onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
              Previous
            </button>
            <span className='page-text'>Page {page} of {totalPages}</span>
            <button onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

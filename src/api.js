const API_KEY= "0e68f1336e33d929039fcc916f9ccd68";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1) => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch popular movies");
  return await res.json(); // NOT res.json().results
};

export const searchMovies = async (query, page = 1,year='') => {
  let url=`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
   if (year && year !== 'older') {
    url += `&primary_release_year=${year}`;
  }
  if (year === 'older') {
    url += `&primary_release_date.lte=2018-12-31`; // Example cutoff for "older"
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch movies by genre');
  return await res.json();
};

export const movieYear = async (year, page = 1) => {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_year=${year}&page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch movies by year");
  return await res.json();
};
export const getOlderMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&primary_release_date.lte=2018-12-31&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch older movies');
  }
  const data = await response.json();
  return data;
};
export const getMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return await response.json();
};
export const getMovieGenre = async (genre_id, page = 1, year = '') => {
  let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genre_id}`;

  if (year && year !== 'older') {
    url += `&primary_release_year=${year}`;
  }
  if (year === 'older') {
    url += `&primary_release_date.lte=2018-12-31`; // Example cutoff for "older"
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch movies by genre');
  return await res.json();
};

export const getGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  if (!response.ok) throw new Error('Failed to fetch genres');
  return await response.json(); // returns { genres: [...] }
};

export const getMovieTrailers = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
  if (!response.ok) {
    throw new Error("Failed to fetch trailers");
  }
  const data = await response.json();
  // Keep only YouTube trailers
  return data.results.filter(video => video.site === "YouTube" && video.type === "Trailer");
};


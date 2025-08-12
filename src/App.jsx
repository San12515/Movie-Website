import React from 'react'
import './css/App.css'
import './css/favourites.css'
import './css/index.css'
import './css/navbar.css'
import Home from './Pages/Home.jsx'
import Navbar from './components/navbar.jsx';
import Favourites from './Pages/favourites.jsx'
import { Routes, Route } from 'react-router-dom';
import { MovieProvider } from './components/MovieContext.jsx';
import MovieDetails from './components/moviedetails.jsx';
export default function App() {
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setPage((prev) => Math.max(prev - 1, 1)); // no less than page 1
  };
  return(
    <MovieProvider>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:term" element={<Home />} />
          <Route path="/favourites" element={< Favourites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
    </MovieProvider>
  )
}




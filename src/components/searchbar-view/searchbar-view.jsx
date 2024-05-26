import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card';

export const SearchBar = ({ token }) => {
  const [searchInput, setSearchInput] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    fetch('https://myflixmovies-72c1f6d2bace.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          Title: movie.Title,
          imgURL: movie.imgURL,
          Description: movie.Description,
          Genre: {
            Name: movie.Genre.Name,
          },
          Director: {
            Name: movie.Director.Name,
          },
          Year: movie.Year,
        }));
        setMovies(moviesFromApi);
        setFilteredMovies(moviesFromApi);
      });
  }, [token]);

  const handleChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);
    if (input.length > 0) {
      setFilteredMovies(
        movies.filter((movie) =>
          movie.Title.toLowerCase().includes(input.toLowerCase())
        )
      );
    } else {
      setFilteredMovies(movies);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />
      <div className="d-flex flex-wrap">
        {filteredMovies.map((movie) => (
          <Col className="mb-4" key={movie.id} md={3}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import './profile-view.scss';

function FavoriteMovies({ favoriteMovieList, updateFavMovies }) {
  return (
    <>
      <Row>
        <Col xs={12}>
          <h2>Favorite Movies</h2>
        </Col>
      </Row>
      <Row>
        {favoriteMovieList.length === 0 ? (
          <p>No favorite movies saved yet!</p>
        ) : (
          favoriteMovieList.map((movie) => (
            <Col xs={12} sm={6} lg={4} key={movie.id} className="movie-container">
              <MovieCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
}

export default FavoriteMovies;

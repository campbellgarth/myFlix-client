import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Card, Form, Button } from 'react-bootstrap';
import './profile-view.scss';

function FavoriteMovies({ favoriteMovieList, updateFavMovies }) {
  const handleRemoveFromFav = (movieId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    fetch(
      `https://myflixmovies-72c1f6d2bace.herokuapp.com/users/${user.Username}/movie/${movieId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        console.log('RESULT', updatedUser);
        // TODO: Update your API so that it return a user object
        //localStorage.setItem('user', JSON.stringify(updatedUser));
        updateFavMovies(movieId);
        alert('Movie removed from your favorite list successfully!');
      })
      .catch((error) =>
        console.error('Error removed from favorite movies:', error)
      );
  };

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
          favoriteMovieList.map((movies) => (
            <Col
              xs={12}
              sm={6}
              lg={4}
              key={movies.id}
              className="movie-container"
            >
              <Card className="h-100">
                <Card.Body>
                  <img
                    src={movies.imgURL}
                    className="movie-image movie-container w-100"
                  />
                  <Link to={`/movies/${movies.id}`}>
                    <Card.Title>
                      {' '}
                      <h4>{movies.Title}</h4>
                    </Card.Title>
                  </Link>
                  <button
                    className="back-button movie-container"
                    style={{ cursor: 'pointer' }}
                    variant="secondary"
                    onClick={() => handleRemoveFromFav(movies.id)}
                  >
                    {' '}
                    Remove from Favorites
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </>
  );
}
export default FavoriteMovies;

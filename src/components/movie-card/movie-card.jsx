
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.FavoriteMovies && user.FavoriteMovies.includes(movie.id)) { //if movie is in favorites list, should show "remove from favs" instead
      setIsFavorite(true);
    }
  }, [movie.id]);

  const handleAddToFav = (movieId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    fetch(
      `https://myflixmovies-72c1f6d2bace.herokuapp.com/users/${user.Username}/movie/${movieId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        console.log('RESULT', updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsFavorite(true);
        alert('Movie added to your favorite list successfully!');
      })
      .catch((error) => console.error('Error adding favorite movies:', error));
  };

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
        setIsFavorite(false);
        alert('Movie removed from your favorite list successfully!');
      })
      .catch((error) =>
        console.error('Error removing favorite movies:', error)
      );
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.imgURL} />
      <Card.Body className="d-flex flex-column">
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Card.Title>{movie.Title}</Card.Title>
        </Link>
        <Card.Text>{movie.Year}</Card.Text>
        <div className="mt-auto">
        {isFavorite ? (
          <Button
            className="btn btn-warning"
            onClick={() => handleRemoveFromFav(movie.id)}
          >
            Remove from Favorites
          </Button>
        ) : (
          <Button
            className="btn back-button"
            onClick={() => handleAddToFav(movie.id)}
          >
            Add to Favorites
          </Button>
        )}
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    imgURL: PropTypes.string.isRequired,
    Director: PropTypes.object.isRequired,
    Year: PropTypes.number.isRequired,
    Genre: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
};

export default MovieCard;
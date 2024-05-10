import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
  console.log(movie);

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
        alert('Movie added to your favorite list successfully!');
      })
      .catch((error) => console.error('Error adding favorite movies:', error));
  };

  return (
    
      <Card className="h-100">
        <Card.Img variant="top" src={movie.imgURL} />
        <Card.Body>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Card.Title>{movie.Title}</Card.Title>
          </Link>
          <Card.Text>{movie.Year}</Card.Text>
          <Button
            className="btn btn-primary"
            onClick={() => handleAddToFav(movie.id)}
          >
            Add to Favorite
          </Button>
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
  }).isRequired,
};

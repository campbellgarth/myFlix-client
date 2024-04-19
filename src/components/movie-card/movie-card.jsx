import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100" onClick={() => onMovieClick(movie)}>
      <Card.Img variant="top" src={movie.imgURL} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Year}</Card.Text>
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
    Genre: PropTypes.object.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
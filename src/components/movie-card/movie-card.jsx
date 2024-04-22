import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
    <Card className="h-100" >
      <Card.Img variant="top" src={movie.imgURL} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Year}</Card.Text>
      </Card.Body>
    </Card>
    </Link>
  );
};


MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    imgURL: PropTypes.string.isRequired,
    Director: PropTypes.object.isRequired,
    Year: PropTypes.number.isRequired,
    Genre: PropTypes.object.isRequired
  }).isRequired
};
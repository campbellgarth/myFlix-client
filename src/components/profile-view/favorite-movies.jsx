import React from 'react';
import { Link } from 'react-router-dom';

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
    <div>
      <h2>Favorite Movies</h2>
      {favoriteMovieList.map((movies) => {
        return (
          <div key={movies.id}>
            <img src={movies.imgURL} />
            <Link to={`/movies/${movies.id}`}>
              <h4>{movies.Title}</h4>
            </Link>
            <button
              variant="secondary"
              onClick={() => handleRemoveFromFav(movies.id)}
            >
              {' '}
              Remove from list
            </button>
          </div>
        );
      })}
    </div>
  );
}
export default FavoriteMovies;

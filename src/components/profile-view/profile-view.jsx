import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';

export const ProfileView = () => {
  const [user, setUser] = useState(null);
  const [favMovies, setFavMovies] = useState([]);
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    Email: '',
  });
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const updateFavMovies = (movieId) => {
    setFavMovies(favMovies.filter((m) => m.id !== movieId));
  };

  const fetchFavMovies = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    fetch('https://myflixmovies-72c1f6d2bace.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
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
          };
        });
        setFavMovies(
          moviesFromApi.filter((m) => currentUser.FavoriteMovie.includes(m.id))
        );
      });
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    fetch('https://myflixmovies-72c1f6d2bace.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((users) => {
        const foundUser = users.find((u) => u._id === currentUser._id);
        const updatedFormData = {
          ...formData,
          Username: foundUser.Username,
          Email: foundUser.Email,
          // We do not add password because we don't want the hashed value to be included in the form
        };
        setUser(foundUser);
        setFormData(updatedFormData);

        // Fetch Movies
        fetchFavMovies();
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, [token]);

  useEffect(() => {
    console.log('FAV MOVIES UPDATED', favMovies);
  }, [favMovies]);

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Exclude the password from the user object when spreading it into updatedFormData
    const { Password, ...userWithoutPassword } = user;
    // Merge the existing formData state with additional user data
    const updatedFormData = {
      ...userWithoutPassword,
      ...formData,
    };

    fetch(
      `https://myflixmovies-72c1f6d2bace.herokuapp.com/users/${user.Username}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFormData),
      }
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert('User information updated successfully!');
      })
      .catch((error) =>
        console.error('Error updating user information:', error)
      );
  };

  const handleDeregister = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    fetch(
      `https://myflixmovies-72c1f6d2bace.herokuapp.com/users/${user.Username}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          // Remove user from localStorage
          alert("Account deleted successfully.")
          localStorage.clear();
          window.location.reload();
          
          console.log(`${user.Username} was deleted.`);
        } else {
          throw new Error('Failed to deregister user');
        }
      })
      .catch((error) => {
        console.error('Error deregistering user:', error);
      });
  };

  return (
    <div>
      {user && (
        <div>
          <h2>User Profile</h2>
          <UserInfo
            Username={user.Username}
            Email={user.Email}
            Birthday={user.Birthday}
          />
          <form className="profile-form" onSubmit={handleSubmit}>
            <h2>Want to change some info?</h2>
            <label>Username:</label>
            <input
              type="text"
              name="Username"
              value={formData.Username}
              onChange={(e) => handleUpdate(e)}
            />
            <label>Password</label>
            <input
              type="password"
              name="Password"
              // defaultValue={user.Password}
              onChange={(e) => handleUpdate(e)}
            />
            <label>Email Address</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={(e) => handleUpdate(e)}
            />
            <button variant="primary" type="submit">
              Update
            </button>
          </form>

          {/* <Link to={`/users/${user.Username}`}>
            <button>Edit Profile</button>
          </Link> */}

          {favMovies && (
            <div>
              <FavoriteMovies
                favoriteMovieList={favMovies}
                updateFavMovies={updateFavMovies}
              />
            </div>
          )}
        </div>
      )}
      <button onClick={handleDeregister}>Deregister</button>
    </div>
  );
};

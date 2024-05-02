import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';

export const ProfileView = () => {
    const [user, setUser] = useState(null);
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken ? storedToken : null);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        fetch("https://myflixmovies-72c1f6d2bace.herokuapp.com/users", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(users => {
                const foundUser = users.find(u => u._id === currentUser._id);
                setUser(foundUser)
            })
            .catch(error => console.error('Error fetching user data:', error));

    }, [token, user]);
    return (
        <div>
          {user && (
            <div>
              <h2>User Profile</h2>
              <p>Username: {user.Username}</p>
              <p>Email: {user.Email}</p>
              <p>Date of Birth: {user.Birthday}</p>
              <button>Edit Profile</button>
              <button>Deregister</button>
            </div>
          )}
        </div>
      );
    };
    



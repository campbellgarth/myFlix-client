import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';

export const ProfileView = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        fetch('/users')
            .then(response => response.json())
            .then(users => {
                const foundUser = users.find(u => u._id === currentUser._id);
                setUser(foundUser)
            })
            .catch(error => console.error('Error fetching user data:', error));

    }, []);
    return (
        <div>
          {user && (
            <div>
              <h2>User Profile</h2>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Date of Birth: {user.dateOfBirth}</p>
              <button>Edit Profile</button>
              <button>Deregister</button>
            </div>
          )}
        </div>
      );
    };
    



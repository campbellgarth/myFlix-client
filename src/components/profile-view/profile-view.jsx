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
    const handleUpdate = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://myflixmovies-72c1f6d2bace.herokuapp.com/users/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(updatedUser => {
            setUser(updatedUser);
            alert('User information updated successfully!');
        })
        .catch(error => console.error('Error updating user information:', error));
    };

   

    
    return (
        <div>
            {user && (
                <div>
                    <h2>User Profile</h2>
                    <UserInfo Username={user.Username} Email={user.Email} Birthday={user.Birthday} />
                     {/* <FavoriteMovies favoriteMovieList={favoriteMovieList} />  */}
                     <UpdateUser Username={user.Username} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
                     <form className='profile-form' onSubmit={(e) => handleSubmit(e)}>
            <h2>Want to change some info?</h2>
            <label>Username:</label>
            <input
                type='text'
                name='Username'
                defaultValue={user.Username}
                onChange={e => handleUpdate(e)} />
            <label>Password</label>
            <input
                type='password'
                name='password'
                defaultValue={user.Password}
                onChange={e => handleUpdate(e)} />
            <label>Email Address</label>
            <input
                type='email'
                name='email'
                defaultValue={user.Email}
                onChange={e => handleUpdate(e.target.value)} />
            <button variant='primary' type='submit'>
                Update
            </button>
        </form>
                    
                    <Link to={`/users/${user.Username}`}>
                        <button>Edit Profile</button>
                    </Link>
                    <button>Deregister</button>
                </div>
            )}
        </div>
    );
};




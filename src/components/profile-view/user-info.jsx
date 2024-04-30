import React from 'react';

function UserInfo ({ Email, Username, dateOfBirth }) {
    return(
        <>
        <p>Username: { Username } </p>
        <p> Email: { Email }  </p>
        <p> Date of Birth: { dateOfBirth }  </p>
        </>
    )
}
export default UserInfo;
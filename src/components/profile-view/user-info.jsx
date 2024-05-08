import React from 'react';

function UserInfo ({ Email, Username, Birthday }) {
    return(
        <div>
        <h4>User Profile</h4>
        <>
        <p>Username: { Username } </p>
        <p> Email: { Email }  </p>
        <p> Birthday: { Birthday }  </p>
        </>
        </div>
    )
}
export default UserInfo;
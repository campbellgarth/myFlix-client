import React from 'react';

function UserInfo ({ Email, Username, Birthday }) {
    return(
        <>
        <p>Username: { Username } </p>
        <p> Email: { Email }  </p>
        <p> Birthday: { Birthday }  </p>
        </>
    )
}
export default UserInfo;
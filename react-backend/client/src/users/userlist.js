import React from 'react';
import { Link } from 'react-router-dom';

const UserList = (props) => {
  const { users } = props;

  return(
    <div>
      <h1>Users</h1>
      {users.map((user) => {
        let path = `/users/${user.username}/edit`;
        return (
          <Link to={path} >
            <div key={user.id}>{user.username}</div>
          </Link>
        )
      }
      )}
    </div>
  )
}

export default UserList;

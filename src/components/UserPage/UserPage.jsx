import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';

function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  console.log(user);

  const flagAccount = () => {
    if(window.confirm("Are you sure you want to delete your account? This cannot be undone!")){
      dispatch({type: "FLAG_ACCOUNT"});
    }
  }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <img src={user.image_url} />
      <p>Your email is: {user.user_email}</p>
      <LogOutButton className="btn" />
      {!user.isAdmin && <button onClick={flagAccount}>Delete Account</button>}
    </div>
  );
}

export default UserPage;

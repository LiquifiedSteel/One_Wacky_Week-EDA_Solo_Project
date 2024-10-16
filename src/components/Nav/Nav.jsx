import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">One Wacky Week</h2>
      </Link>
      <div>
        {user.isAdmin && <Link className="navLink" to="/admin">Admin</Link>}
        <Link className="navLink" to="/home">
          Home
        </Link>
        <Link className="navLink" to="/about">
          About
        </Link>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/download">
              Download
            </Link>

            <LogOutButton className="navLink" />

            <Link className='navLink' to="/user">
              {user.username}
            </Link>
            <img src={user.image_url} />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

import Image from 'react-bootstrap/Image';
import { Navbar, Nav } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function Navi() {
  const user = useSelector((store) => store.user);
  const [expanded, setExpanded] = useState(false); // State to manage navbar expansion

  const handleToggle = () => {
    setExpanded(!expanded); // Toggle the expanded state
  };

  const handleLinkClick = () => {
    setExpanded(false); // Close the navbar on link click
  };
  return (
      <Navbar collapseOnSelect expand="lg" variant="dark" className="nav" expanded={expanded}>
        <Link to="/home" onClick={handleLinkClick}>
          <h2 className="nav-title">One Wacky Week</h2>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='d-lg-none' onClick={handleToggle} />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto navLinks">
              {user.isAdmin && <Link className="navLink" to="/admin">Admin</Link>}
              <Link className="navLink" to="/home" onClick={handleLinkClick}>Home</Link>
              <Link className="navLink" to="/about" onClick={handleLinkClick}>About</Link>
                      
              {/* If no user is logged in, show these links */}
              {!user.id && (
                // If there's no user, show login/registration links
                <Link className="navLink" to="/login" onClick={handleLinkClick}>
                  Login / Register
                </Link>
              )}

              {/* If a user is logged in, show these links */}
              {user.id && (
                <>
                  <Link className="navLink" to="/download" onClick={handleLinkClick}>
                    Download
                  </Link>

                  <LogOutButton className="navLink" />

                  <Link className='navLink account' to="/user" onClick={handleLinkClick}>
                    {user.username}
                    <Image className='profilePic' src={user.image_url} />
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
      </Navbar>
  );
}

export default Navi;

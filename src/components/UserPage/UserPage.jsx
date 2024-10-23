import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';
import { useScript } from '../../hooks/useScript';
import axios from 'axios';
import "./UserPage.css";
import { Card, Container } from 'react-bootstrap';

function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  let image = {file_url: null};
  

  const openWidget = () => {
    // Currently there is a bug with the Cloudinary <Widget /> component
    // where the button defaults to a non type="button" which causes the form
    // to submit when clicked. So for now just using the standard widget that
    // is available on window.cloudinary
    // See docs: https://cloudinary.com/documentation/upload_widget#look_and_feel_customization
    !!window.cloudinary && window.cloudinary.createUploadWidget(
       {
          sources: ['local', 'url', 'camera'],
          cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
          uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
       },
       (error, result) => {
          if (!error && result && result.event === "success") {
             axios({
              method: "POST",
              url: `/api/user/profile/${user.id}`,
              data: {url: result.info.secure_url},
            }).then(()=>window.location.reload())
            .catch((err) => console.error("ERROR updating profile picture: ", err))
          }
       },
    ).open();
 }

  // Here we flag the users account for deletion, the account is not actually deleted from the database, but it can no longer be accessed by the user
  const flagAccount = () => {
    if(window.confirm("Are you sure you want to delete your account? This cannot be undone!")){
      dispatch({type: "FLAG_ACCOUNT"});
    }
  }

  return (
    <Container fluid>
      <center>
        <Card className='userCard'>
          <h2 className='userTextColor'>Welcome, {user.username}!</h2>
          <Card.Img className='portrait userPic' src={user.image_url} />
          <h3 className='userTextColor'>Set New Profile Picture</h3>
          { /* This just sets up the window.cloudinary widget */ }
          {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}

          <p className='userTextColor'>File to upload: <button type="button" onClick={openWidget}>Pick File</button></p>

          <p className='userTextColor'>Your email is: {user.user_email}</p>
          {user.purchased && <p>You have purchased the game! Thank You!</p>}
          <LogOutButton className="btn mybtn mylogoutButton" />
          {!user.isAdmin && <button className='btn mybtn mylogoutButton myDelete' onClick={flagAccount}>Delete Account</button>}
        </Card>
      </center>
    </Container>
  );
}

export default UserPage;

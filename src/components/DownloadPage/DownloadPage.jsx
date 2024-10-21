import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';

function DownloadPage() {
  const user = useSelector((store) => store.user);
  console.log(user);

  function handleClick() {
    if(user.purchased) {
       alert('Thank you for buying the game, there is nothing to download right now, but the database has it saved that you purchased it. So when the game is released, you will already own it. Just think of it as a pre-order')
    } else {
      axios({
        method: 'POST',
        url: '/api/payments/construct-session',
        data: user,
      })
      .then((response) => {
        window.location.href = response.data.url;
      })
      .catch(err => console.error('Failed to create checkout session', err))
    }
  }

  return (
    <div className="container">
      <div className="grid">
        
        <div className="grid-col grid-col_6">
          <p>Download instructions will go here</p>
        </div>

        <div className="grid-col grid-col_6">

          <div>
            <button onClick={() => handleClick()}>{user.purchased ? "Download for Windows" : "Purchase One Wacky Week"}</button>
          </div>
          <div>
            {user.purchased && <button onClick={() => handleClick()}>Download for MacOS</button>}

          </div>
          
        </div>
      </div>
    </div>
  );
}

export default DownloadPage;

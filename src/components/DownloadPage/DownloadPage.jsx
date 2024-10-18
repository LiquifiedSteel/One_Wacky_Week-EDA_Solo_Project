import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';

function DownloadPage() {
  const user = useSelector((store) => store.user);
  function handlePurchase() {
    axios({
      method: 'POST',
      url: '/api/payments/construct-session',
      data: user,
    })
    .then((response) => {
      console.log(response.data);
      window.location.href = response.data.url;
    })
    .catch(err => console.error('Failed to create checkout session', err))
  }

  return (
    <div className="container">
      <div className="grid">
        
        <div className="grid-col grid-col_6">
          <p>Download instructions will go here</p>
        </div>

        <div className="grid-col grid-col_6">

          <div>
            <button onClick={() => handlePurchase()}>Download for Windows</button>
          </div>
          <div>
            <button>Download for MacOS</button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default DownloadPage;

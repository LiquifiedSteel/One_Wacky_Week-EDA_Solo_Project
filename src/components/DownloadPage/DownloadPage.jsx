import axios from 'axios';
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import "./DownloadPage.css";


function DownloadPage() {
  const user = useSelector((store) => store.user);
  console.log(user);

  // Here we check if the user has already been to stripe or not, if they have completed the purchase already it will
  // give them a confirmation message, later it will give them the downloadable game, and if they haven't paid for the game,
  // they will be sent to stripe to make the purchase.
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
    <Container className='downloadWallpaper' fluid>
      <Row>
        <Col xs={12} md={6} className='downloadCol'>
          <Card className='downloadCard'>
              {!user.purchased && <button className='downloadButton btn mybtn'>Purchase One Wacky Week</button>}
              
              {user.purchased && <button className='downloadButton btn mybtn' onClick={() => handleClick()}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                </svg> Download Windows</button>}

              {user.purchased && <button className='downloadButton btn mybtn' onClick={() => handleClick()}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                </svg> Download MacOS</button>}
            
            {!user.purchased && <p className='downloadInstructions'>You need to click the "Purchase One Wacky Week" button to buy the game.</p>}
            {user.purchased && <p className='downloadInstructions'>You can click either button to recieve the download for the game. (both buttons currently give an alert confirming that you have purchased the game)</p>}
          </Card>
        </Col>
        <Col xs={12} md={6} className='downloadCol'>
          <Card className='downloadCard'>
            
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DownloadPage;

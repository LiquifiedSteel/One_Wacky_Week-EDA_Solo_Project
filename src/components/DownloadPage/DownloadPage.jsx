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
            <div>
              <button className='downloadButton btn mybtn' onClick={() => handleClick()}>{user.purchased ? "Download for Windows" : "Purchase One Wacky Week"}</button>
            </div>
            <div>
              {user.purchased && <button className='downloadButton btn mybtn' onClick={() => handleClick()}>Download for MacOS</button>}
            </div>
          </Card>
        </Col>
        <Col xs={12} md={6} className='downloadCol'>
          <Card className='downloadCard'>
            <p className='downloadInstructions'><strong className='spanStrong'>Before Payment:</strong> You need to click the "Purchase One Wacky Week" button to buy the game.</p>
            <p className='downloadInstructions'><strong className='spanStrong'>After Payment:</strong> You can click either button to recieve the download for the game. (both buttons currently give an alert confirming that you have purchased the game)</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DownloadPage;

import axios from 'axios';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';


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
    <Container>
      <Row>
        
        <Col>
          <p>Download instructions will go here</p>
        </Col>

        <Col>

          <div>
            <button onClick={() => handleClick()}>{user.purchased ? "Download for Windows" : "Purchase One Wacky Week"}</button>
          </div>
          <div>
            {user.purchased && <button onClick={() => handleClick()}>Download for MacOS</button>}

          </div>
          
        </Col>
      </Row>
    </Container>
  );
}

export default DownloadPage;

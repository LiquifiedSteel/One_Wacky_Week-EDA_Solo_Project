import './LandingPage.css';
import PatchNotes from '../PatchNotes/PatchNotes';
import Image from 'react-bootstrap/Image';
import { Col, Container, Row } from 'react-bootstrap';

function LandingPage() {

  return (
    <Container className='homeContainer' fluid>
      <Row>
        <Col xs={8}>
          <Image className='gamePoster' src='https://m.media-amazon.com/images/I/61UfwlPvR0L._AC_UF894,1000_QL80_.jpg' fluid />
          <PatchNotes />
        </Col>
        <Col xs={4}>
          <h3 className='fix'>Welcome to the One Wacky Week website! Feel free to explore!</h3>
          <br />
          <p className='fix'>The Discord Channel</p>
          <div className='expanding'></div>
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;

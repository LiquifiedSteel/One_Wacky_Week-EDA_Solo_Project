import './LandingPage.css';
import PatchNotes from '../PatchNotes/PatchNotes';
import Image from 'react-bootstrap/Image';

function LandingPage() {

  return (
    <div className="container">

      <div className="grid">
        <div className="grid-col grid-col_8">
          <Image className='gamePoster' src='https://m.media-amazon.com/images/I/61UfwlPvR0L._AC_UF894,1000_QL80_.jpg' fluid />
          <PatchNotes />
        </div>
        <div className="grid-col grid-col_4">
          <h3 className='fix'>Welcome to the One Wacky Week website! Feel free to explore!</h3>
          <br />
          <p>The Discord Channel</p>
          <div className='expanding'></div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

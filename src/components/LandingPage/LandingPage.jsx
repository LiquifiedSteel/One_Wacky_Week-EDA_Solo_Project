import './LandingPage.css';
import PatchNotes from '../PatchNotes/PatchNotes';

function LandingPage() {

  return (
    <div className="container">
      <h3>Welcome to the One Wacky Week website! Feel free to explore!</h3>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <img src='https://m.media-amazon.com/images/I/61UfwlPvR0L._AC_UF894,1000_QL80_.jpg' />
          <PatchNotes />
        </div>
        <div className="grid-col grid-col_4">
          <p>The Discord Channel</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

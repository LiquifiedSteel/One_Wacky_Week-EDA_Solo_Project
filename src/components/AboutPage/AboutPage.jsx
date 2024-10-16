import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div className="grid">
        <div className="grid-col grid-col_8">

          <img src='https://m.media-amazon.com/images/I/61UfwlPvR0L._AC_UF894,1000_QL80_.jpg' />

          <div>
            <h3>About the Creator</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div>
            <h3>About the Game</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>

        </div>
        <div className="grid-col grid-col_4">
          <img src='https://media.wired.com/photos/5f87340d114b38fa1f8339f9/master/w_1600%2Cc_limit/Ideas_Surprised_Pikachu_HD.jpg' />
        </div>
      </div>
    </div>
  );
}

export default AboutPage;

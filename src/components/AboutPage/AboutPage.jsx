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
            <p>Hello, I am the creator of One Wacky Week. I will not be sharing my name just yet. However, I will share a little about myself. I am born and raised in the United States, somewhere in the Midwest, (will not disclose where), and have been a gamer since I was a little boy. My dad got me into League of Legends as my first video game, but as of recently decided I am sick of competetive video games. I prefer a good story, like Resident Evil, or Minecraft Story Mode. I know that MSM is a bit cringe but I loved it as a kid regardless. It was my inspiration to start this project. Although, I am a solo developer and am attempting a very ambitious project for my first game, so it will take me forever to get this game out. I am also a huge fan of Game Theory and the other Theorist channels on youtube. So my goal with this project is to make a game that all the channels might be able to collab on. I want to put elements of story into the minigames (Game Theory), original media (Film Theory), the food if possible (Food Theory), the clothing (Style Theory), and even have some easter eggs for GTLive in the form of a Multiverse of Matness easter egg, kudos ahead of time to whoever finds it. Feel free to join the Discord Channel where I will try to keep updates coming out for the progress of the game. Thanks a ton for reading all this! I guess I was just kind of rambling. Possibly just to use as many letters as possible for an easter egg you can look for. Possibly. Maybe... BYE!</p>
          </div>
          <div>
            <h3>About the Game</h3>
            <p>One Wacky Week will be a story choice based g<em>am</em>e. As you play through the story there w<em>i</em>ll be choices, minigames, and easter eggs along the way. Each choice will influence the ending you get, so you will want to play through multiple tiems to get different endings. My desire is to have at least 60 different endings, some <em>good</em> and some bad, some will be slightly different from others, and others will be vastly different. With <em>enough</em> endings, you may be able to put together the larger story that is present.</p>
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

import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function DownloadPage() {
  return (
    <div className="container">
      <div className="grid">
        
        <div className="grid-col grid-col_6">
          <p>Download instructions will go here</p>
        </div>

        <div className="grid-col grid-col_6">

          <div>
            <button>Download for Windows</button>
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

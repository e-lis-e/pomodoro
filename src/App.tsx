import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div style={{position: 'relative'}}>
      <div>
        <button className='closeButton'>
          Close
        </button>
      </div>

      <div className="homeContent">
        <div className='homeControls'>
          <button className="imageButton">
            Work
            </button>
          <button className="imageButton">
            Break
            </button>
        </div>

        <p>
          Keep going!
        </p>

        <h1 className="homeTimer">25:00</h1>
        <button className="homeButton"></button>
      </div>
    </div>

  );
}

export default App;

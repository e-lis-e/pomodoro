import React, { useState, useEffect } from 'react';
import './App.css';

import Img from "./assets/capa.jpeg";
import fanfare from "./assets/fanfare.mp3";

function App() {

  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [encouragement, setEncouragement] = useState("");
  const fanfareAudio = new Audio(fanfare);

  const cheerMessages = [
    "You can do it!",
    "Just a little more!",
    "Keep going!"
  ];

  const breakMessages = [
    "Rest a little!",
    "Check your messages!",
    "DRINK. WATER.",
    "Please, eat something."
  ]
  // messages
  useEffect(() => {
    let messageInterval: NodeJS.Timeout;

    if (isRunning) {
      const messages = isBreak ? breakMessages : cheerMessages;
      setEncouragement(messages[0]);
      let index = 1;

      messageInterval = setInterval(() => {
        setEncouragement(messages[index]);
        index = (index + 1) % messages.length;
      }, 4000);
    } else {
      setEncouragement("");
    }
    return () => clearInterval(messageInterval);
  }, [isRunning, isBreak]);

  // timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // audio
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      fanfareAudio.play().catch(err => {
        console.error("audio play failed:", err);
      });
      setIsRunning(false);
      setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
    }
  }, [timeLeft]);
  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');

    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // change mode
  const swicthMode = (breakMode: boolean) => {
    setIsBreak(breakMode);
    setIsRunning(false);
    setTimeLeft(breakMode ? 5 * 60 : 25 * 60);
  }

  // run timer
  const handleClick = () => {
    if (!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
      setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
    }
  }

  const handleCloseClick = () => {
    if (window.electronAPI?.closeApp) {
      window.electronAPI.closeApp();
    } else {
      console.warn("Electron API not available");
    }
  }
  return (
    <div className="homeContainer" style={{ position: 'relative' }}>
      <div>
        <button className='closeButton' onClick={handleCloseClick}>
          Close
        </button>
      </div>

      <div className="homeContent">
        <div className='homeControls'>
          <button className="imageButton" onClick={() => swicthMode(false)}>
            Work
          </button>
          <button className="imageButton" onClick={() => swicthMode(true)}>
            Break
          </button>
        </div>

        <p className={`encouragementText ${!isRunning ? "hidden" : ""}`}>
          {encouragement}
        </p>

        <h1 className="homeTimer">{formatTime(timeLeft)}</h1>
        <button className="homeButton" onClick={handleClick}> Start </button>
      </div>
    </div>

  );
}

export default App;

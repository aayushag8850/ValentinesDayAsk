import React, { useState } from 'react';
import Confetti from 'react-confetti';
import './FinalMessage.css';

const FinalMessage = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [noClicks, setNoClicks] = useState(0); 

  // Clicking "Yes" triggers confetti
  const handleYesClick = () => {
    setShowConfetti(true);
  };

  // Each "No" click increments noClicks
  const handleNoClick = (e) => {
    e.preventDefault();
    setNoClicks((prevCount) => prevCount + 1);
  };

  // === SCALE CONFIG ===
  const baseYesScale = 1.2;
  const baseNoScale = 1.2;
  const increment = 0.05;      // each no-click grows/shrinks by 0.05

  // clamp values
  const maxYesScale = 2.0;     // yes button won't exceed 2x 
  const minNoScale  = 0.5;     // no button won't shrink below 0.5

  // Calculate final scales
  let yesScale = baseYesScale + noClicks * increment;
  let noScale  = baseNoScale  - noClicks * increment;

  // Clamp them
  yesScale = Math.min(yesScale, maxYesScale);
  noScale  = Math.max(noScale,  minNoScale);

  return (
    <div className="final-section">
      {showConfetti && <Confetti />}

      <h2>You Did It!</h2>
      <p className="valentine-text">Will you be my Valentine?</p>

      <div className="button-row">
        <button
          className="yes-button"
          style={{ transform: `scale(${yesScale})` }}
          onClick={handleYesClick}
        >
          Yes
        </button>

        <button
          className="no-button"
          style={{ transform: `scale(${noScale})` }}
          onClick={handleNoClick}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default FinalMessage;

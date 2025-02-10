import React from 'react';
import './FloatingHearts.css';

const FloatingHearts = () => {
  const heartsArray = Array.from({ length: 12 }, (_, i) => i); // 12 hearts

  return (
    <div className="floating-hearts-container">
      {heartsArray.map((index) => {
        // Random left position (0–90%), random delay (0–5s), random size
        const leftPosition = Math.random() * 90;
        const delay = Math.random() * 5;
        // random scale factor for variety (e.g. 0.8–1.2)
        const scale = 0.8 + Math.random() * 0.4;

        return (
          <div
            className="heart"
            key={index}
            style={{
              left: `${leftPosition}%`,
              animationDelay: `${delay}s`,
              transform: `scale(${scale}) rotate(0deg)`, // We'll use rotate(0) in the keyframe
            }}
          />
        );
      })}
    </div>
  );
};

export default FloatingHearts;

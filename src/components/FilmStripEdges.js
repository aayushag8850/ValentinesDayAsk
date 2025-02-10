import React from 'react';
import './FilmStripEdges.css';

const FilmStripEdges = () => {
  // Left-side images
  const leftPictures = [
    { src: '/images/image1.jpeg', alt: 'Date Night Photo 3' },
    { src: '/images/image3.jpg', alt: 'Date Night Photo 1' },
    { src: '/images/image7.jpg', alt: 'Date Night Photo 2' },
    { src: '/images/image9.jpeg', alt: 'Date Night Photo 3' },

  ];

  // Right-side images
  const rightPictures = [
    { src: '/images/image2.jpeg', alt: 'Vacation Memory 1' },
    { src: '/images/image5.jpg', alt: 'Vacation Memory 2' },
    { src: '/images/image6.jpg', alt: 'Vacation Memory 3' },
    { src: '/images/image8.jpeg', alt: 'Date Night Photo 3' },
    { src: '/images/image4.jpeg', alt: 'Date Night Photo 3' },

  ];

  return (
    <>
      {/* Left Strip */}
      <div className="film-edge film-edge-left">
        <div className="film-strip-title">Our</div>
        {leftPictures.map((pic, idx) => (
          <div className="photobooth-frame" key={`left-${idx}`}>
            <img src={pic.src} alt={pic.alt} />
          </div>
        ))}
      </div>

      {/* Right Strip */}
      <div className="film-edge film-edge-right">
        <div className="film-strip-title"> Memories</div>
        {rightPictures.map((pic, idx) => (
          <div className="photobooth-frame" key={`right-${idx}`}>
            <img src={pic.src} alt={pic.alt} />
          </div>
        ))}
      </div>
    </>
  );
};

export default FilmStripEdges;

import React, { useState } from 'react';
import Crossword from './components/Crossword';
import Quiz from './components/Quiz';
import FinalMessage from './components/FinalMessage';
import FloatingHearts from './components/FloatingHearts';
import FilmStripEdges from './components/FilmStripEdges';
import './App.css'; // App-level CSS

function App() {
  const [step, setStep] = useState(0);
  const [isCrosswordDone, setIsCrosswordDone] = useState(false);


  // Called when crossword is completed
  const handleCrosswordComplete = () => {
    setStep(1); // Move to Quiz
    setIsCrosswordDone(true);
  };

  // Called when quiz is completed
  const handleQuizComplete = () => {
    setStep(2); // Move to FinalMessage
  };
  

  return (
    <div className="app-container">
      <h1>Valentine’s Day Puzzle Adventure</h1>
      <FilmStripEdges />
      {isCrosswordDone && <FloatingHearts/>}

      {step === 0 && <Crossword onComplete={handleCrosswordComplete} />}
      {step === 1 && <Quiz onComplete={handleQuizComplete} />}
      {step === 2 && <FinalMessage />}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './Quiz.css';

const quizData = [
  {
    question: 'What was one of the topics we talked about when we first got introduced?',
    options: ['the football team', 'a hindi movie', 'the weather'],
    correct: 'a hindi movie',
  },
  {
    question: 'Which snack do I always steal from you?',
    options: ['chips', 'fries', 'icecream', 'all of the above'],
    correct: 'all of the above',
  },
  {
    question: 'How did we greet each other in the beginning?',
    options: ['handshake', 'hug', 'kiss'],
    correct: 'handshake',
  },
  {
    question: 'How many dates before we kissed?',
    options: ['1', '2', '3'],
    correct: '3',
  },
  {
    question: 'Who made the first move?',
    options: ['Aayush', 'Saumya'],
    correct: 'Aayush',
  },

];

const Quiz = ({ onComplete }) => {
  // We’ll store user answers in this array
  const [answers, setAnswers] = useState(Array(quizData.length).fill(''));

  const [feedback, setFeedback] = useState('');

  const handleOptionChange = (qIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let score = 0;
    quizData.forEach((q, idx) => {
      if (answers[idx] === q.correct) {
        score++;
      }
    });
    if (score === quizData.length) {
      setFeedback('You got them all correct! ♥');
      setTimeout(() => {
        onComplete();
      }, 1000);
    } else {
      setFeedback(`You got ${score} out of ${quizData.length}. Try again!`);
    }
  };

  return (
    <div className="quiz-section">
      <h2>Relationship Quiz</h2>
      {quizData.map((item, qIndex) => (
        <div key={qIndex} className="quiz-question">
          <p><strong>{qIndex + 1}) {item.question}</strong></p>
          {item.options.map((option) => (
            <label key={option} className="quiz-option">
              <input
                type="radio"
                name={`question${qIndex}`}
                value={option}
                checked={answers[qIndex] === option}
                onChange={() => handleOptionChange(qIndex, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit}>Submit Quiz</button>
      <p className="feedback">{feedback}</p>
    </div>
  );
};

export default Quiz;

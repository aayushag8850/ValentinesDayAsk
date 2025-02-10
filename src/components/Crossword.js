import React, { useState, useRef } from 'react';
import './Crossword.css';

/**
 * Each item in puzzleLayout is either null (black/unavailable) or an object:
 * {
 *   clueNumA?: number,    // clue number for an Across entry starting here
 *   clueNumD?: number,    // clue number for a Down entry starting here
 *   solution: string,     // correct letter (optional, if you want validation)
 * }
 *
 * We'll approximate the puzzle shape from your screenshot.
 * The grid below is 9 rows x 10 columns (row=0..7, col=0..8).
 */
const puzzleLayout = [
    [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        { clueNumD: 1, solution: 'p' },
        null,
      ],
  // Row 0 (top row): 9 open cells, with #1 and #2 in first two squares
  [
    null,
    null,
    null,
    { clueNumA: 1, solution: 'b' },
    { clueNumD: 2, solution: 's' },
    { solution: 'c' },
    { solution: 'h' },
    { solution: 'o' },
    { solution: 'o' },
    { solution: 'l' },
  ],
  // Row 1: in the screenshot, only columns 1..2..3..4..5 are part of the puzzle,
  // but let's approximate. We'll leave some black squares to mimic the layout.
  [
    null,
    null,
    null, // continues Down #2
    null,
    { solution: 't' },
    null,
    null, // #5 starts here going down
    null,
    { solution: 'o' },
    null,
  ],
  // Row 2: columns for #3 Down, #5 Down, etc.
  [
    { clueNumD: 3, solution: 'p' },
    null,
    null, // #2 down continues
    null, // #3 starts here, going down
    { solution: 'y' },
    null, // #4 Across starts
    null,              // #5 down continues
    null,
    { solution: 'k' },
    null,
  ],
  // Row 3
  [
    { solution: 'e' },
    null,
    { clueNumA:2, solution: 'w' }, // #2 down continues
    { solution: 'a' }, // #3 down continues
    { solution: 'l' },
    { solution: 'l' }, // #4 across continues
    { solution: 'e' }, // #5 down continues
    null,
    { solution: 'i' }, // pookie down
    null,
  ],
  // Row 4
  [
    { solution: 'o' }, //peonies down
    null,
    null, 
    null, 
    { solution: 'e' }, //styles down
    null, 
    null, 
    null, 
    { solution: 'e' }, //pookie down
    null,
  ],
  // Row 5
  [
    { clueNumA: 3, solution: 'n' },
    { solution: 'e' },
    { solution: 'r' },
    { solution: 'd' }, 
    { solution: 's' },
    null,
    null, // #5 down continues
    null, // #6 across continues
    null,
    null,
  ],
  // Row 6
  [
    { solution: 'i' },
    null, // #7 across starts
    null,
    null,
    null,
    null,
    null, // #5 down ends?
    null, // #6 across continues (overlaps row above?)
    null,
    null,
  ],
  // Row 7
  [
    { solution: 'e' },
    null, // #7 across starts
    null,
    null,
    null,
    null,
    null, // #5 down ends?
    null, // #6 across continues (overlaps row above?)
    null,
    null,
  ],
  // Row 8
  [
    { clueNumA: 4, solution: 's' },
    { solution: 't' },
    { solution: 'u' },
    { solution: 'p' },
    { solution: 'i' },
    { solution: 'd' },
    null, // #5 down ends?
    null, // #6 across continues (overlaps row above?)
    null,
    null,
  ],
];

const Crossword = ({ onComplete }) => {
  // Convert puzzle layout to a matching 2D array of user inputs
  const [userGrid, setUserGrid] = useState(() =>
    puzzleLayout.map(row =>
      row.map(cell =>
        cell ? '' : null // if cell is null, keep null in userGrid; else empty string
      )
    )
  );
  const [feedback, setFeedback] = useState('');

  // Create refs for each open cell so we can move focus
  // We'll store them in a parallel structure to puzzleLayout
  const cellRefs = useRef(
    puzzleLayout.map((row) =>
      row.map((cell) => (cell ? React.createRef() : null))
    )
  );

  // Handler for user typing a letter
  const handleChange = (r, c, value) => {
    const letter = value.toUpperCase().slice(0, 1); // single uppercase char

    // Update userGrid
    const newGrid = userGrid.map((row) => [...row]);
    newGrid[r][c] = letter;
    setUserGrid(newGrid);

    // If the user typed a letter, move forward
    if (letter) {
      const [nextR, nextC] = findNextCell(r, c);
      if (nextR !== null && nextC !== null) {
        cellRefs.current[nextR][nextC].current.focus();
      }
    }
  };

  // Handler for backspace logic: if the current cell is empty, move focus backward
  const handleKeyDown = (r, c, e) => {
    if (e.key === 'Backspace' && !userGrid[r][c]) {
      e.preventDefault();
      const [prevR, prevC] = findPrevCell(r, c);
      if (prevR !== null && prevC !== null) {
        const newGrid = userGrid.map((row) => [...row]);
        newGrid[r][c] = ''; // ensure it's empty
        setUserGrid(newGrid);
        cellRefs.current[prevR][prevC].current.focus();
      }
    }
  };

  // Move to next cell to the right (or next row) in reading order
  function findNextCell(row, col) {
    let nr = row;
    let nc = col + 1;
    // move to next row if we go past the last column
    while (nr < puzzleLayout.length) {
      while (nc < puzzleLayout[nr].length) {
        if (puzzleLayout[nr][nc]) {
          return [nr, nc];
        }
        nc++;
      }
      nr++;
      nc = 0;
    }
    return [null, null]; // no next cell
  }

  // Move to the previous cell in reading order
  function findPrevCell(row, col) {
    let nr = row;
    let nc = col - 1;
    while (nr >= 0) {
      while (nc >= 0) {
        if (puzzleLayout[nr][nc]) {
          return [nr, nc];
        }
        nc--;
      }
      nr--;
      if (nr >= 0) {
        nc = puzzleLayout[nr].length - 1;
      }
    }
    return [null, null]; // no previous cell
  }

  const checkCrossword = () => {
    for (let r = 0; r < puzzleLayout.length; r++) {
      for (let c = 0; c < puzzleLayout[r].length; c++) {
        const cell = puzzleLayout[r][c];
        // If this is an open cell (not null in the layout)
        if (cell) {
          // We expect puzzleLayout[r][c].solution to be the correct letter
          const correctLetter = (cell.solution || '').toUpperCase();
          const userLetter = (userGrid[r][c] || '').toUpperCase();
  
          // If the user’s letter is blank or not matching the solution
          if (!userLetter || userLetter !== correctLetter) {
            console.log((userLetter))
            console.log((correctLetter))
            setFeedback('Some letters are incorrect. Keep trying!');
            return;
          }
        }
      }
    }
  
    // If we get here, every cell matches its solution.
    setFeedback('All letters correct! On to the next puzzle...');
    setTimeout(() => {
      onComplete(); // or do whatever final action you need
    }, 1000);
  };
  

  return (
    <div className="crossword-section">
      <h2>Crossword Puzzle</h2>
      <p><strong>Across</strong></p>
      <ol style={{ textAlign: 'left', margin: '0 auto', display: 'inline-block' }}>
        <li>Where we first met</li>
        <li>our halloween costume inspo</li>
        <li>One of your favorite candies</li>
        <li>Something I called you on our first date</li>
      </ol>
      <p><strong>Down</strong></p>
      <ol style={{ textAlign: 'left', margin: '0 auto', display: 'inline-block' }}>
        <li>Something you call me</li>
        <li>The last name of your favorite person</li>
        <li>Your favorite flower</li>
      </ol>

      <div className="puzzle-grid">
        {puzzleLayout.map((row, rIdx) => (
          <div className="puzzle-row" key={`row-${rIdx}`}>
            {row.map((cell, cIdx) => {
              if (!cell) {
                // null => black / unavailable
                return <div className="cell black-cell" key={`cell-${rIdx}-${cIdx}`} />;
              }
              const { clueNumA, clueNumD } = cell;
              return (
                <div className="cell" key={`cell-${rIdx}-${cIdx}`}>
                  {/* Clue numbers, if any */}
                  {(clueNumA || clueNumD) && (
                    <span className="clue-label">
                      {clueNumA || clueNumD}
                    </span>
                  )}
                  <input
                    ref={cellRefs.current[rIdx][cIdx]}
                    className="cell-input"
                    type="text"
                    maxLength={1}
                    value={userGrid[rIdx][cIdx]}
                    onChange={(e) => handleChange(rIdx, cIdx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(rIdx, cIdx, e)}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <button onClick={checkCrossword} style={{ marginTop: '1rem' }}>
        Check Crossword
      </button>
      <p className="feedback">{feedback}</p>
    </div>
  );
};

export default Crossword;

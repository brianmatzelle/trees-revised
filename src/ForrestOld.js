import React, { useState, useEffect } from 'react';
import Tree from './TreeOld';

export default function Forest({ forestWidth, forestHeight, rowsColsCount, alreadyOnFire, setAlreadyOnFire, setInMotion, probability, bet }) {

  // Initialize 2D array with 'false' values
  const [forest, setForest] = useState(
    Array.from({ length: rowsColsCount }, () => Array.from({ length: rowsColsCount }, () => false))
  );

  useEffect(() => {
    // Check if the value of alreadyOnFire has changed to false
    if (!alreadyOnFire) {
      // Reset the forest state
      setForest(
        Array.from({ length: rowsColsCount }, () => Array.from({ length: rowsColsCount }, () => false))
      );
    }
  }, [rowsColsCount, alreadyOnFire]);  // Run the effect whenever alreadyOnFire changes

  const propagateFire = (x, y) => {
    if (forest[x][y]) return;
  
    let newForest = [...forest];
    newForest[x][y] = true;
    setForest(newForest);
    
    // For each of the 4 neighbors
    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
      const nx = x + dx, ny = y + dy;
  
      // Check boundary
      if (nx >= 0 && nx < rowsColsCount && ny >= 0 && ny < rowsColsCount) {
        // Propagate fire with n% chance
        if (Math.random() < probability /* 50% chance */) {
          setTimeout(() => {
            propagateFire(nx, ny);
          }, 200);  // 1000ms (or 1 second) delay
        }
      }
    });
  };
  
  const treeHeight = 'calc(100% / ' + rowsColsCount + ')';

  return (
    <div style={{ border: '2px solid black', width: forestWidth, height: forestHeight }}>
      {forest.map((row, x) => {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: treeHeight,
            }}
          >
            {row.map((tree, y) => (
              <Tree setOnFire={() => propagateFire(x, y)} onFire={tree} alreadyOnFire={alreadyOnFire} setAlreadyOnFire={setAlreadyOnFire} odds={probability} payout={bet * .1}/>
            ))}
          </div>
        );
      })}
    </div>
  );
}

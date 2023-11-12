import React, { useState, useEffect } from 'react';
import Unit from './Unit';

function Grid({ alreadyOnFire, setAlreadyOnFire }) {
    // const [units, setUnits] = useState<JSX.Element[]>([]);
    const [grid, setGrid] = useState(
        Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => false))
    );
    const [probabilities, setProbabilities] = useState(
        Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => 0))
    );

    useEffect(() => {
        // Check if the value of alreadyOnFire has changed to false
        if (!alreadyOnFire) {
          // Reset the forest state
          setGrid(
            Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => false))
          );
        }
      }, [alreadyOnFire]);  // Run the effect whenever alreadyOnFire changes

    // Inside the Grid component

    const propagateFire = (x, y) => {
        if (grid[x][y]) return;

        let newGrid = [...grid];
        newGrid[x][y] = true;
        setGrid(newGrid);

        // Calculate probabilities for all cells in the grid
        const updatedGrid = newGrid.map((row, rowIdx) =>
            row.map((_, colIdx) => calculateProbability(colIdx, rowIdx, newGrid))
        );

        // Update the grid with the new probabilities
        setGrid(updatedGrid);

        // For each of the 4 neighbors
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
            const nx = x + dx, ny = y + dy;

            // Check boundary
            if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
                // Calculate the probability based on the updated grid
                const probability = calculateProbability(nx, ny, updatedGrid);
                // const probability = 0.5;

                // Propagate fire with the calculated probability
                if (Math.random() < probability) {
                    setTimeout(() => {
                        propagateFire(nx, ny);
                    }, 200);  // 200ms delay
                }
            }
        });
    };

    

    // function to calculate the probability of a fire spreading to a neighbor, based on the number of neighbors that are on fire
    function calculateProbability(x, y) {
        let neighborsOnFire = 0;
        // For each of the 4 neighbors
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
            const nx = x + dx, ny = y + dy;
            // Check boundary
            if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
                if (grid[nx][ny]) {
                    neighborsOnFire++;
                }
            }
        });
    
        // Calculate probability as a function of neighborsOnFire
        // You can adjust this formula to fit your specific requirements
        const probability = neighborsOnFire / 4;
        console.log(x, y, probability);
        return probability;
    }
    
    
    

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '600px',
            height: '600px',
        }}>
            {grid.map((row, x) => {
                return (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: '100%',
                        }}
                    >
                        {row.map((unit, y) => (
                            <Unit
                                setOnFire={() => propagateFire(x, y)}
                                onFire={unit}
                                alreadyOnFire={alreadyOnFire}
                                setAlreadyOnFire={setAlreadyOnFire}
                                probability={calculateProbability(x, y)} // Pass the calculated probability
                                x={x}
                                y={y}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    )
}

export default Grid;
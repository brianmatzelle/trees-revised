import React, { useState, useEffect } from 'react';
import Unit from './Unit.tsx';

function Grid({ alreadyOnFire, setAlreadyOnFire }) {
    const LENGTH = 21;
    const USER_PROBABILTY = 0.4;    // user probability > 0.5 would be betting on the fire not spreading enough
    const DELAY = 200;  // Xms delay

    const [grid, setGrid] = useState(
        Array.from({ length: LENGTH }, () => Array.from({ length: LENGTH }, () => false))
    );

    useEffect(() => {
        // Check if the value of alreadyOnFire has changed to false
        if (!alreadyOnFire) {
          // Reset the forest state
          setGrid(
            Array.from({ length: LENGTH }, () => Array.from({ length: LENGTH }, () => false))
          );
        }
      }, [alreadyOnFire]);  // Run the effect whenever alreadyOnFire changes

    // Inside the Grid component

    const propagateFire = (x, y) => {
        if (grid[x][y]) return;

        let newGrid = [...grid];
        newGrid[x][y] = true;
        setGrid(newGrid);

        // For each of the 4 neighbors
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
            const nx = x + dx, ny = y + dy;

            // Check boundary
            if (nx >= 0 && nx < LENGTH && ny >= 0 && ny < LENGTH) {
                // Calculate the probability based on the updated grid
                const probability = calculateProbability(nx, ny);
                // const probability = 0.5;

                // Propagate fire with the calculated probability
                if (Math.random() < probability) {
                    setTimeout(() => {
                        propagateFire(nx, ny);
                    }, DELAY);  // 200ms delay
                }
            }
        });
    };

    function calcBinomialDistOneSuccess(numTrials) {
        // https://math.stackexchange.com/questions/3046029/binomial-distribution-unfair-coin
        return 1 - Math.pow(1 - USER_PROBABILTY, numTrials);
    }

    // function to calculate the probability of a fire spreading to a neighbor, based on the number of neighbors that are on fire
    function calculateProbability(x, y) {
        let neighborsOnFire = 0;
        // For each of the 4 neighbors
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
            const nx = x + dx, ny = y + dy;
            // Check boundary
            if (nx >= 0 && nx < LENGTH && ny >= 0 && ny < LENGTH) {
                if (grid[nx][ny]) {
                    neighborsOnFire++;
                }
            }
        });
    
        // Calculate probability as a function of neighborsOnFire
        // const probability = (neighborsOnFire / 4);
        const probability = neighborsOnFire ? calcBinomialDistOneSuccess(neighborsOnFire) : 0;
        return probability;
    }
    

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '800px',
            height: '800px',
        }}>
            {grid.map((row, x) => {
                return (
                    <div
                        key={x}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: '100%',
                        }}
                    >
                        {row.map((unit, y) => (
                            <Unit
                            key={`${x}-${y}`}
                            setOnFire={() => propagateFire(x, y)}
                            onFire={unit}
                            alreadyOnFire={alreadyOnFire}
                            setAlreadyOnFire={setAlreadyOnFire}
                            probability={calculateProbability(x, y)}
                            middleX={x === Math.floor(LENGTH / 2)}
                            middleY={y === Math.floor(LENGTH / 2)}
                            x={y - Math.floor(LENGTH / 2)}
                            y={Math.floor(LENGTH / 2) - x}
                            length={LENGTH}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    )
}

export default Grid;
import './App.css';
import React, { useState, useEffect } from 'react';
import Forest from './components/Forest';

/* 
MAJOR BUG:
When clicking reset while the fire is spreading, the inputs are enabled, but the forest is still on fire.
To fix this, implement inMotion state variable to prevent the user from changing the grid size while the forest is on fire.
Afterwards, move alreadyOnFire state variable to Forest.js and pass it down to Tree.js as a prop.
*/

function App() {
  // determine forest width and heigh based on window size
  console.log(window.innerWidth, window.innerHeight);
  const [forestWidth, setForestWidth] = useState('600px');
  const [forestHeight, setForestHeight] = useState('600px');
  const [rowsColsCount, setRowsColsCount] = useState(12); // rows always === cols because forest is square
  const [alreadyOnFire, setAlreadyOnFire] = useState(false); // This is used to prevent two forest fires from starting on the same roll
  const [inMotion, setInMotion] = useState(false); // This is used to prevent the user from changing the grid size while the forest is on fire
  const [probability, setProbability] = useState(0.5); // 50% chance of fire spreading to a neighbor
  const [bet, setBet] = useState(0.50); // 1 cent

  useEffect(() => {
    if (window.innerWidth < 1200) {
      // small screen
      setForestWidth('400px');
      setForestHeight('400px');
    }
  }, []);

  useEffect(() => {
    console.log("inMotion changed to: ", inMotion);
  }, [inMotion]);

  return (
    <div className="App" style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: '100vw',
      height: '100vh',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h1>Forest Fire Simulation</h1>
        <p>Click on a tree to start a fire!</p>
        <p>Probability of fire spreading to a neighbor: {probability * 100}%</p>
        <input type="range" min="0" max="1" step="0.01" value={probability} onChange={(e) => setProbability(e.target.value)} disabled={alreadyOnFire}/>
        <p>Grid size: {rowsColsCount} x {rowsColsCount}</p>
        <input type="range" min="2" max="20" step="1" value={rowsColsCount} onChange={(e) => setRowsColsCount(e.target.value)} disabled={alreadyOnFire}/>
        <button onClick={() => setAlreadyOnFire(false)} disabled={inMotion}>Reset</button>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h1>Gold Rush Betting</h1>
        <p>How much would you like to bet?</p>
        <input type="range" min="0.01" max="1" step="0.01" value={bet} onChange={(e) => setBet(e.target.value)} disabled={alreadyOnFire}/>
        <p>Current bet: ${bet}</p>
      </div>
      <Forest forestWidth={forestWidth} forestHeight={forestHeight} rowsColsCount={rowsColsCount} alreadyOnFire={alreadyOnFire} setAlreadyOnFire={setAlreadyOnFire} setInMotion={setInMotion} probability={probability} bet={bet} />
    </div>
  );
}

export default App;

import './App.css';
import React, { useState } from 'react';
import Grid from './components/Grid.tsx';

function App() {
  const [alreadyOnFire, setAlreadyOnFire] = useState(false); // This is used to prevent two forest fires from starting on the same roll
  
  return (
    <div className="App" style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#282C34',
    }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100vw',
      }}>
        <button
        onClick={() => {
          setAlreadyOnFire(false);
        }}
        >Reset</button>
        <Grid 
        alreadyOnFire={alreadyOnFire} 
        setAlreadyOnFire={setAlreadyOnFire} 
        />
      </div>
    </div>
  )
}

export default App;

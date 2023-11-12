import './App.css';
import React, { useState, useEffect } from 'react';
import Grid from './components/Grid';

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
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Grid alreadyOnFire={alreadyOnFire} setAlreadyOnFire={setAlreadyOnFire} />
      </div>
    </div>
  )
}

export default App;

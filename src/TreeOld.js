import tree from '../assets/detailed-8bit.jpg';
import burningTree from '../assets/burning-tree-2.jpg';
import React from 'react';

export default function Tree({ setOnFire, onFire, alreadyOnFire, setAlreadyOnFire, odds, payout }) {
    return (
      <div
        onClick={() => {
          // setOnFire(true);
          if (!onFire && !alreadyOnFire) {
            setOnFire(true);
          }
          setAlreadyOnFire(true);
        }}
        style={{
          border: onFire ? '1px solid green' : '1px solid red',
          padding: '0px',
          margin: '0px',
          backgroundColor: onFire ? 'green' : '#8B0000', // If on fire, set to red, else green
          color: 'white',
          width: '100%',
          height: '100%',
        }}
      >
        {/* {!onFire && odds + '%'}
        {onFire && '$' + payout} */}
        
        {!onFire && <img src={tree} alt="tree" style={{ width: '100%', height: '100%' }} />}
        {onFire && <img src={burningTree} alt="tree" style={{ width: '100%', height: '100%' }} />}
       
      </div>
    );
  }
  
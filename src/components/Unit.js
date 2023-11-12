import React from 'react';

// type UnitProps = {
//   onFire: boolean,
//   probability: string,
// }

function Unit({ setOnFire, onFire, alreadyOnFire, setAlreadyOnFire, probability, x, y }) {
  const probToString = (probability * 100).toString() + '%';
  

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
        border: onFire ? '1px solid red' :'1px solid green',
        padding: '0px',
        margin: '0px',
        backgroundColor: '#282C34' , // If on fire, set to red, else green
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* {x + ', ' + y } */}
      <div
      style={{
        border: '0px',
        padding: '0px',
        margin: '0px',
        backgroundColor: '#8B0000',
        width: onFire ? '100%' : probToString,
        height: onFire ? '100%' : probToString,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        {'p:' + probToString + ' f:' + onFire}
        
      </div>
    </div>
  )
}

export default Unit;
// export type { UnitProps };
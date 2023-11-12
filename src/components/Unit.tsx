import React from 'react';

type UnitProps = {
  setOnFire: Function;
  onFire: boolean;
  alreadyOnFire: boolean;
  setAlreadyOnFire: Function;
  probability: number;
  middleX: boolean;
  middleY: boolean;
}

function Unit(UnitProps: UnitProps): JSX.Element {
  const { setOnFire, onFire, alreadyOnFire, setAlreadyOnFire, probability, middleX, middleY } = UnitProps;

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
        border: onFire ? '1px solid red' : '1px solid green',
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
        {middleX && middleY && '🔥'}
      </div>
    </div>
  )
}

export default Unit;
export type { UnitProps };
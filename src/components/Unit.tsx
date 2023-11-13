import React from 'react';

type UnitProps = {
  setOnFire: Function;
  onFire: boolean;
  alreadyOnFire: boolean;
  setAlreadyOnFire: Function;
  probability: number;
  middleX: boolean;
  middleY: boolean;
  x: number;
  y: number;
  length: number;
}



function Unit(UnitProps: UnitProps): JSX.Element {
  const { setOnFire, onFire, alreadyOnFire, setAlreadyOnFire, probability, middleX, middleY, x, y, length } = UnitProps;
  const probToString = (probability * 100).toString() + '%';
  const both = middleX && middleY;
  function getlabel(x: number, y: number, length: number): string {
    let ret = '';
    if (both) {
      ret = '🔥';
    }
    else if ((x === 2 && y === 1) || (x === 1 && y === 2) || (x === 3 && y === 2) || (x === 2 && y === 3)) { 
      ret = 'a';
    }
    else if ( (x === 1 && y === 1) || (x === 3 && y === 1) || (x === 1 && y === 3) || (x === 3 && y === 3)) { 
      ret = 'b';
    }
    else if ( (x === 1 && y === 0) || (x === 3 && y === 0) || (x === 1 && y === 4) || (x === 3 && y === 4) || (x === 0 && y === 1) || (x === 0 && y === 3) || (x === 4 && y === 1) || (x === 4 && y === 3)) {
      ret = 'c';
    }
    else if ( (x === 0 && y === 0) || (x === 4 && y === 0) || (x === 0 && y === 4) || (x === 4 && y === 4)) {
      ret = 'd';
    }
    else if ((x === 2 && y === 0) || (x === 0 && y === 2) || (x === 4 && y === 2) || (x === 2 && y === 4)) {
      ret = 'e';
    }
    return ret
  }
  function getGradientColor(x: number, y: number, length: number): string {
    let color = '';
    if ((x === 2 && y === 1) || (x === 1 && y === 2) || (x === 3 && y === 2) || (x === 2 && y === 3)) { 
      color = 'yellow';
    }
    else if ( (x === 1 && y === 1) || (x === 3 && y === 1) || (x === 1 && y === 3) || (x === 3 && y === 3)) { 
      color = 'orange';
    }
    else if ( (x === 1 && y === 0) || (x === 3 && y === 0) || (x === 1 && y === 4) || (x === 3 && y === 4) || (x === 0 && y === 1) || (x === 0 && y === 3) || (x === 4 && y === 1) || (x === 4 && y === 3)) {
      color = 'red';
    }
    else if ( (x === 0 && y === 0) || (x === 4 && y === 0) || (x === 0 && y === 4) || (x === 4 && y === 4)) {
      color = 'purple';
    }
    else if ((x === 2 && y === 0) || (x === 0 && y === 2) || (x === 4 && y === 2) || (x === 2 && y === 4)) {
      color = 'blue';
    }
    return color
  }

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
        color: onFire ? 'red' : getGradientColor(x, y, length),
        fontSize: '32px',
      }}
      >
        {/* { !both && middleX && '-' } */}
        {/* for vertical: https://unicode.org/charts/nameslist/n_2500.html */}
        {/* { !both && middleY && '╹' } */}
        {/* { x + ',' + y + '\n' } */}
        {/* { both && '🔥' } */}
        { getlabel(x, y, length) }
      </div>
    </div>
  )
}

export default Unit;
export type { UnitProps };
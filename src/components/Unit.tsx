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
  
  function getLabel() {
    if (both) {
      return '🔥';
    } else if (middleX) {
      return '-';
    } else if (middleY) {
      // for vertical: https://unicode.org/charts/nameslist/n_2500.html
      return '╹';
    } else {
      return '';
    }
  }

  function getCircularGradientColor(x, y, length) {
    const radius = Math.sqrt(x * x + y * y);
    const maxRadius = Math.sqrt(length * length + length * length);
    const percent = radius / maxRadius;
    const hue = percent * 360;
    return `hsl(${hue}, 100%, 50%)`;
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
        color: onFire ? 'red' : getCircularGradientColor(x, y, length),
      }}
      >
        { x + ',' + y + '\n' }
        { getLabel() }
      </div>
    </div>
  )
}

export default Unit;
export type { UnitProps };
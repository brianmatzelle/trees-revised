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

  // calculate the areas of the four quadrants surrounding the given x, y coordinates
  function calcAreas(x, y, length) {
    // let str = "x=" + x + ",y=" + y;
    const halfLen = Math.floor(length / 2);
    const botRight = (halfLen - x) * (halfLen + y);
    const botLeft = (halfLen + x) * (halfLen + y);
    const topRight = (halfLen - x) * (halfLen - y);
    const topLeft = (halfLen + x) * (halfLen - y);
    // const str = botRight + ',' + botLeft + ',' + topRight + ',' + topLeft;
    // calculate the range of the areas
    const max = Math.max(botRight, botLeft, topRight, topLeft);
    const min = Math.min(botRight, botLeft, topRight, topLeft);
    const range = max - min;
    return range/(length-1);
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
        {/* { x + ',' + y + '\n' } */}
        {calcAreas(x, y, length)}
        {/* { getLabel() } */}
      </div>
    </div>
  )
}

export default Unit;
export type { UnitProps };
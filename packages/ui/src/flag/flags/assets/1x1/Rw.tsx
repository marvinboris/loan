import * as React from 'react';
import Svg, { Path, G, Use, Circle } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgRw = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path fill="#20603d" d="M0 0h512v512H0z" />
    <Path fill="#fad201" d="M0 0h512v384H0z" />
    <Path fill="#00a1de" d="M0 0h512v256H0z" />
    <G transform="translate(374.4 133.8)scale(.7111)">
      <G id="rw_svg__b">
        <Path
          id="rw_svg__a"
          fill="#e5be01"
          d="M116.1 0 35.7 4.7l76.4 25.4-78.8-16.3L100.6 58l-72-36.2L82 82.1 21.9 28.6l36.2 72-44.3-67.3L30 112 4.7 35.7 0 116.1-1-1z"
        />
        <Use xlinkHref="#rw_svg__a" width="100%" height="100%" transform="scale(1 -1)" />
      </G>
      <Use xlinkHref="#rw_svg__b" width="100%" height="100%" transform="scale(-1 1)" />
      <Circle r={34.3} fill="#e5be01" stroke="#00a1de" strokeWidth={3.4} />
    </G>
  </Svg>
);
export default SvgRw;

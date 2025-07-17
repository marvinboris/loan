import * as React from 'react';
import Svg, { Path, G, Use, Circle } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgKr = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path fill="#fff" fillRule="evenodd" d="M0 0h512v512H0Z" />
    <G fillRule="evenodd" transform="rotate(-56.3 367.2 -111.2)scale(9.375)">
      <G id="kr_svg__b">
        <Path id="kr_svg__a" fill="#000001" d="M-6-26H6v2H-6Zm0 3H6v2H-6Zm0 3H6v2H-6Z" />
        <Use xlinkHref="#kr_svg__a" width="100%" height="100%" y={44} />
      </G>
      <Path stroke="#fff" d="M0 17v10" />
      <Path fill="#cd2e3a" d="M0-12a12 12 0 0 1 0 24Z" />
      <Path fill="#0047a0" d="M0-12a12 12 0 0 0 0 24A6 6 0 0 0 0 0Z" />
      <Circle cy={-6} r={6} fill="#cd2e3a" />
    </G>
    <G fillRule="evenodd" transform="rotate(-123.7 196.5 59.5)scale(9.375)">
      <Use xlinkHref="#kr_svg__b" width="100%" height="100%" />
      <Path stroke="#fff" d="M0-23.5v3M0 17v3.5m0 3v3" />
    </G>
  </Svg>
);
export default SvgKr;

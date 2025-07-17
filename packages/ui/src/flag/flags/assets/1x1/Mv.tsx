import * as React from 'react';
import Svg, { Path, Circle, Ellipse } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgMv = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#d21034" d="M0 0h512v512H0z" />
    <Path fill="#007e3a" d="M128 128h256v256H128z" />
    <Circle cx={288} cy={256} r={85.3} fill="#fff" />
    <Ellipse cx={308.6} cy={256} fill="#007e3a" rx={73.9} ry={85.3} />
  </Svg>
);
export default SvgMv;

import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgNe = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#0db02b" d="M0 0h512v512H0z" />
    <Path fill="#fff" d="M0 0h512v341.3H0z" />
    <Path fill="#e05206" d="M0 0h512v170.7H0z" />
    <Circle cx={256} cy={256} r={72.5} fill="#e05206" />
  </Svg>
);
export default SvgNe;

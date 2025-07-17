import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgBq = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#21468b" d="M0 0h512v512H0z" />
    <Path fill="#fff" d="M0 0h512v341.3H0z" />
    <Path fill="#ae1c28" d="M0 0h512v170.7H0z" />
  </Svg>
);
export default SvgBq;

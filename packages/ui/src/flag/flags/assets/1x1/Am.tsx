import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgAm = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#d90012" d="M0 0h512v170.7H0z" />
    <Path fill="#0033a0" d="M0 170.7h512v170.6H0z" />
    <Path fill="#f2a800" d="M0 341.3h512V512H0z" />
  </Svg>
);
export default SvgAm;

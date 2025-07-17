import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgAe = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#00732f" d="M0 0h512v170.7H0z" />
    <Path fill="#fff" d="M0 170.7h512v170.6H0z" />
    <Path fill="#000001" d="M0 341.3h512V512H0z" />
    <Path fill="red" d="M0 0h180v512H0z" />
  </Svg>
);
export default SvgAe;

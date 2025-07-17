import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSr = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#377e3f" d="M0 0h512v512H0z" />
    <Path fill="#fff" d="M0 102.4h512v307.2H0z" />
    <Path fill="#b40a2d" d="M0 153.6h512v204.8H0z" />
    <Path fill="#ecc81d" d="m255.9 163.4 60.2 185.2-157.6-114.5h194.8L195.7 348.6z" />
  </Svg>
);
export default SvgSr;

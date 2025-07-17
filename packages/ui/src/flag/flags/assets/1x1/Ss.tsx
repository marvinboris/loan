import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSs = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#078930" d="M0 358.4h512V512H0z" />
    <Path fill="#fff" d="M0 153.6h512v204.8H0z" />
    <Path fill="#000001" d="M0 0h512v153.6H0z" />
    <Path fill="#da121a" d="M0 179.2h512v153.6H0z" />
    <Path fill="#0f47af" d="m0 0 433 256L0 512z" />
    <Path fill="#fcdd09" d="M209 207.8 64.4 256l144.8 48.1-89.5-126v155.8z" />
  </Svg>
);
export default SvgSs;

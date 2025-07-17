import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgMq = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#231f1e" d="M0 0h512v512H0z" />
    <Path fill="#00a650" d="M0 0h512v256H0z" />
    <Path fill="#ef1923" d="M256 256 0 512V0z" />
  </Svg>
);
export default SvgMq;

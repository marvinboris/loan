import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgAz = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#3f9c35" d="M0 0h512v512H0z" />
    <Path fill="#ed2939" d="M0 0h512v341.3H0z" />
    <Path fill="#00b9e4" d="M0 0h512v170.7H0z" />
    <Circle cx={238.8} cy={256} r={76.8} fill="#fff" />
    <Circle cx={255.9} cy={256} r={64} fill="#ed2939" />
    <Path
      fill="#fff"
      d="m324.2 213.3 8.1 23 22-10.5-10.4 22 23 8.2-23 8.2 10.4 22-22-10.5-8.1 23-8.2-23-22 10.5 10.5-22-23-8.2 23-8.2-10.5-22 22 10.5z"
    />
  </Svg>
);
export default SvgAz;

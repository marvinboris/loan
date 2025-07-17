import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCz = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#fff" d="M0 0h512v256H0z" />
    <Path fill="#d7141a" d="M0 256h512v256H0z" />
    <Path fill="#11457e" d="M300 256 0 56v400z" />
  </Svg>
);
export default SvgCz;

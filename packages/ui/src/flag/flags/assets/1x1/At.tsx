import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgAt = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#fff" d="M0 170.7h512v170.6H0z" />
    <Path fill="#c8102e" d="M0 0h512v170.7H0zm0 341.3h512V512H0z" />
  </Svg>
);
export default SvgAt;

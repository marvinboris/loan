import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgTh = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd">
      <Path fill="#f4f5f8" d="M0 0h512v512H0z" />
      <Path fill="#2d2a4a" d="M0 173.4h512V344H0z" />
      <Path fill="#a51931" d="M0 0h512v88H0zm0 426.7h512V512H0z" />
    </G>
  </Svg>
);
export default SvgTh;

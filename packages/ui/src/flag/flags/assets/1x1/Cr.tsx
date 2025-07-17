import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCr = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd" strokeWidth="1pt">
      <Path fill="#0000b4" d="M0 0h512v512H0z" />
      <Path fill="#fff" d="M0 80.5h512v343.7H0z" />
      <Path fill="#d90000" d="M0 168.2h512v168.2H0z" />
    </G>
  </Svg>
);
export default SvgCr;

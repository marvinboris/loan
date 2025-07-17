import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgBw = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd">
      <Path fill="#00cbff" d="M0 0h512v512H0z" />
      <Path fill="#fff" d="M0 192h512v128H0z" />
      <Path fill="#000001" d="M0 212.7h512V299H0z" />
    </G>
  </Svg>
);
export default SvgBw;

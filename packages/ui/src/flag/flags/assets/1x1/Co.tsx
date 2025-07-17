import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCo = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd" strokeWidth="1pt">
      <Path fill="#ffe800" d="M0 0h512v512H0z" />
      <Path fill="#00148e" d="M0 256h512v256H0z" />
      <Path fill="#da0010" d="M0 384h512v128H0z" />
    </G>
  </Svg>
);
export default SvgCo;

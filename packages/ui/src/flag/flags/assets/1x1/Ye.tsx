import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgYe = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd" strokeWidth="1pt">
      <Path fill="#fff" d="M0 0h512v504.3H0z" />
      <Path fill="#f10600" d="M0 0h512v167.9H0z" />
      <Path fill="#000001" d="M0 344.1h512V512H0z" />
    </G>
  </Svg>
);
export default SvgYe;

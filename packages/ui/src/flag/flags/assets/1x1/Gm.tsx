import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgGm = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd" strokeWidth="1pt">
      <Path fill="red" d="M0 0h512v170.7H0z" />
      <Path fill="#fff" d="M0 170.7h512V199H0z" />
      <Path fill="#009" d="M0 199.1h512V313H0z" />
      <Path fill="#fff" d="M0 312.9h512v28.4H0z" />
      <Path fill="#090" d="M0 341.3h512V512H0z" />
    </G>
  </Svg>
);
export default SvgGm;

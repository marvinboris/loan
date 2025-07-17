import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgNg = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd" strokeWidth="1pt">
      <Path fill="#fff" d="M0 0h512v512H0z" />
      <Path fill="#008753" d="M341.3 0H512v512H341.3zM0 0h170.7v512H0z" />
    </G>
  </Svg>
);
export default SvgNg;

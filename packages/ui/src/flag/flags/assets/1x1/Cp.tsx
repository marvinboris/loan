import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCp = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd" strokeWidth="1pt">
      <Path fill="#fff" d="M0 0h512v512H0z" />
      <Path fill="#000091" d="M0 0h170.7v512H0z" />
      <Path fill="#e1000f" d="M341.3 0H512v512H341.3z" />
    </G>
  </Svg>
);
export default SvgCp;

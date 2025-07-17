import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgMg = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd" strokeWidth="1pt">
      <Path fill="#fc3d32" d="M170.7 0H512v256H170.7z" />
      <Path fill="#007e3a" d="M170.7 256H512v256H170.7z" />
      <Path fill="#fff" d="M0 0h170.7v512H0z" />
    </G>
  </Svg>
);
export default SvgMg;

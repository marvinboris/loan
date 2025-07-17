import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCh = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd" strokeWidth="1pt">
      <Path fill="red" d="M0 0h512v512H0z" />
      <G fill="#fff">
        <Path d="M96 208h320v96H96z" />
        <Path d="M208 96h96v320h-96z" />
      </G>
    </G>
  </Svg>
);
export default SvgCh;

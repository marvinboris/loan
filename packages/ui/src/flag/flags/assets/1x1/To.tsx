import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgTo = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd" strokeWidth="1pt">
      <Path fill="#c10000" d="M0 0h512v512H0z" />
      <Path fill="#fff" d="M0 0h218.3v175H0z" />
      <G fill="#c10000">
        <Path d="M89.8 27.3h34.8v121.9H89.8z" />
        <Path d="M168.2 70.8v34.8H46.3V70.8z" />
      </G>
    </G>
  </Svg>
);
export default SvgTo;

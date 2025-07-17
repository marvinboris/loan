import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgMc = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <G fillRule="evenodd" strokeWidth="1pt">
      <Path fill="#f31830" d="M0 0h640v240H0z" />
      <Path fill="#fff" d="M0 240h640v240H0z" />
    </G>
  </Svg>
);
export default SvgMc;

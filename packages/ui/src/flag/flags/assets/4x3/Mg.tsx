import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgMg = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <G fillRule="evenodd" strokeWidth="1pt">
      <Path fill="#fc3d32" d="M213.3 0H640v240H213.3z" />
      <Path fill="#007e3a" d="M213.3 240H640v240H213.3z" />
      <Path fill="#fff" d="M0 0h213.3v480H0z" />
    </G>
  </Svg>
);
export default SvgMg;

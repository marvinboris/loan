import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgLc = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <G fillRule="evenodd">
      <Path fill="#65cfff" d="M0 0h640v480H0z" />
      <Path fill="#fff" d="m318.9 42 162.7 395.3-322.6.9z" />
      <Path fill="#000001" d="m319 96.5 140.8 340-279 .8z" />
      <Path fill="#ffce00" d="m318.9 240.1 162.7 197.6-322.6.5z" />
    </G>
  </Svg>
);
export default SvgLc;

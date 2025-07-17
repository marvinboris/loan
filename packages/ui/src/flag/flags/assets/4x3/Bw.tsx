import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgBw = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <G fillRule="evenodd">
      <Path fill="#00cbff" d="M0 0h640v480H0z" />
      <Path fill="#fff" d="M0 160h640v160H0z" />
      <Path fill="#000001" d="M0 186h640v108H0z" />
    </G>
  </Svg>
);
export default SvgBw;

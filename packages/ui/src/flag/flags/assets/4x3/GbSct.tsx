import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgGbSct = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Path fill="#0065bd" d="M0 0h640v480H0z" />
    <Path stroke="#fff" strokeWidth={0.6} d="m0 0 5 3M0 3l5-3" transform="scale(128 160)" />
  </Svg>
);
export default SvgGbSct;

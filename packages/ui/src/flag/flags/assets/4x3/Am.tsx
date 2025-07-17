import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgAm = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Path fill="#d90012" d="M0 0h640v160H0z" />
    <Path fill="#0033a0" d="M0 160h640v160H0z" />
    <Path fill="#f2a800" d="M0 320h640v160H0z" />
  </Svg>
);
export default SvgAm;

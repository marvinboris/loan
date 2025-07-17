import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgDe = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Path fill="#fc0" d="M0 320h640v160H0z" />
    <Path fill="#000001" d="M0 0h640v160H0z" />
    <Path fill="red" d="M0 160h640v160H0z" />
  </Svg>
);
export default SvgDe;

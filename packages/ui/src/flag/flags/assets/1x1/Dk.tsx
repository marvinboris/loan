import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgDk = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#c8102e" d="M0 0h512.1v512H0z" />
    <Path fill="#fff" d="M144 0h73.1v512H144z" />
    <Path fill="#fff" d="M0 219.4h512.1v73.2H0z" />
  </Svg>
);
export default SvgDk;

import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgDk = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Path fill="#c8102e" d="M0 0h640.1v480H0z" />
    <Path fill="#fff" d="M205.7 0h68.6v480h-68.6z" />
    <Path fill="#fff" d="M0 205.7h640.1v68.6H0z" />
  </Svg>
);
export default SvgDk;

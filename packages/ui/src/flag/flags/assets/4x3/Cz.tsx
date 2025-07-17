import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCz = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Path fill="#fff" d="M0 0h640v240H0z" />
    <Path fill="#d7141a" d="M0 240h640v240H0z" />
    <Path fill="#11457e" d="M360 240 0 0v480z" />
  </Svg>
);
export default SvgCz;

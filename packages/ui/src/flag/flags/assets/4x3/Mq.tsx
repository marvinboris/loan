import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgMq = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Path fill="#231f1e" d="M0 0h640v480H0z" />
    <Path fill="#00a650" d="M0 0h640v240H0z" />
    <Path fill="#ef1923" d="m0 0 320 240L0 480z" />
  </Svg>
);
export default SvgMq;

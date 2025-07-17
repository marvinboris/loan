import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgNe = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Path fill="#0db02b" d="M0 0h640v480H0z" />
    <Path fill="#fff" d="M0 0h640v320H0z" />
    <Path fill="#e05206" d="M0 0h640v160H0z" />
    <Circle cx={320} cy={240} r={68} fill="#e05206" />
  </Svg>
);
export default SvgNe;

import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgBd = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Path fill="#006a4e" d="M0 0h640v480H0z" />
    <Circle cx={280} cy={240} r={160} fill="#f42a41" />
  </Svg>
);
export default SvgBd;

import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgBd = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#006a4e" d="M0 0h512v512H0z" />
    <Circle cx={230} cy={256} r={170.7} fill="#f42a41" />
  </Svg>
);
export default SvgBd;

import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgFi = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#fff" d="M0 0h512v512H0z" />
    <Path fill="#002f6c" d="M0 186.2h512v139.6H0z" />
    <Path fill="#002f6c" d="M123.2 0h139.6v512H123.1z" />
  </Svg>
);
export default SvgFi;

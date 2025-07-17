import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgGbEng = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#fff" d="M0 0h512v512H0z" />
    <Path fill="#ce1124" d="M215 0h82v512h-82z" />
    <Path fill="#ce1124" d="M0 215h512v82H0z" />
  </Svg>
);
export default SvgGbEng;

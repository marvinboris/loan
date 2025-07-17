import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgFi = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Path fill="#fff" d="M0 0h640v480H0z" />
    <Path fill="#002f6c" d="M0 174.5h640v131H0z" />
    <Path fill="#002f6c" d="M175.5 0h130.9v480h-131z" />
  </Svg>
);
export default SvgFi;

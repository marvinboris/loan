import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgPe = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#D91023" d="M0 0h512v512H0z" />
    <Path fill="#fff" d="M170.7 0h170.6v512H170.7z" />
  </Svg>
);
export default SvgPe;

import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgPl = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd">
      <Path fill="#fff" d="M512 512H0V0h512z" />
      <Path fill="#dc143c" d="M512 512H0V256h512z" />
    </G>
  </Svg>
);
export default SvgPl;

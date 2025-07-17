import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgMu = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd">
      <Path fill="#009f4d" d="M0 384h512v128H0z" />
      <Path fill="#151f6d" d="M0 128h512v128H0z" />
      <Path fill="#ee2737" d="M0 0h512v128H0z" />
      <Path fill="#ffcd00" d="M0 256h512v128H0z" />
    </G>
  </Svg>
);
export default SvgMu;

import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgMu = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <G fillRule="evenodd">
      <Path fill="#00a04d" d="M0 360h640v120H0z" />
      <Path fill="#151f6d" d="M0 120h640v120H0z" />
      <Path fill="#ee2737" d="M0 0h640v120H0z" />
      <Path fill="#ffcd00" d="M0 240h640v120H0z" />
    </G>
  </Svg>
);
export default SvgMu;

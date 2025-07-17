import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgMl = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <G fillRule="evenodd">
      <Path fill="red" d="M425.8 0H640v480H425.7z" />
      <Path fill="#009a00" d="M0 0h212.9v480H0z" />
      <Path fill="#ff0" d="M212.9 0h214v480h-214z" />
    </G>
  </Svg>
);
export default SvgMl;

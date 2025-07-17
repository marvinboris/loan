import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCi = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <G fillRule="evenodd">
      <Path fill="#00cd00" d="M426.8 0H640v480H426.8z" />
      <Path fill="#ff9a00" d="M0 0h212.9v480H0z" />
      <Path fill="#fff" d="M212.9 0h214v480h-214z" />
    </G>
  </Svg>
);
export default SvgCi;

import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgLv = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <G fillRule="evenodd">
      <Path fill="#fff" d="M0 0h640v480H0z" />
      <Path fill="#981e32" d="M0 0h640v192H0zm0 288h640v192H0z" />
    </G>
  </Svg>
);
export default SvgLv;

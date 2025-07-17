import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgHu = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd">
      <Path fill="#fff" d="M512 512H0V0h512z" />
      <Path fill="#388d00" d="M512 512H0V341.3h512z" />
      <Path fill="#d43516" d="M512 170.8H0V.1h512z" />
    </G>
  </Svg>
);
export default SvgHu;

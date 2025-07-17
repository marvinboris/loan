import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgLv = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd">
      <Path fill="#fff" d="M0 0h512v512H0z" />
      <Path fill="#981e32" d="M0 0h512v204.8H0zm0 307.2h512V512H0z" />
    </G>
  </Svg>
);
export default SvgLv;

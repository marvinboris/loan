import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCi = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd">
      <Path fill="#00cd00" d="M341.5 0H512v512H341.5z" />
      <Path fill="#ff9a00" d="M0 0h170.3v512H0z" />
      <Path fill="#fff" d="M170.3 0h171.2v512H170.3z" />
    </G>
  </Svg>
);
export default SvgCi;

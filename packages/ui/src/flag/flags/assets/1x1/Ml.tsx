import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgMl = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd">
      <Path fill="red" d="M340.6 0H512v512H340.6z" />
      <Path fill="#009a00" d="M0 0h170.3v512H0z" />
      <Path fill="#ff0" d="M170.3 0h171.2v512H170.3z" />
    </G>
  </Svg>
);
export default SvgMl;

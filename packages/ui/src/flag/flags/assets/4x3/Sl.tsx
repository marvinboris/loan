import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSl = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <G fillRule="evenodd">
      <Path fill="#0000cd" d="M0 320.3h640V480H0z" />
      <Path fill="#fff" d="M0 160.7h640v159.6H0z" />
      <Path fill="#00cd00" d="M0 0h640v160.7H0z" />
    </G>
  </Svg>
);
export default SvgSl;

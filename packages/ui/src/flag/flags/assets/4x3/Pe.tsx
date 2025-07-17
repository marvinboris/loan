import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgPe = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Path fill="#D91023" d="M0 0h640v480H0z" />
    <Path fill="#fff" d="M213.3 0h213.4v480H213.3z" />
  </Svg>
);
export default SvgPe;

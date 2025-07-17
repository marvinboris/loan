import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgGh = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#006b3f" d="M0 0h512v512H0z" />
    <Path fill="#fcd116" d="M0 0h512v341.3H0z" />
    <Path fill="#ce1126" d="M0 0h512v170.7H0z" />
    <Path fill="#000001" d="m256 170.7 55.5 170.6L166.3 236h179.4L200.6 341.3z" />
  </Svg>
);
export default SvgGh;

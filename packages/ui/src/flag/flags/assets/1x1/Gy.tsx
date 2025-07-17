import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgGy = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <G fillRule="evenodd">
      <Path fill="#399408" d="M2 0h510v512H2z" />
      <Path fill="#fff" d="M.1 0c-.6 0 495.7 257.6 495.7 257.6L0 511.7z" />
      <Path fill="#ffde08" d="M.2 21.5C3 21.5 447.5 254 445 256.2L1.5 494.2.2 21.4z" />
      <Path fill="#000001" d="M1.5.8c1.5 0 232.8 257 232.8 257L1.5 508.8z" />
      <Path fill="#de2110" d="M.2 36.2C1.6 20.2 209 258.5 209 258.5L.2 481.8z" />
    </G>
  </Svg>
);
export default SvgGy;

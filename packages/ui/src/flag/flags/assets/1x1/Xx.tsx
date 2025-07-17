import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgXx = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <Path fill="#fff" fillRule="evenodd" stroke="#adb5bd" d="M.5.5h511v511H.5z" />
    <Path fill="none" stroke="#adb5bd" d="m.5.5 511 511m0-511-511 511" />
  </Svg>
);
export default SvgXx;

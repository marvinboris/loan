import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSs = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Path fill="#078930" d="M0 336h640v144H0z" />
    <Path fill="#fff" d="M0 144h640v192H0z" />
    <Path fill="#000001" d="M0 0h640v144H0z" />
    <Path fill="#da121a" d="M0 168h640v144H0z" />
    <Path fill="#0f47af" d="m0 0 415.7 240L0 480z" />
    <Path fill="#fcdd09" d="M200.7 194.8 61.7 240l139 45.1L114.9 167v146z" />
  </Svg>
);
export default SvgSs;

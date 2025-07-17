import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgId = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" {...props}>
    <Path fill="#e70011" d="M0 0h640v240H0Z" />
    <Path fill="#fff" d="M0 240h640v240H0Z" />
  </Svg>
);
export default SvgId;
